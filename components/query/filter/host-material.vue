<script setup lang="ts">
const queryStore = useQueryStore()

const hostMaterials = await getHostMaterials()
const options = ref<MultiselectOption[]>([])
const selected = ref<MultiselectOption[]>([])
const selectedTemp = ref<MultiselectOption[]>([])

function remove(index: number) {
  const optionToRemove = selected.value.find((item, i) => i === index)

  if (!optionToRemove) return

  const optionIndex = options.value.findIndex(({ value }) => value === optionToRemove.value)
  if (optionIndex === -1) return
  options.value[optionIndex].active = false

  selected.value.splice(index, 1)

  queryStore.setPanelFilter({
    name: QueryKey.HostMaterial,
    value: toQuery(selected.value)
  })

  queryStore.execute()
}

function toQuery(selected: MultiselectOption[]) {
  return selected.length > 0 ? 'IN:' + selected.map(({ value }) => value).join(',') : ''
}

function fromQuery(query: string): string[] {
  query = query.replace('IN:', '')
  return  query.split(',')
}

function submit() {
  selected.value = selectedTemp.value

  const selectedValuesHost = selected.value.map(({ value }) => value)
  options.value = options.value.map(option => {
    option.active = selectedValuesHost.includes(option.value)
    return option
  })

  queryStore.setPanelFilter({
    name: QueryKey.HostMaterial,
    value: toQuery(selected.value)
  })

  queryStore.execute()
}

onMounted(async () => {
  const activeQuery = queryStore.getFilter(QueryKey.HostMaterial)?.value

  let selectedValues: string[] = []

  if (activeQuery) selectedValues = fromQuery(activeQuery)

  selected.value = []

  options.value = hostMaterials?.data
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
</script>

<template>
  <QueryFilterBaseContainer :title="$t('host_material')" :dialog-title="$t('please_select_host_material')" @submit="submit">
    <template v-slot:selected>
      <QueryFilterBaseSelected :items="selected" @remove="remove($event)" />
    </template>
    <template v-slot:options>
      <div class="w-full">
        <BaseMultiselect :options="options" id-prefix="host_material" @change="selectedTemp = $event"/>
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>

<style scoped>

</style>
