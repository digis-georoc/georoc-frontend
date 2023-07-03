<script setup lang="ts">
const props = defineProps<{
  title: String
}>();

</script>
<template>
  <div class="flex flex-col">
    <h3 class="mb-2">{{ title }}</h3>
    <div class="flex">
      <slot/>
    </div>
  </div>
</template>
