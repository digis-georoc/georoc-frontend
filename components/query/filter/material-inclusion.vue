<script setup lang="ts">
import {MultiselectOption} from "~/types";

const queryStore = useQueryStore()

const { t } = useI18n()

const selectedHostValueFromStore = computed(() => queryStore.getFilter('hostmaterial')?.value)
const selectedInclusionValueFromStore = computed(() => queryStore.getFilter('inclusionmaterial')?.value)


const minerals = await getMinerals()
const optionsHost = ref<MultiselectOption[]>([])
const optionsInclusion = ref<MultiselectOption[]>([])

const selectedHost = ref<MultiselectOption[]>([])
const selectedHostTemp = ref<MultiselectOption[]>([])

const selectedInclusion = ref<MultiselectOption[]>([])
const selectedInclusionTemp = ref<MultiselectOption[]>([])

function removeHost(index: number) {
  selectedHost.value.splice(index, 1)
  queryStore.setPanelFilter({
    name: 'hostmaterial',
    value: toQuery(selectedHost.value)
  })
  queryStore.execute()
}

function removeInclusion(index: number) {
  selectedHost.value.splice(index, 1)
  queryStore.setPanelFilter({
    name: 'inclusionmaterial',
    value: toQuery(selectedInclusion.value)
  })
  queryStore.execute()
}

function submit() {
  selectedHost.value = selectedHostTemp.value
  selectedInclusion.value = selectedInclusionTemp.value

  const selectedValuesHost = selectedHost.value.map(({ value }) => value)
  optionsHost.value = optionsHost.value.map(option => {
    option.active = selectedValuesHost.includes(option.value)
    return option
  })

  const selectedValuesInclusion = selectedInclusion.value.map(({ value }) => value)
  optionsInclusion.value = optionsInclusion.value.map(option => {
    option.active = selectedValuesInclusion.includes(option.value)
    return option
  })

  queryStore.setPanelFilter({
    name: 'hostmaterial',
    value: toQuery(selectedHost.value)
  })
  queryStore.setPanelFilter({
    name: 'inclusionmaterial',
    value: toQuery(selectedInclusion.value)
  })
  queryStore.execute()
}

function toQuery(selected: MultiselectOption[]) {
  return selected.length > 0 ? 'IN:' + selected.map(({ value }) => value).join(',') : ''
}

function fromQuery(query: string): string[] {
  query = query.replace('IN:', '')
  return  query.split(',')
}

onMounted(async () => {
  selectedHost.value = []
  selectedInclusion.value = []

  let selectedHostValues: string[] = []
  let selectedInclusionValues: string[] = []

  if (selectedHostValueFromStore.value) selectedHostValues = fromQuery(selectedHostValueFromStore.value)
  if (selectedInclusionValueFromStore.value) selectedInclusionValues = fromQuery(selectedInclusionValueFromStore.value)

  optionsHost.value = minerals?.data
    .map(({ value, label }) => {
      const active = selectedHostValues.includes(value)
      const option = {
        value,
        label,
        active
      }
      if (active) selectedHost.value.push(option)
      return option
    }) ?? []

  optionsInclusion.value = minerals?.data
    .map(({ value, label }) => {
      const active = selectedInclusionValues.includes(value)
      const option = {
        value,
        label,
        active
      }
      if (active) selectedInclusion.value.push(option)
      return option
    }) ?? []
})

</script>
<template>
  <QueryFilterBaseContainer :title="$t('material_inclusion')" :dialog-title="$t('please_select_material_inclusion')" @submit="submit">
    <template v-slot:selected>
      <div class="flex flex-col">
        <div class="flex items-start mb-3">
          <span class="text-sm me-2">{{ $t('host_material') }}:</span><QueryFilterBaseSelected :items="selectedHost" @remove="removeHost($event)" />
        </div>
        <div class="flex items-start">
          <span class="text-sm me-2">{{ $t('inclusion_material') }}:</span><QueryFilterBaseSelected :items="selectedInclusion" @remove="removeInclusion($event)" />
        </div>
      </div>
    </template>
    <template v-slot:options>
      <div class="w-full">
        <h3 class="font-semibold mb-2">{{ $t('host_material') }}:</h3>
        <BaseMultiselect :options="optionsHost" id-prefix="host_material" @change="selectedHostTemp = $event"/>
        <h3 class="font-semibold mt-4 mb-2">{{ $t('inclusion_material') }}:</h3>
        <BaseMultiselect :options="optionsInclusion" id-prefix="inclusion_material" @change="selectedInclusionTemp = $event"/>
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>
