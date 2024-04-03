<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string,
  noCollapse?: boolean
}>(), { title: '', noCollapse: false })

const collapsed = ref(false)
</script>

<template>
  <div class="flex flex-col border dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 overflow-hidden">
    <div
      class="flex relative pl-4 pr-12 py-3 border-b transition-colors"
      :class="{'dark:border-zinc-600': !collapsed, 'border-transparent delay-300': collapsed }"
    >
      <h3 class="font-bold">{{ title }}</h3>
      <slot name="header-right" />
      <BaseButton
        v-if="!noCollapse"
        icon="carbon:chevron-down"
        class="absolute right-2 top-1/2 -translate-y-1/2"
        display="flat"
        @click="collapsed = !collapsed"
      ></BaseButton>
    </div>
    <div class="flex flex-col overflow-hidden transition-all duration-300" :class="{
      'max-h-[0px]': collapsed,
      'max-h-full': !collapsed
    }">
      <div class="flex flex-col relative p-4">
        <slot />
      </div>
    </div>
  </div>
</template>