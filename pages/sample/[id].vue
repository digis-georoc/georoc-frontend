<script setup lang="ts">
import DataTable from "primevue/datatable"
import Column from "primevue/column"

import { FetchError } from "ofetch"
import { csvToJSON } from "~/utils/csv-to-json";

const queryStore = useQueryStore()
const route = useRoute()
const router = useRouter()

const id = parseInt(<string>route.params.id, 10)
const data = ref<SampleFullData | null>(null)
const error = ref<FetchError | null>(null)
const loading = ref(false)
const tasData = computed<DiagramData | null>(() => {

  if (!data.value) return null
  if (data.value.batchData.length === 0) return null

  return {
    xAxisLabel: 'SiO2',
    yAxisLabel: 'Na2O + K2O',
    values: data.value?.batchData.reduce((acc, cur) => {
      acc.push(...cur.tasData.values)
      return acc
    }, <number[][]>[])
  }
})

async function getChemistryFilterOptions() {
  const result = await fetch('csv/chemistry-filter-options.csv')
  const csv = await result.text()
  return csvToJSON<ChemistryFilterOption>(csv, ';')
}

onMounted(async () => {
  loading.value = true
  try {
    const sample = await $fetch<SampleFullData>(`/api/samples/${id}`)

    const options = await getChemistryFilterOptions()

    if (!options) return

    const referenceMap = options?.reduce((map, item, index) => {
      map[item.value] = index;
      return map;
    }, {});

    sample.batchData.forEach(item => {
      item.results.sort((a, b) => {
        const indexA = referenceMap[a.itemName] !== undefined ? referenceMap[a.itemName] : Infinity;
        const indexB = referenceMap[b.itemName] !== undefined ? referenceMap[b.itemName] : Infinity;
        return indexA - indexB;
      });
    })

    data.value = sample

  } catch (e: FetchError | any) {
    error.value = e
  } finally {
    loading.value = false
  }
})

const list = computed(() => queryStore.listResult?.data)
const totalCount = computed(() => queryStore.listResult?.totalCount)
const curIndex = computed(() => list.value?.findIndex(item => item.sampleID === id) ?? -1)

const limit = 30


const disableNext = ref(!isNextEnabled())
const disablePrevious = ref(!isPreviousEnabled())

function isNextEnabled() {
  if (!list.value || !totalCount.value) return false
  if (curIndex.value === -1) return false
  return !(curIndex.value === totalCount.value - 1 || curIndex.value + queryStore.listOffset === totalCount.value - 1)
}

function isPreviousEnabled() {
  if (!list.value || !totalCount.value) return false
  if (curIndex.value === -1) return false
  return !(curIndex.value === 0 && queryStore.listOffset === 0)
}

async function getNextId() {
  if (disableNext.value) return -1

  if (list.value && totalCount.value) {
    // is not last item, return next
    if (curIndex.value < list.value.length - 1) return list.value[curIndex.value + 1].sampleID

    // is last item of all, return invalid
    const nextOffset = queryStore.listOffset + list.value.length

    // is end of page, get next page, return first of page
    await queryStore.executeListQuery(nextOffset, list.value.length)
    return list.value[0].sampleID
  }
  return -1
}

async function getPreviousId() {
  if (disablePrevious.value) return -1
  if (list.value && totalCount.value) {
    // is not first item, return prev
    if (curIndex.value > 0) return list.value[curIndex.value - 1].sampleID

    // is first item of all, return invalid
    const prevOffset = queryStore.listOffset - list.value.length

    // is start of page, get prev page, return last of page
    await queryStore.executeListQuery(prevOffset, list.value.length)
    return list.value[list.value.length - 1].sampleID
  }
  return -1
}

async function navigate(direction: 1 | -1) {
  const navigateToId = direction > 0 ? await getNextId() : await getPreviousId()
  if (navigateToId !== -1) await router.push(`/sample/${navigateToId}`)
}

function back() {
  router.push(`/query`);
}

function mapArrayToLabels(fields: BaseField[]) {
  return fields.map(field => field.label)
}

function getAuthors(authors: Author[]) {
  return authors.map(({ firstName, lastName }) => firstName + ' ' + lastName)
}
</script>

<template>
  <div class="flex flex-col bg-white dark:bg-gray-800 flex-1 pt-8">
    <BaseContainer class="flex flex-col flex-1">
      <template v-if="loading">
        <div class="flex flex-1 justify-center items-center">
          <BaseLoading class="text-[3rem]" :opacity="0.2" />
        </div>
      </template>
      <template v-else>
        <template v-if="error">
          <template v-if="error.statusCode === 404">
            <h1 class="text-3xl font-bold">{{ $t('not_found') }}</h1>
            <p class="mt-4">{{ error.statusMessage }}</p>
          </template>
          <template v-else-if="error.statusCode >= 500">
            <h1 class="text-3xl font-bold">{{ $t('server_error') }}</h1>
            <p class="mt-4">{{ error.statusMessage }}</p>
          </template>
        </template>
        <template v-else-if="data">
          <div class="flex flex-wrap">
            <div class="w-full mr-2 mb-2 sm:w-auto sm:mb-0">
              <BaseButton
                :text="$t('back_to_database_query')"
                display="outline"
                size="small"
                @click="back()"
              />
            </div>

            <BaseButton
              :text="$t('previous_sample')"
              display="outline"
              size="small"
              icon="material-symbols:arrow-back-ios"
              :disabled="disablePrevious"
              @click="navigate(-1)"
              class="mr-2"
            />
            <BaseButton
              :text="$t('next_sample')"
              display="outline"
              size="small"
              icon="material-symbols:arrow-forward-ios"
              icon-position="right"
              :disabled="disableNext"
              @click="navigate(1)"
            />
          </div>
          <h1 class="text-3xl font-bold my-6">{{ data.sampleName }}</h1>
          <div class="flex flex-col-reverse lg:flex-row">
            <div class="flex-1">
              <h2 class="text-xl font-bold mb-2">{{ $t('general_info') }}</h2>
              <table class="mb-4 w-full">
                <SampleField :label="$t('rock_types')" :value="mapArrayToLabels(data.rockTypes)" />
                <SampleField :label="$t('rock_classes')" :value="mapArrayToLabels(data.rockClasses)" />
                <SampleField :label="$t('rock_textures')" :value="data.rockTextures" />
                <SampleField :label="$t('tectonic_setting')" :value="data.tectonicSetting"/>
                <SampleField :label="$t('location_comment')" :value="data.locationNames"/>
                <SampleField :label="$t('latitude') + ' ' + $t('min_max')" :value="`${data.latitudeMin}/${data.latitudeMax}`"/>
                <SampleField :label="$t('longitude') + ' ' + $t('min_max')" :value="`${data.longitudeMin}/${data.longitudeMax}`"/>
                <SampleField :label="$t('elevation') + ' ' + $t('min_max')" :value="`${data.elevationMin}/${data.elevationMax}`"/>
                <SampleField :label="$t('sample_comment')" :value="data.comments"/>
                <SampleField :label="$t('alteration')" :value="data.rockTextures"/>
                <SampleField :label="$t('drill_depth') + ' ' + $t('min')" :value="data.drillDepthMin" />
                <SampleField :label="$t('drill_depth') + ' ' + $t('max')" :value="data.drillDepthMax" class="ml-2" />
                <SampleField :label="$t('sampling_technique')" :value="data.samplingTechnique"/>
              </table>
            </div>
            <div class="flex-1 mb-8 lg:w-1/3 lg:mb-0">
              <SampleMap :lat="data.latitudeMin" :lng="data.longitudeMin"/>
            </div>
          </div>

          <h2 class="text-xl font-bold mt-8 mb-2">{{ $t('batch_infos') }}</h2>
          <BaseCard
            :title="$t('batch_id') + ': ' + item.batchID"
            :collapsed="true"
            v-for="item in data.batchData"
          >
            <div class="flex flex-wrap mb-5">
              <SampleField :label="$t('material')" :value="item.material" class="mr-7" />
              <SampleField :label="$t('inclusion_type')" :value="item.inclusionTypes" class="mr-7"/>
              <SampleField :label="$t('batch_name')" :value="item.batchName" class="mr-7" />
              <SampleField v-if="item.material === MaterialKeys.INC" :label="$t('host_mineral')" :value="mapArrayToLabels(item.hostMinerals)" class="mr-7" />
              <SampleField
                v-if="item.material === MaterialKeys.MIN || (item.material === MaterialKeys.INC && item.inclusionTypes.includes('IMIN'))"
                :label="$t('host_mineral')"
                :value="mapArrayToLabels(item.hostMinerals)"
                class="mr-7"
              />
              <SampleField v-if="item.material === MaterialKeys.MIN" :label="$t('crystal')" :value="item.crystal" class="mr-7" />
              <SampleField
                v-if="item.material === MaterialKeys.MIN || (item.material === MaterialKeys.INC && item.inclusionTypes.includes('IMIN'))"
                :label="$t('rim_or_core_inclusion')"
                :value="item.rimOrCoreInclusion"
                class="mr-7"
              />
            </div>

            <h3 class="font-bold mb-2">{{ $t('chemical_table') }}</h3>
            <DataTable
              :value="item.results"
              tableStyle="min-width: 50rem"
              unstyled
              :pt="{
                thead: {
                  class: 'text-left '
                },
                headerCell: {
                  class: 'font-semibold'
                }
              }"
            >
              <Column field="itemName" :header="$t('analyte')" :pt="{headerCell: {class: 'font-semibold'}}"></Column>
              <Column field="value" :header="$t('value')" :pt="{headerCell: {class: 'font-semibold'}}"></Column>
              <Column field="unit" :header="$t('unit')" :pt="{headerCell: {class: 'font-semibold'}}"></Column>
              <Column field="method" :header="$t('method')" :pt="{headerCell: {class: 'font-semibold'}}"></Column>
            </DataTable>
          </BaseCard>

          <h2 class="text-xl font-bold mt-8 mb-2">{{ $t('age') }}</h2>
          <div class="flex flex-wrap">
            <SampleField :label="$t('geological_age')" :value="data.geologicalAge" class="mr-7"/>
            <SampleField :label="$t('numeric_age') + ' ' + $t('min')" :value="data.ageMin" class="mr-7"/>
            <SampleField :label="$t('numeric_age') + ' ' + $t('max')" :value="data.ageMax" class="mr-7"/>
            <SampleField :label="$t('eruption_date')" :value="data.eruptionDate" class="mr-7"/>
          </div>
          <h2 class="text-xl font-bold mt-8 mb-2">{{ $t('reference_info') }}</h2>
          <BaseCard
            :title="item.title"
            :collapsed="true"
            v-for="item in data.references"
            class="mb-2"
          >
            <SampleField :label="$t('journal')" :value="item.journal"/>
            <SampleField :label="$t('volume_no')" :value="item.volume"/>
            <SampleField :label="$t('issue_no')" :value="item.issue"/>
            <div class="flex">
              <SampleField :label="$t('first_page')" :value="item.firstPage"/>
              <SampleField class="ml-4" :label="$t('last_page')" :value="item.lastPage"/>
            </div>
            <SampleField :label="$t('book_title')" :value="item.bookTitle"/>
            <SampleField :label="$t('book_editors')" :value="item.editors"/>
            <SampleField :label="$t('publisher')" :value="item.publisher"/>
            <SampleField :label="$t('authors')" :value="getAuthors(item.authors)"/>
            <SampleField :label="$t('DOI')" :value="item.externalIdentifier"/>
            <SampleField :label="$t('publication_year')" :value="item.publicationYear"/>
          </BaseCard>
          <h2 class="text-xl font-bold mt-8 mb-2">{{ $t('tas_diagram') }}</h2>
          <SampleTasDiagram :data="tasData" class="mb-6"/>
        </template>
      </template>
    </BaseContainer>
  </div>
</template>
