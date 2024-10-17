<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string | number | null,
  noCollapse?: boolean,
  collapsed?: boolean
}>(), { title: '', noCollapse: false, collapsed: false })

const emit = defineEmits(['collapsed-change'])

const _collapsed = ref(false)

watch(() => props.collapsed, (value) => _collapsed.value = value, { immediate: true })
watch(_collapsed, (value) => emit('collapsed-change', value))
</script>

<template>
  <div class="flex flex-col border dark:border-gray-600 shadow-sm rounded-md bg-white dark:bg-gray-800 overflow-hidden">
    <div
      class="flex relative pr-12 border-b transition-colors"
      :class="{'dark:border-gray-700': !_collapsed, 'border-transparent delay-300': _collapsed }"
    >
      <h3 class="font-bold flex-1 py-3 pl-4 hover:cursor-pointer" @click="_collapsed = !_collapsed">{{ title }}</h3>
      <div class="py-3 flex flex-shrink-0">
        <slot name="header-right" />
      </div>
      <BaseButton
        v-if="!noCollapse"
        icon="carbon:chevron-down"
        class="absolute right-2 top-1/2 -translate-y-1/2"
        display="flat"
        color="neutral"
        @click="_collapsed = !_collapsed"
      ></BaseButton>
    </div>
    <div class="flex flex-col overflow-hidden" :class="{
      'max-h-[0px]': _collapsed,
      'max-h-auto': !_collapsed
    }">
      <div class="flex flex-col relative p-4 pr-3">
        <slot />
      </div>
    </div>
  </div>
</template>
