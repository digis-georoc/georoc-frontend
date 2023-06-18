<script lang="ts" setup>
interface Props {
  headline: string,
}

const props = withDefaults(defineProps<Props>(), {
  headline: '',
})

</script>
<template>
  <div class="pt-16 pb-8">
      <h1 class="text-3xl font-bold">{{ headline }}</h1>
  </div>
</template>
