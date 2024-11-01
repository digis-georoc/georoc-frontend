<script lang="ts" setup>
import type { TreeNode } from "primevue/tree";
import {storeToRefs} from "pinia";
import HowToFilter from "~/components/how-to-filter.vue";

const queryStore = useQueryStore()
const selectedTemp = ref<TreeNode[]>(<TreeNode[]>[])
const selected = ref<TreeNode[]>(<TreeNode[]>[])

const oldList = [
  "COMPLEX VOLCANIC SETTINGS",
  "OCEANIC PLATEAU",
  "INTRAPLATE VOLCANICS",
  "ARCHEAN CRATON (INCLUDING GREENSTONE BELTS)",
  "CONTINENTAL FLOOD BASALT",
  "SEAMOUNT",
  "SUBMARINE RIDGE",
  "CONVERGENT MARGIN",
  "OCEAN ISLANDI",
  "OCEAN-BASIN FLOOD BASALT",
  "convergent margin",
  "OCEAN ISLAND",
  "RIFT VOLCANICS"
]

const options = oldList.map(item => ({
  label: item,
  key: item
}));

function submit() {
  selected.value = [...selectedTemp.value]
  useFilter()
}

function reset() {
  selectedTemp.value = []
  submit()
}

function remove(index: number) {
  const optionToRemove = selected.value.find((item, i) => i === index)

  if (!optionToRemove) return

  const optionIndex = options.findIndex(({ key }) => key === optionToRemove.key)
  if (optionIndex === -1) return
  options[optionIndex].active = false

  selected.value = selected.value.filter((item, i) => i !== index)

  queryStore.setPanelFilter({
    name: QueryKey.GeologicalSettings,
    value: toQuery(selected.value)
  })
}

function useFilter() {
  const value = toQuery(selected.value)

  if (value === '') {
    queryStore.unsetFilter(QueryKey.GeologicalSettings)
  } else {
    queryStore.setPanelFilter({
      name: QueryKey.GeologicalSettings,
      value
    })
  }
}

function toQuery(selected: TreeNode[]) {
  return selected
    .map(node => node.key)
    .join(',')
}

function fromQuery(query: string | null): TreeNode[] {
  if (!query) return []
  return query
    .split(',')
    .map(key => options.find(option => option.key === key))
    .filter(node => node !== undefined)
}

const unsubscribe = queryStore.$onAction(
    ({ name }) => {
      if (name === 'resetAllActiveFilters') {
        selected.value = []
      }
    }
)

onMounted(() => {
  options.forEach(option => {
    option.active = false
  })

  const activeQuery = queryStore.getFilter(QueryKey.GeologicalSettings)?.value
  if (!activeQuery) return
  selected.value = fromQuery(activeQuery)
  useFilter()
})

onBeforeUnmount(() => {
  selected.value = []
  unsubscribe()
})
</script>
<template>
  <div class="relative">
    <QueryFilterBaseContainer
      :title="$t('geological_settings')"
      :dialog-title="$t('please_select_geological_settings')"
      :has-selected="selected.length > 0"
      @submit="submit"
      @reset="reset"
    >
      <template v-slot:selected>
        <QueryFilterBaseSelected :items="selected" @remove="remove"/>
      </template>
      <template v-slot:options>
        <QueryFilterGeologicalSettingsSelect v-model="selectedTemp" :options="options" />
      </template>
    </QueryFilterBaseContainer>
  </div>
</template>
