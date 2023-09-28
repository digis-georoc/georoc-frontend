<script setup lang="ts">
import { MultiselectOption, QueryKey } from "~/types"

const queryStore = useQueryStore()

const selectedValueFromStore = computed(() => queryStore.getFilter('rocktype')?.value)
const emit = defineEmits<{
  change: [selected: MultiselectOption[]]
}>()

const options = ref<MultiselectOption[]>([])
const selected = ref<MultiselectOption[]>([])
const selectedTemp = ref<MultiselectOption[]>([])

onMounted(async () => {
  selected.value = []
  const rocktypes = await getRocktypes()

  let selectedValues: string[] = []
  if (selectedValueFromStore.value) {
    selectedValues = fromQuery(selectedValueFromStore.value)
  }

  options.value = rocktypes?.data
    .map(({ value, label }) => {
      const active = selectedValues.includes(value)
      const option = {
        value,
        label,
        active
      }
      if (active) selected.value.push(option)
      return option
    }) ?? []
})

function remove(index: number) {
  selected.value.splice(index, 1)
  queryStore.setPanelFilter({
    name: QueryKey.RockType,
    value: selected.value.length > 0 ? 'IN:' + selected.value.map(({ value }) => value).join(',') : ''
  })
  queryStore.execute()
}

function submit() {
  selected.value = selectedTemp.value
  const selectedValues = selected.value.map(({ value }) => value)

  options.value = options.value.map(option => {
    option.active = selectedValues.includes(option.value)
    return option
  })

  queryStore.setPanelFilter({
    name: QueryKey.RockType,
    value: toQuery(selected.value)
  })
  queryStore.execute()
}

function toQuery(selected: MultiselectOption[]) {
  return selected.length > 0 ? 'IN:' + selected.map(({ value }) => value).join(',') : ''
}

function fromQuery(query: string): string[] {
  query = query.replace('IN:', '')
  return query.split(',')
  // return queryArr.map(value => ({
  //   value,
  //   label: options.find(option => option.value === value)?.label ?? value,
  //   active: true
  // }))
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
