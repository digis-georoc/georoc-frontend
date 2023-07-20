<script setup lang="ts">
const props = defineProps<{
  title?: String
}>();

</script>
<template>
  <div class="flex flex-col mb-6">
    <h3 v-if="title" class="mb-2">{{ title }}</h3>
    <div class="flex">
      <slot/>
    </div>
  </div>
</template>
