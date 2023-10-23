<script lang="ts" setup>
import { SelectedChemicalElement } from "~/types";

const queryStore = useQueryStore()

const selected = ref<SelectedChemicalElement[]>([])
const selectedItemTemp = ref<SelectedChemicalElement>(createEmptySelectedItem())

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
  const value = selected.value.map(({ type, element, min, max }) => `(${type?.value},${element?.value},${min},${max})`).join(',')

  if (value === '') {
    queryStore.unsetFilter('chemistry')
  } else {
    queryStore.setPanelFilter({
      name: 'chemistry',
      value
    })
  }

  queryStore.execute()
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
