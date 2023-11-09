<script setup lang="ts">
import Dialog from 'primevue/dialog'

const props = withDefaults(defineProps<{
  modelValue: boolean,
  title?: string,
  closable: boolean
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
        class: 'bg-white dark:bg-zinc-800 p-4 rounded-lg lg:w-1/3 shadow-lg'
      },
      header: {
        class: 'flex'
      },
      headerIcons: {
        class: 'ml-auto'
      },
      closeButton: {
        class: 'hover:bg-zinc-100 dark:hover:bg-zinc-700 w-8 h-8 rounded-full flex items-center justify-center'
      },
      mask: {
        class: 'bg-zinc-900 bg-opacity-50'
      }
    }"
    @update:visible="emit('update:modelValue', $event)"
  >
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-400">{{ title }}</h3>
    </template>
    <div class="mt-4" ref="containerRef">
      <slot/>
    </div>
  </Dialog>
</template>
