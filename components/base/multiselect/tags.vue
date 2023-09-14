<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  remove: [index: number]
  'update:modelValue': [list: string[]]
}>()


function remove(index: number) {
  emit('remove', index)
}
</script>

<template>
  <div class="flex items-center w-full">
    <span class="text-sm text-gray-600 pe-2 flex-shrink-0">{{ $t('active_filters')}}:</span>
    <div class="flex overflow-x-auto space-x-1.5 pb-1">
      <div class="bg-primary-100 py-1.5 px-2 text-primary font-bold rounded-lg flex items-center flex-shrink-0" v-for="(item, i) in modelValue">
        <span class="text-sm leading-none">{{ item }}</span>
        <Icon name="ic:round-close" class="cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full p-0.5 ms-2" @click="remove(i)" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
