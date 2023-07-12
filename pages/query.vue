<script setup lang="ts">

definePageMeta({
  layout: 'query',
})

const queryStore = useQueryStore()
const isMaterialDialogOpen = ref(window.localStorage.getItem('hide-material-dialog') === null)
const storedMaterialFilter = window.localStorage.getItem('material-filter')
const initialMaterialId = storedMaterialFilter !== null ? storedMaterialFilter : 'WR'

const selectedMaterialId = ref(isMaterialDialogOpen ? initialMaterialId : null)
const dontShowMaterialDialogAgain = ref(false)

const isListOpen = ref(false)

function setMaterialFilter() {
  queryStore.setFilter({
    name: 'material',
    value: selectedMaterialId.value
  })
}

function handleDialogContinue() {
  isMaterialDialogOpen.value = false
  if (dontShowMaterialDialogAgain.value) window.localStorage.setItem('hide-material-dialog', '')
  else window.localStorage.removeItem('hide-material-dialog')

  setMaterialFilter()
}

onMounted(() => {
  if (!isMaterialDialogOpen.value) setMaterialFilter()
})

</script>
<template>
  <div class="flex h-full w-full">
    <div class="flex w-[420px] bg-white dark:bg-zinc-800 border-r dark:border-zinc-500">
      <QueryFilters/>
    </div>
    <div class="flex flex-1 h-full relative">
      <QueryMap/>
      <div class="absolute z-[1000] h-full w-[420px] top-0 flex transition-transform"
           :class="{'right-0': isListOpen, '-right-[420px]': !isListOpen }">
        <BaseButton
            text="List View"
            icon="ic:round-menu"
            display="mono"
            class="absolute top-6 left-0 -translate-x-[120%]"
            @click="isListOpen = !isListOpen"
        />
        <QueryList/>
      </div>
    </div>
  </div>
  <BaseDialog title="Please select a material type" v-model="isMaterialDialogOpen">
    <QueryFilterMaterial v-model="selectedMaterialId" />
    <div class="flex justify-between items-center mt-4">
      <BaseCheckbox label="Don't show again" v-model="dontShowMaterialDialogAgain" />
      <BaseButton text="Continue" @click="handleDialogContinue" />
    </div>
  </BaseDialog>
</template>
