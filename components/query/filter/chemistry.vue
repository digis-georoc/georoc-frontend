<script lang="ts" setup>
const queryStore = useQueryStore()
function remove(index: number) {
  // selected.value.splice(index, 1)
  // queryStore.setPanelFilter({
  //   name: 'rocktype',
  //   value: selected.value.length > 0 ? 'IN:' + selected.value.map(({ value }) => value).join(',') : ''
  // })
  // queryStore.execute()
}

function submit() {
  // selected.value = selectedTemp.value
  // queryStore.setPanelFilter({
  //   name: 'chemistry',
  //   value: 'MGO>0.5&SIO2<=1.82|AU=2'
  // })
  // queryStore.execute()
}

</script>
<template>
  <QueryFilterBaseContainer :title="$t('chemistry')" @submit="submit">
    <template v-slot:selected>
      <QueryFilterBaseSelected />
    </template>
    <template v-slot:options>

    </template>
  </QueryFilterBaseContainer>
</template>
