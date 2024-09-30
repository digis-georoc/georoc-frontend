<script lang="ts" setup>
import type { TreeNode } from "primevue/tree";
import {storeToRefs} from "pinia";
import HowToFilter from "~/components/how-to-filter.vue";

const queryStore = useQueryStore()
const chemistryStore = useChemistryStore()

const selectedTemp = ref<TreeNode[]>(<TreeNode[]>[])
const howToFilterDialogVisible = ref(false)

const { selected } = storeToRefs(chemistryStore)

function submit() {
  chemistryStore.selected = [...selectedTemp.value]
  useFilter()
}

function reset() {
  selectedTemp.value = []
  submit()
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
}

function toQuery(selected: TreeNode[]) {
  return selected
    .reduce((acc, cur) => {
      const children = cur.children ?? []
      const tuples = children.map(({ data, key: childKey = '' }) => `(${cur.key},${getCleanChildKey(childKey)},${data.min ?? ''},${data.max ?? ''})`)
      return [...acc, ...tuples]
    }, <string[]>[])
    .join(',')
}

function fromQuery(query: string | null): TreeNode[] {
  if (!query) return []
  return query
    .split('),(')
    .map(item => item.replaceAll(/\)|\(+/g, ''))
    .map(tupel => {
      const [ type, element, min, max ] = tupel.split(',')
      return {
        type: { value: type, label: chemistryStore.getNodeLabel(type) },
        element: { value: element, label: chemistryStore.getNodeLabel(element) },
        min: !!(min) ? parseFloat(min) : null,
        max: !!(max) ? parseFloat(max) : null,
      }
    })
    .reduce((acc, cur) => {
      // Iterate over tuples and reduce them to a nested structure with element types as parents
      // and elements as children.
      // Child keys need to be generated (parent + delimiter + child)
      // because there can be same elements for multiple element types.
      // When applying the filter query, we calculate it back to the original key (see toQuery).

      const index = acc.findIndex(node => node.key === cur.type.value)
      const child = { key: generateChildKey(cur.type.value, cur.element.value), label: cur.element.label, data: { min: cur.min, max: cur.max } }
      if (index === -1) acc.push({ key: cur.type.value, label: cur.type.label, children: <TreeNode[]>[child] })
      else acc[index].children?.push(child)

      return acc
    }, <TreeNode[]>[])
}

function openHowToFilterDialog(event: Event) {
  event.preventDefault()
  howToFilterDialogVisible.value = true
}

const unsubscribe = queryStore.$onAction(
    ({ name }) => {
      if (name === 'resetAllActiveFilters') {
        selected.value = []
      }
    }
)

onMounted(() => {
  const activeQuery = queryStore.getFilter(QueryKey.Chemistry)?.value
  if (!activeQuery) return
  selected.value = fromQuery(activeQuery)
  useFilter()
})

onBeforeUnmount(() => {
  chemistryStore.selected = []
  unsubscribe()
})
</script>
<template>
  <div class="relative">
    <BaseButton
        display="flat"
        color="neutral"
        icon="material-symbols:help-outline"
        text="How to Filter"
        size="tiny"
        class="absolute z-10 top-[0.9rem] left-28"
        @click="openHowToFilterDialog"
    />
    <QueryFilterBaseContainer
        :title="$t('chemistry')"
        :dialog-title="$t('please_select_chemistry')"
        :has-selected="selected.length > 0"
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
    <BaseDialog v-model="howToFilterDialogVisible" title="How to Filter?" class="w-[90vw] xl:w-1/3">
      <HowToFilter />
    </BaseDialog>
  </div>

</template>
