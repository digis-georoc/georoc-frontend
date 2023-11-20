<script lang="ts" setup>
import {TreeSelectionKeys} from "primevue/tree";

const queryStore = useQueryStore()

const cachedValue = queryStore.getCachedFilterValue(QueryKey.Chemistry)

const selected = ref<SelectedChemicalElement[]>([])
const selectedKeys = ref<TreeSelectionKeys>({})
const selectedTemp = ref<SelectedRockType[]>([])
onMounted(() => {
  if (cachedValue) {
    selected.value = fromQuery(cachedValue)
    useFilter()
  }
})

async function removeSelected(index: number) {
  selected.value.splice(index, 1)
  await useFilter()
}
function createEmptySelectedItem() {
  return {
    type: null,
    element: null,
    min: 0,
    max: 100
  }
}

function submit() {
  selected.value.push(selectedItemTemp.value)
  useFilter()
}

function reset() {
  selected.value = []
  useFilter()
}

function useFilter() {
  const value = toQuery(selected.value)

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

function toQuery(selected: SelectedChemicalElement[]) {
  return selected.map(({ type, element, min, max }) => `(${type?.value},${element?.value},${min},${max})`).join(',')
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
    @open="selectedItemTemp = createEmptySelectedItem()"
  >
    <template v-slot:selected>
      <QueryFilterChemistrySelected :items="selected" />
    </template>
    <template v-slot:options>
      <QueryFilterChemistrySelect
        :model-value="selectedKeys"
        @update:model-value="onSelect"
      />
    </template>
  </QueryFilterBaseContainer>
</template>
