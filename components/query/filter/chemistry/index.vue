<script lang="ts" setup>
import {ElementsResponse, ElementTypesResponse, RadioGroupOption, SelectedChemicalElement} from "~/types";

const queryStore = useQueryStore()

const elements = ref<ElementsResponse | null>()
const elementTypes = ref<ElementTypesResponse | null>()

const elementOptions = ref<RadioGroupOption[]>([])
const elementTypesOptions = ref<RadioGroupOption[]>([])

const selected = ref<SelectedChemicalElement[]>([])
const selectedItemTemp = ref<SelectedChemicalElement>(createEmptySelectedItem())

function removeSelected(index: number) {
  selected.value.splice(index, 1)
  // queryStore.setPanelFilter({
  //   name: 'rocktype',
  //   value: selected.value.length > 0 ? 'IN:' + selected.value.map(({ value }) => value).join(',') : ''
  // })
  // queryStore.execute()
}

function createEmptySelectedItem() {
  return {
    type: null,
    element: null,
    min: 0,
    max: 100
  }
}

async function submit() {
  console.log(selectedItemTemp.value)
  selected.value.push(selectedItemTemp.value)
  selectedItemTemp.value = createEmptySelectedItem()

  // selected.value = selectedTemp.value
  // queryStore.setPanelFilter({
  //   name: 'chemistry',
  //   value: 'MGO>0.5&SIO2<=1.82|AU=2'
  // })
  // await $fetch.raw(apiBaseUrl + '/geodata/samplesclustered', {
  //   query: Object.fromEntries(params.entries()),
  //   method: 'GET',
  //   headers: {
  //     'DIGIS-API-ACCESSKEY': apiToken,
  //   }
  // });
  // queryStore.execute()
}

onMounted(async () => {
  elements.value = await getElements('')
  elementTypes.value = await getElementTypes()

  elementOptions.value = elements.value?.data.map(({ name }) => ({ label: name, value: name })).slice(0, 10) ?? []
  elementTypesOptions.value = elementTypes.value?.data.map(({ name }) => ({ label: name, value: name })).slice(0, 10) ?? []
})

</script>
<template>
  <QueryFilterBaseContainer :title="$t('chemistry')" :dialog-title="$t('please_select_chemistry')" @submit="submit">
    <template v-slot:selected>
      <div v-if="selected.length > 0" class="flex flex-col flex-1">
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
          <div>
            <Icon name="ic:close" @click="removeSelected(i)" class="cursor-pointer"/>
          </div>
        </div>
      </div>
      <div v-else class="text-sm text-stone-400">{{ $t('no_options_selected') }}.</div>
    </template>
    <template v-slot:options>
      <QueryFilterChemistrySelect
        v-model="selectedItemTemp"
        :element-options="elementOptions"
        :element-types-options="elementTypesOptions"
      />
    </template>
  </QueryFilterBaseContainer>
</template>
