<script lang="ts" setup>
const emit = defineEmits(['is-filter-open', 'is-list-open'])
</script>

<template>
  <div class="dark:bg-zinc-800 w-full px-4 py-2">
    <div class="flex">
      <BaseButton
        :text="$t('list_view')"
        icon="ic:round-format-list-bulleted"
        display="flat"
        class="flex xl:hidden me-1"
        @click="emit('list', true)"
      />
      <BaseButton
        :text="$t('filters')"
        icon="mi:filter"
        display="flat"
        class="flex xl:hidden ms-auto"
        @click="emit('filter', true)"
      />
    </div>
  </div>
</template>
