<script setup lang="ts">
import { MultiselectOption } from "~/types"

const queryStore = useQueryStore()

const selectedValueFromStore = computed(() => queryStore.getFilter('rocktype')?.value)
const emit = defineEmits<{
  change: [selected: MultiselectOption[]]
}>()

const options = ref<MultiselectOption[]>([])
const selected = ref<MultiselectOption[]>([])
const selectedTemp = ref<MultiselectOption[]>([])

onMounted(async () => {
  const rocktypes = await getRocktypes()
  options.value = rocktypes?.data.map(({ value, label }) => ({ value, label, active: false})) ?? []

  if (selectedValueFromStore.value) selected.value = fromQuery(selectedValueFromStore.value, options.value)
})
function remove(index: number) {
  selected.value.splice(index, 1)
  queryStore.setPanelFilter({
    name: 'rocktype',
    value: selected.value.length > 0 ? 'IN:' + selected.value.map(({ value }) => value).join(',') : ''
  })
  queryStore.execute()
}

function submit() {
  selected.value = selectedTemp.value
  queryStore.setPanelFilter({
    name: 'rocktype',
    value: toQuery(selected.value)
  })
  queryStore.execute()
}

function toQuery(selected: MultiselectOption[]) {
  return selected.length > 0 ? 'IN:' + selected.map(({ value }) => value).join(',') : ''
}

function fromQuery(query: string, options: MultiselectOption[]): MultiselectOption[] {
  query = query.replace('IN:', '')
  const queryArr = query.split(',')
  return queryArr.map(value => ({
    value,
    label: options.find(option => option.value === value)?.label ?? value,
    active: true
  }))
}
</script>

<template>
  <QueryFilterBaseContainer :title="$t('rock_type')" :dialog-title="$t('please_select_rock_type')" @submit="submit">
    <template v-slot:selected>
      <QueryFilterBaseSelected :items="selected" @remove="remove($event)" />
    </template>
    <template v-slot:options>
      <div class="w-full">
        <BaseMultiselect :options="options" id-prefix="rocktype" @change="selectedTemp = $event"/>
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>

<style scoped>

</style>
