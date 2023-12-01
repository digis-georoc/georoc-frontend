<script lang="ts" setup>
import type {TreeSelectionKeys, TreeNode} from "primevue/tree";
import {storeToRefs} from "pinia";

const queryStore = useQueryStore()
const chemistryStore = useChemistryStore()

const cachedValue = queryStore.getCachedFilterValue(QueryKey.Chemistry)

const selectedTemp = ref<TreeNode[]>([])

const { selected } = storeToRefs(chemistryStore)

function submit() {
  chemistryStore.selected = [...selectedTemp.value]
}

watch(selected, () => useFilter())

function reset() {
  chemistryStore.selected = []
}

function useFilter() {
  const value = toQuery(chemistryStore.selected)

  if (value === '') {
    queryStore.unsetFilter(QueryKey.Chemistry)
  } else {
    queryStore.setPanelFilter({
      name: QueryKey.Chemistry,
      value
    })
  }

  queryStore.execute()
}

function toQuery(selected: TreeNode[]) {
  return selected
    .reduce((acc, cur) => {
      const children = cur.children ?? []
      const tuples = children.map(({ data, key: childKey }) => `(${cur.key},${childKey},${data.min ?? ''},${data.max ?? ''})`)
      return [...acc, ...tuples]
    }, <string[]>[])
    .join(',')
}

function fromQuery(query: string | null): SelectedChemicalElement[] {
  if (!query) return []
  return query
    .split('),(')
    .map(item => item.replaceAll(/\)|\(+/g, ''))
    .map(tupel => {
      const [type, element, min, max ] = tupel.split(',')
      return {
        type: {value: type, label: type },
        element: { value: element, label: element },
        min: parseFloat(min),
        max: parseFloat(max),
      }
    })
}
</script>
<template>
  <QueryFilterBaseContainer
    :title="$t('chemistry')"
    :dialog-title="$t('please_select_chemistry')"
    @submit="submit"
    @reset="reset"
  >
    <template v-slot:selected>
      <QueryFilterChemistrySelected />
    </template>
    <template v-slot:options>
      <QueryFilterChemistrySelect v-model="selectedTemp" />
    </template>
  </QueryFilterBaseContainer>
</template>
