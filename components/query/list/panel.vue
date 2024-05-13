<script setup lang="ts">
  const isOpen = ref(false)
</script>
<template>
  <div class="relative z-[1000] h-full shadow-2xl w-[480px] top-0 flex transition-all border-l dark:border-zinc-600"
       :class="{'me-0': isOpen, '-me-[480px]': !isOpen }">
    <BaseButton
        :text="$t('list_view')"
        icon="ic:round-format-list-bulleted"
        display="mono"
        class="absolute xl:top-[78px] 2xl:top-[26px] left-0 -translate-x-[120%] hidden xl:block shadow-lg"
        @click="isOpen = !isOpen"
    />
    <QueryList/>
  </div>
</template>
