<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  dialogTitle: string,
  showReset: boolean
}>(), {
  title: '',
  dialogTitle: '',
  showReset: false
})

const emit = defineEmits(['submit', 'reset', 'open'])

const isOpen = ref(false)

function onSubmit() {
  isOpen.value = false
  emit('submit')
}

function onReset() {
  emit('reset')
}

function openDialog() {
  emit('open')
  isOpen.value = true
}
</script>
<template>
  <div class="flex flex-col py-6 border-b dark:border-stone-700">
    <div class="flex">
      <h3 v-if="title" class="mb-2 font-bold">{{ title }}</h3>
      <BaseButton v-if="showReset" size="tiny" display="outline" class="ms-auto self-center" @click="onReset" text="Reset"></BaseButton>
    </div>
    <div class="flex flex-col flex-1 items-start">
      <slot name="selected"/>
      <BaseButton class="mt-3" @click="openDialog" :text="$t('select')" size="small"></BaseButton>
    </div>
  </div>
  <BaseDialog :title="dialogTitle" v-model="isOpen">
    <slot name="options"/>
    <BaseButton class="ms-auto mt-2" @click="onSubmit" text="Show XY samples"></BaseButton>
  </BaseDialog>
</template>
