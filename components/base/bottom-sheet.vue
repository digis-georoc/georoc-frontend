<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title?: string
  fullHeight?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>
<template>
  <div class="flex bg-white dark:bg-zinc-800 border-t dark:border-zinc-600
    absolute left-0 z-[1099] w-full flex-col transition-[bottom] bottom-"
    :class="{'-bottom-[100vh]': !modelValue, 'bottom-0' : modelValue, 'h-[60%]': !fullHeight, 'h-full': fullHeight }"
    style="box-shadow: 0 -20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.1);"
  >
    <div class="flex items-center px-4 py-2">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <BaseButton
        icon="ic:baseline-close"
        display="flat"
        class="ms-auto flex xl:hidden mt-1 me-1"
        @click="emit('update:modelValue', !modelValue)"
      />
    </div>
    <slot/>
  </div>
</template>
