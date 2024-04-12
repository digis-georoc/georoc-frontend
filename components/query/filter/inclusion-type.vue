<script setup lang="ts">
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
const selected = ref<RadioGroupOption[]>([])
const selectedTemp = ref<RadioGroupOption | null>(null)

function remove() {
  selected.value = []
  queryStore.unsetFilter(QueryKey.InclusionType)
}

function submit() {
  selected.value = selectedTemp.value ? [selectedTemp.value] : []
  useFilter()
}

function reset() {
  selected.value = []
  selectedTemp.value = null
  useFilter()
}

function useFilter(withCache = true) {
  queryStore.setPanelFilter({
    name: QueryKey.InclusionType,
    value: toQuery(selected.value)
  }, withCache)

  if (withCache) {
    queryStore.unsetFilter(QueryKey.HostMaterial)
    queryStore.unsetFilter(QueryKey.InclusionMaterial)
  }
}

function toQuery(selected: RadioGroupOption[]) {
  return selected.length > 0 ? selected[0].value : types[0].value
}

function fromQuery(query: string): RadioGroupOption | null {
  return types.find(({ value }) => value === query) ?? null
}

onMounted(async () => {
  const activeQuery = queryStore.getFilter(QueryKey.InclusionType)?.value

  if (activeQuery) {
    selected.value = [fromQuery(activeQuery) ?? types[0]]
    selectedTemp.value = selected.value[0]
    useFilter(false)
  }
})

</script>
<template>
  <QueryFilterBaseContainer
    :title="$t('inclusion_type')"
    :dialog-title="$t('please_select_inclusion_type')"
    :has-selected="selected.length > 0"
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
