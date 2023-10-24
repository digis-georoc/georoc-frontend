<script lang="ts" setup>
import { SelectedChemicalElement } from "~/types";

const queryStore = useQueryStore()

const cachedValue = queryStore.getCachedFilterValue(QueryKey.Chemistry)

const selected = ref<SelectedChemicalElement[]>([])
const selectedItemTemp = ref<SelectedChemicalElement>(createEmptySelectedItem())

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
      <div v-if="selected.length > 0" class="w-full flex flex-col flex-1">
        <div class="flex flex-1 mb-2" v-for="(item, i) in selected">
          <div class="w-1/4">
            <p v-if="i === 0" class="text-sm font-semibold">{{ $t('type') }}</p>
            <p>{{ item.type?.label }}</p>
          </div>
          <div class="w-1/4">
            <p v-if="i === 0" class="text-sm font-semibold">{{ $t('element') }}</p>
            <p>{{ item.element?.label }}</p>
          </div>
          <div class="w-1/4">
            <p v-if="i === 0" class="text-sm font-semibold">{{ $t('min') }}</p>
            <p>{{ item.min }}</p>
          </div>
          <div class="w-1/4">
            <p v-if="i === 0" class="text-sm font-semibold">{{ $t('max') }}</p>
            <p>{{ item.max }}</p>
          </div>
          <div class="flex items-end pb-1.5">
            <Icon name="ic:close" @click="removeSelected(i)" class="cursor-pointer"/>
          </div>
        </div>
      </div>
      <div v-else class="text-sm text-stone-400">{{ $t('no_options_selected') }}.</div>
    </template>
    <template v-slot:options>
      <QueryFilterChemistrySelect v-model="selectedItemTemp" />
    </template>
  </QueryFilterBaseContainer>
</template>
