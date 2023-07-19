<script lang="ts" setup>

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>
<template>
  <div class="flex bg-white dark:bg-zinc-800 border-t dark:border-zinc-600
    absolute left-0 z-[1100] w-full h-[66%] flex-col transition-[bottom]"
       :class="{'-bottom-full': !modelValue, 'bottom-0' : modelValue}"
       style="box-shadow: 0 -20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.1);"
  >
    <div class="flex items-center px-4 py-2">
      <h2 class="text-xl font-bold">List</h2>
      <BaseButton
          icon="ic:baseline-close"
          display="flat"
          class="ms-auto flex xl:hidden mt-1 me-1"
          @click="emit('update:modelValue', !modelValue)"
      />
    </div>
    <QueryList/>
  </div>
</template>
