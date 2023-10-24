<script setup lang="ts">
import { RadioGroupOption } from "~/types";
const queryStore = useQueryStore()

const { t } = useI18n()

const emit = defineEmits(['submit'])

const types = [
  {
    value: 'IMIN',
    label: t('mineral'),
  },
  {
    value: 'IFL',
    label: t('fluid'),
  },
  {
    value: 'IGL',
    label: t('glass_melt'),
  },
]
const selectedValueFromStore = queryStore.getCachedFilterValue(QueryKey.InclusionType)
const selected = ref<RadioGroupOption[]>([])
const selectedTemp = ref<RadioGroupOption>(types[0])

function remove() {
  selected.value = []
  queryStore.unsetFilter(QueryKey.InclusionType)
  queryStore.execute()
}

function submit() {
  selected.value = [selectedTemp.value]
  useFilter()
}

function reset() {
  selected.value = []
  useFilter()
}

function useFilter() {
  queryStore.setPanelFilter({
    name: QueryKey.InclusionType,
    value: toQuery(selected.value)
  })

  queryStore.unsetFilter(QueryKey.HostMaterial)
  queryStore.unsetFilter(QueryKey.InclusionMaterial)

  queryStore.execute()
}

function toQuery(selected: RadioGroupOption[]) {
  return selected.length > 0 ? selected[0].value : types[0].value
}

function fromQuery(query: string): RadioGroupOption | null {
  return types.find(({ value }) => value === query) ?? null
}

onMounted(async () => {
  if (selectedValueFromStore) selected.value = [fromQuery(selectedValueFromStore) ?? types[0]]
})

</script>
<template>
  <QueryFilterBaseContainer
    :title="$t('inclusion_type')"
    :dialog-title="$t('please_select_inclusion_type')"
    @submit="submit"
    @reset="reset"
  >
    <template v-slot:selected>
      <QueryFilterBaseSelected :items="selected" @remove="remove()" />
    </template>
    <template v-slot:options>
      <BaseRadioGroup :options="types" v-model="selectedTemp" />
    </template>
  </QueryFilterBaseContainer>
</template>
