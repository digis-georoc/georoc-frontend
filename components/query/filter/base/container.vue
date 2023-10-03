<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  dialogTitle: string
}>(), {
  title: '',
  dialogTitle: ''
})

const emit = defineEmits(['submit'])

const isOpen = ref(false)

function onSubmit() {
  isOpen.value = false
  emit('submit')
}
</script>
<template>
  <div class="flex flex-col h-full">
    <h3 v-if="title" class="mb-2 font-bold">{{ title }}</h3>
    <div class="flex flex-col flex-1 items-start">
      <div class="flex w-full mb-2">
        <slot name="selected"/>
      </div>
      <BaseButton class="mt-3" @click="isOpen = true" text="Select" size="small"></BaseButton>
    </div>
  </div>
  <BaseDialog :title="dialogTitle" v-model="isOpen">
    <slot name="options"/>
    <BaseButton class="ms-auto mt-2" @click="onSubmit" text="Show XY samples"></BaseButton>
  </BaseDialog>
</template>
