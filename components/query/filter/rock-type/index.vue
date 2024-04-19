<script lang="ts" setup>
import type { TreeNode } from "primevue/tree";
import {storeToRefs} from "pinia";
import {useRockTypeStore} from "~/composables/rock-type-store";
import {getCleanChildKey} from "~/composables/tree";

const queryStore = useQueryStore()
const rockTypeStore = useRockTypeStore()

const selectedTemp = ref<TreeNode[]>([])

const { selected } = storeToRefs(rockTypeStore)

function submit() {
  rockTypeStore.selected = [...selectedTemp.value]
  useFilter()
}

function reset() {
  selectedTemp.value = []
  submit()
}

function useFilter() {
  const selectedRockTypes = selected.value
  const selectedRockClasses = selected.value.reduce((acc, cur) => {
    const { children } = cur
    acc.push(...children)
    return acc
  }, <TreeNode[]>[])

  if (selectedRockTypes.length > 0) {
    queryStore.setPanelFilter({
      name: QueryKey.RockType,
      value: toQuery(selectedRockTypes)
    })
  } else {
    queryStore.unsetFilter(QueryKey.RockType)
  }

  const rockClassesQuery = toQuery(selectedRockClasses)

  if (Object.keys(selectedRockClasses).length > 0 && rockClassesQuery !== '') {
    queryStore.setPanelFilter({
      name: QueryKey.RockClass,
      value: rockClassesQuery
    })
  } else {
    queryStore.unsetFilter(QueryKey.RockClass)
  }
}

function toQuery(selected: TreeNode[]) {
  return selected.length > 0 ? 'IN:' + selected.map(({ key }) => getCleanChildKey(key)).join(',') : ''
}

function fromSimpleQuery(query: string): string[] {
  query = query.replace('IN:', '')
  return  query.split(',')
}

async function fromQuery(rockTypeQuery: string | null, rockClassQuery: string | null): Promise<TreeNode[]> {
  if (!rockTypeQuery) return []

  // We will try to recreate selected nodes from the two given string queries
  // TODO: this should be changed to the same approach as the chemistry filter like: rocktype=(rocktypeA,rockClass1),(rocktypeA, rockClass2)

  const selectedRockTypesValues = fromSimpleQuery(rockTypeQuery ?? '')
  const selectedRockClassesValues = fromSimpleQuery(rockClassQuery ?? '')

  if (rockTypeStore.nodes.length === 0) {
    // If we somehow receive a valid rock type query but do not have any nodes in store yet
    const rockTypes = await getRocktypes()
    rockTypeStore.nodes = rockTypes?.data.map(({ value, label }): TreeNode => ({ key: value , label, children: [], leaf: false })) ?? []
  }

  for (let rockTypeValue of selectedRockTypesValues) {

    if (rockTypeValue === '') continue

    const index = rockTypeStore.nodes.findIndex(({ key }) => key === rockTypeValue)

    if (index > -1 && !rockTypeStore.nodes[index].children?.length) continue

    // We preload the rock classes if needed, so they become available in the store
    const rockClasses = await getRockClasses(rockTypeValue)

    rockTypeStore.nodes[index].children = rockClasses
      ?.data
      .map(({ value, label }) => ({ key: generateChildKey(rockTypeValue, value), label: label ?? value }))
    ?? []
  }

  const result =  rockTypeStore.nodes.filter(node => selectedRockTypesValues.includes(node.key)).map(node => ({...node}))

  // Filter out the rock classes from given query
  for (let i = 0; i < result.length; i++) {
    result[i].children = result[i].children.filter(child => selectedRockClassesValues.includes(getCleanChildKey(child.key)))
  }

  return result
}

const unsubscribe = queryStore.$onAction(
  ({ name }) => {
    if (name === 'resetAllActiveFilters') {
      selected.value = []
    }
  }
)

onMounted(async () => {
  const activeRockTypeQuery = queryStore.getFilter(QueryKey.RockType)?.value
  const activeRockClassQuery = queryStore.getFilter(QueryKey.RockClass)?.value

  selected.value = await fromQuery(activeRockTypeQuery, activeRockClassQuery)

  useFilter()
})

onBeforeUnmount(() => {
  rockTypeStore.selected = []
  unsubscribe()
})
</script>
<template>
  <QueryFilterBaseContainer
    :title="$t('rock_type')"
    :dialog-title="$t('please_select_rock_type')"
    :has-selected="selected.length > 0"
    @submit="submit"
    @reset="reset"
  >
    <template v-slot:selected>
      <QueryFilterRockTypeSelected :use-filter="useFilter"/>
    </template>
    <template v-slot:options>
      <QueryFilterRockTypeSelect v-model="selectedTemp" />
    </template>
  </QueryFilterBaseContainer>
</template>
