<script setup lang="ts">
import {MultiselectOption, RadioGroupOption} from "~/types";

const props = withDefaults(defineProps<{
  items: MultiselectOption[] | RadioGroupOption[]
}>(), {
  items: []
})

const emit = defineEmits<{
  remove: [index: number]
}>()

const visibleItems = ref<MultiselectOption[] | RadioGroupOption[]>([])
const hiddenItems = ref<MultiselectOption[] | RadioGroupOption[]>([])
const maxVisibleAmount = 7

watch(() => props.items, value => {
  if (value.length > maxVisibleAmount) {
    visibleItems.value = value.slice(0, maxVisibleAmount)
    hiddenItems.value = value.slice(maxVisibleAmount)
  } else {
    visibleItems.value = value
  }
}, { immediate: true })
</script>
<template>
  <div class="flex flex-wrap gap-1.5">
    <template v-if="items && items.length > 0">
      <div class="bg-zinc-100 py-1.5 px-2 text-zinc-500 font-bold rounded-lg flex items-center flex-shrink-0" v-for="(item, i) in visibleItems">
        <span class="text-sm leading-none">{{ $t(item.label) }}</span>
        <Icon name="ic:round-close" class="cursor-pointer hover:bg-zinc-400 hover:bg-opacity-25 rounded-full p-0.5 ms-2" @click="emit('remove', i)" />
      </div>
      <BasePopover
        button-styles="bg-zinc-100 py-1.5 px-2 text-primary font-bold rounded-lg flex items-center flex-shrink-0 text-sm leading-none"
        :button-title="'+' + hiddenItems.length"
        v-if="hiddenItems.length > 0"
      >
        <h3 class="font-semibold text-sm mb-2">More:</h3>
        <div class="min-w-[160px] max-h-[300px] overflow-auto flex flex-col items-start gap-1.5">
          <div class="bg-zinc-100 py-1.5 px-2 text-zinc-500 font-bold rounded-lg flex items-center" v-for="(item, i) in hiddenItems">
            <span class="text-sm leading-none">{{ $t(item.label) }}</span>
            <Icon name="ic:round-close" class="cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full p-0.5 ms-2" @click="emit('remove', i)" />
          </div>
        </div>
      </BasePopover>
    </template>
    <div v-else class="text-sm text-zinc-400">{{ $t('no_options_selected') }}.</div>
  </div>
</template>
