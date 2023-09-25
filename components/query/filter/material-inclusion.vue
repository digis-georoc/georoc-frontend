<script setup lang="ts">
import {MultiselectOption} from "~/types";

const queryStore = useQueryStore()

const { t } = useI18n()

const selectedHostValueFromStore = computed(() => queryStore.getFilter('hostmaterial')?.value)
const selectedInclusionValueFromStore = computed(() => queryStore.getFilter('inclusionmaterial')?.value)


const minerals = await getMinerals()
const optionsHost = ref(minerals?.data.map(({ value, label }) => ({ value, label, active: false})) ?? [])
const optionsInclusion = ref(minerals?.data.map(({ value, label }) => ({ value, label, active: false})) ?? [])

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

function fromQuery(query: string, options: MultiselectOption[]): MultiselectOption[] {
  query = query.replace('IN:', '')
  const queryArr = query.split(',')
  return queryArr.map(value => ({
    value,
    label: options.find(option => option.value === value)?.label ?? value,
    active: true
  }))
}

onMounted(async () => {
  if (selectedHostValueFromStore.value) selectedHost.value = fromQuery(selectedHostValueFromStore.value, optionsHost.value)
  if (selectedInclusionValueFromStore.value) selectedInclusion.value = fromQuery(selectedInclusionValueFromStore.value, optionsInclusion.value)
})

</script>
<template>
  <QueryFilterBaseContainer :title="$t('material_inclusion')" :dialog-title="$t('please_select_material_inclusion')" @submit="submit">
    <template v-slot:selected>
      <div class="flex flex-col">
        <div class="flex items-center mb-2">
          <span class="text-sm me-2">{{ $t('host_material') }}:</span><QueryFilterBaseSelected :items="selectedHost" @remove="removeHost($event)" />
        </div>
        <div class="flex items-center">
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
