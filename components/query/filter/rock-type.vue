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

onMounted(async () => {
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
  const keys = [...rockTypeValues, ...rockClassValues].reduce((acc, cur) => {
    acc[cur] = null
    return acc
  }, <TreeSelectionKeys>{})

  onSelect(keys)
  submit()
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
  selected.value[typeIndex].classes = selected.value[typeIndex].classes.filter((item, i) => i !== classIndex)
  if (selected.value[typeIndex].classes.length === 0) {
    selected.value = selected.value.filter((item, i) => i !== typeIndex)
  }
  useFilter()
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
  selectedTemp.value = nodes.value.filter(({ key }) => key && keys.hasOwnProperty(key)).map(({ key, label }) => {
    return {
      value: key ?? '',
      label: label ?? '',
      classes: nodes.value.find(({ key: innerKey }) => innerKey === key)
          ?.children
          ?.filter(({ key }) => Object.keys(keys).findIndex(selectionKey => selectionKey === key) > -1)
          .map(({ key, label }) => ({ value: key ?? '', label: label ?? ''}))
        ?? []
    }
  })
}

watch(() => selectedKeys.value, onSelect)
</script>

<template>
  <QueryFilterBaseContainer
    :title="$t('rock_type')"
    :dialog-title="$t('please_select_rock_type')"
    :show-reset="selected.length > 0"
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
        <BaseTreeSelect :nodes="nodes" v-model="selectedKeys"/>
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>

<style scoped>
</style>
