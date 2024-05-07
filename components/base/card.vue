<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string | number | null,
  noCollapse?: boolean,
  collapsed?: boolean
}>(), { title: '', noCollapse: false, collapsed: false })

const _collapsed = ref(false)

watch(() => props.collapsed, (value) => _collapsed.value = value, { immediate: true } )
</script>

<template>
  <div class="flex flex-col border dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 overflow-hidden">
    <div
      class="flex relative pr-12 border-b transition-colors"
      :class="{'dark:border-zinc-600': !_collapsed, 'border-transparent delay-300': _collapsed }"
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
        @click="_collapsed = !_collapsed"
      ></BaseButton>
    </div>
    <div class="flex flex-col overflow-hidden transition-all duration-600" :class="{
      'max-h-[0px]': _collapsed,
      'max-h-[200vh]': !_collapsed
    }">
      <div class="flex flex-col relative p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
