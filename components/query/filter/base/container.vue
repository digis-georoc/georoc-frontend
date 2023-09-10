<script setup lang="ts">
const props = defineProps<{
  title?: string,
  dialogTitle: string
}>()

const emit = defineEmits(['submit'])

const isOpen = ref(window.localStorage.getItem('hide-material-dialog') === null)

function onSubmit() {
  isOpen.value = false
  emit('submit')
}
</script>
<template>
  <div class="flex flex-col h-full">
    <h3 v-if="title" class="mb-2 font-semibold">{{ title }}</h3>
    <div class="flex flex-col flex-1 items-start">
      <div class="flex mb-2">
        <slot name="selected"/>
      </div>
      <BaseButton class="mt-auto" @click="isOpen = true" text="Select" size="small"></BaseButton>
    </div>
  </div>
  <BaseDialog :title="dialogTitle" v-model="isOpen">
    <slot name="options"/>
    <BaseButton class="ms-auto mt-2" @click="onSubmit" text="Show XY samples"></BaseButton>
  </BaseDialog>
</template>
