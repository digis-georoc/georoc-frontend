<script setup lang="ts">
import { RadioGroupOption } from "~/types"
import { TreeNode, TreeSelectionKeys } from "primevue/tree";

interface SelectedRockType {
  label: string,
  value: string,
  classes: RadioGroupOption[]
}
const queryStore = useQueryStore()

const cachedRockTypeQuery = queryStore.getCachedFilterValue(QueryKey.RockType)
const cachedRockClassQuery = queryStore.getCachedFilterValue(QueryKey.RockClass)

const emit = defineEmits<{
  change: [selected: RadioGroupOption[]]
}>()

const options = ref<RadioGroupOption[]>([])
const nodes =ref<TreeNode[]>([])

const selected = ref<SelectedRockType[]>([])
const selectedKeys = ref<TreeSelectionKeys>({})
const selectedTemp = ref<SelectedRockType[]>([])

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  selected.value = []
  const rockTypes = await getRocktypes()

  nodes.value =  await Promise.all(rockTypes?.data
    .map(async ({ value, label }, i) => {
      const rockClasses = await getRockClasses(value)
      return {
        key: value,
        label,
        children: rockClasses?.data.map(({ value, label }) => ({ key: value.replaceAll(', ', '__'), label: value })) ?? []
      }
    }) ?? [])

  const rockTypeValues = fromQuery(cachedRockTypeQuery)
  const rockClassValues = fromQuery(cachedRockClassQuery)
  const keys = {
    ...rockTypeValues
        .reduce((acc, cur) => {
          acc[cur] = {checked: false, partialChecked: true}
          return acc
        }, <TreeSelectionKeys>{}),
    ...rockClassValues.reduce((acc, cur) => {
      acc[cur] = {checked: true}
      return acc
    }, <TreeSelectionKeys>{})
  }

  onSelect(keys)
  submit()

  isLoading.value = false
})

function useFilter() {
  const selectedRockTypes = selected.value.map(({ value, label }) => ({ value, label }))
  const selectedRockClasses = selected.value.map(({ classes }) => classes).flat()

  if (selectedRockTypes.length > 0) {
    queryStore.setPanelFilter({
      name: QueryKey.RockType,
      value: toQuery(selectedRockTypes)
    })
  } else {
    queryStore.unsetFilter(QueryKey.RockType)
  }

  if (selectedRockClasses.length > 0) {
    queryStore.setPanelFilter({
      name: QueryKey.RockClass,
      value: toQuery(selectedRockClasses)
    })
  } else {
    queryStore.unsetFilter(QueryKey.RockClass)
  }

  queryStore.execute()
}

async function remove(typeIndex: number, classIndex: number) {
  const rockClassToRemove = selected.value[typeIndex].classes.find((item, i) => i === classIndex)

  // We have to check if the parent rock type needs to be remove because it was the last selected rock class item
  const rockTypeToRemove = rockClassToRemove && selected.value[typeIndex].classes.length === 1 ? selected.value[typeIndex] : null

  if (!rockClassToRemove) return
  let keys = Object.keys(selectedKeys.value).filter(key => {
    return !(key === rockClassToRemove.value || (rockTypeToRemove && rockTypeToRemove.value === key))
  }).reduce((acc, cur) => {
    acc[cur] = selectedKeys.value[cur]
    return acc
  }, <TreeSelectionKeys>{})

  onSelect(keys)

  submit()
}

function submit() {
  selected.value = selectedTemp.value
  useFilter()
}

function reset() {
  selected.value = []
  selectedTemp.value = []
  useFilter()
}

function toQuery(selected: RadioGroupOption[]) {
  return selected.length > 0 ? 'IN:' + selected.map(({ value }) => value).join(',') : ''
}

function fromQuery(query: string | null): string[] {
  if (!query) return []

  query = query.replace('IN:', '')
  return query.split(',')
}

function onSelect (keys: TreeSelectionKeys) {
  selectedKeys.value = keys
  selectedTemp.value = nodes.value.filter(({ key }) => key && keys.hasOwnProperty(key)).map(node => {
    const { key, label } = node

    let classes =
        nodes.value.find(({ key: innerKey }) => innerKey === key)
          ?.children
          ?.filter(({ key }) => Object.keys(keys).findIndex(selectionKey => selectionKey === key) > -1) ?? []

    if (classes.length === node.children?.length) {
      classes = [{ key: 'ALL', label: 'All'}]
    }

    return {
      value: key ?? '',
      label: label ?? '',
      classes: classes.map(({ key, label }) => ({ value: key ?? '', label: label ?? ''}))
    }
  })
}

// watch(() => selectedKeys.value, onSelect)
</script>

<template>
  <QueryFilterBaseContainer
    :title="$t('rock_type')"
    :dialog-title="$t('please_select_rock_type')"
    :show-reset="selected.length > 0"
    :loading="isLoading"
    @submit="submit"
    @reset="reset"
  >
    <template v-slot:selected>
      <div class="flex flex-1 flex-col mb-2" v-for="(type, i) in selected" :key="type.value">
        <h3 class="font-semibold mb-2">{{ type.label }}:</h3>
        <div class="flex ps-4">
          <QueryFilterBaseSelected :items="type.classes" @remove="remove(i, $event)" />
        </div>
      </div>
    </template>
    <template v-slot:options>
      <div class="w-full">
        <BaseTreeSelect :nodes="nodes" :model-value="selectedKeys" @update:model-value="onSelect" />
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>

<style scoped>
</style>
