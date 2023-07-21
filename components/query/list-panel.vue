<script setup lang="ts">
  const isOpen = ref(false)
</script>
<template>
  <div class="absolute z-[1000] h-full w-[420px] top-0 flex transition-transform border-l dark:border-zinc-600"
       :class="{'right-0': isOpen, '-right-[420px]': !isOpen }">
    <BaseButton
        :text="$t('list_view')"
        icon="ic:round-format-list-bulleted"
        display="mono"
        class="absolute top-6 left-0 -translate-x-[120%] hidden xl:block"
        @click="isOpen = !isOpen"
    />
    <QueryList/>
  </div>
</template>
