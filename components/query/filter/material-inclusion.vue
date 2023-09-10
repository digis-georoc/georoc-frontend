<script setup lang="ts">
import {MultiselectOption} from "~/types";

const queryStore = useQueryStore()

const { t } = useI18n()

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
    name: 'rocktype',
    value: selectedHost.value.length > 0 ? 'IN:' + selectedHost.value.map(({ value }) => value).join(',') : ''
  })
  queryStore.execute()
}

function removeInclusion(index: number) {
  selectedHost.value.splice(index, 1)
  queryStore.setPanelFilter({
    name: 'rocktype',
    value: selectedHost.value.length > 0 ? 'IN:' + selectedHost.value.map(({ value }) => value).join(',') : ''
  })
  queryStore.execute()
}

function submit() {
  selectedHost.value = selectedHostTemp.value
  selectedInclusion.value = selectedInclusionTemp.value
}
</script>
<template>
  <QueryFilterBaseContainer :title="$t('material_inclusion')" :dialog-title="$t('please_select_material_inclusion')" @submit="submit">
    <template v-slot:selected>
      <div class="flex flex-col">
        <div class="flex items-center mb-2">
          <span class="text-sm me-2">{{ $t('host_material') }}:</span><QueryFilterBaseSelected v-model="selectedHost" @remove="removeHost($event)" />
        </div>
        <div class="flex items-center">
          <span class="text-sm me-2">{{ $t('inclusion_material') }}:</span><QueryFilterBaseSelected v-model="selectedInclusion" @remove="removeInclusion($event)" />
        </div>
      </div>
    </template>
    <template v-slot:options>
      <div class="w-full">
        <h3 class="font-semibold mb-2">{{ $t('host_material') }}:</h3>
        <BaseMultiselect :options="optionsHost" id-prefix="rocktype" @change="selectedHostTemp = $event"/>
        <h3 class="font-semibold mt-4 mb-2">{{ $t('inclusion_material') }}:</h3>
        <BaseMultiselect :options="optionsInclusion" id-prefix="rocktype" @change="selectedInclusionTemp = $event"/>
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>
