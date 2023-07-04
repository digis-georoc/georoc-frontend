<script setup lang="ts">

definePageMeta({
  layout: 'query',
})

const queryStore = useQueryStore()
const isMaterialDialogOpen = ref(window.localStorage.getItem('hide-material-dialog') === null)
const selectedMaterialId = ref('rock')
const dontShowMaterialDialogAgain = ref(false)

function setMaterialFilter() {
  queryStore.setFilter({
    name: 'material',
    value: selectedMaterialId.value
  })

  isMaterialDialogOpen.value = false
  if (dontShowMaterialDialogAgain) window.localStorage.setItem('hide-material-dialog', '')
}

</script>
<template>
  <div class="flex h-full w-full">
    <div class="flex w-[420px] bg-white dark:bg-zinc-800 border-r dark:border-zinc-500">
      <QueryFilters/>
    </div>
    <div class="flex flex-1 h-full">
      <QueryMap/>
    </div>
  </div>
  <BaseDialog title="Please select a material type" v-model="isMaterialDialogOpen">
    <QueryFilterMaterial v-model="selectedMaterialId" />
    <div class="flex justify-between items-center mt-4">
      <BaseCheckbox label="Don't show again" v-model="dontShowMaterialDialogAgain" />
      <BaseButton text="Continue" @click="setMaterialFilter" />
    </div>
  </BaseDialog>
</template>
