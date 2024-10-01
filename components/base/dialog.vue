<script setup lang="ts">
import Dialog from 'primevue/dialog'

const props = withDefaults(defineProps<{
  modelValue: boolean,
  title?: string,
  closable?: boolean
}>(), {
  closable: true
})

const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void;
}>()

function close() {
  emit('update:modelValue', false)
}
function open() {
  emit('update:modelValue', true)
}
</script>
<template>
  <Dialog
    :visible="modelValue"
    modal
    unstyled
    :closable="closable"
    :dismissableMask="closable"
    :pt="{
      root: {
        class: 'bg-white dark:bg-gray-800 p-4 rounded-lg lg:min-w-[33%] shadow-lg'
      },
      header: {
        class: 'flex'
      },
      headerIcons: {
        class: 'ml-auto'
      },
      closeButton: {
        class: 'hover:bg-gray-100 dark:hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center'
      },
      icons: {
        class: 'ml-auto'
      },
      mask: {
        class: 'bg-gray-900 bg-opacity-50'
      },
      content: {
        class: 'max-h-[80vh] overflow-auto'
      }
    }"
    @update:visible="emit('update:modelValue', $event)"
  >
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-400" autofocus>{{ title }}</h3>
    </template>
    <div class="mt-4" ref="containerRef">
      <slot/>
    </div>
  </Dialog>
</template>
