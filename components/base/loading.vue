<script setup lang="ts">
const props = withDefaults(defineProps<{
  opacity: number
}>(), { opacity: 0.3})
</script>

<template>
  <Icon name="codicon:loading" class="text-zinc-400 animate-spin"></Icon>
</template>

<style scoped>
.line {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: black;
}

.line:nth-last-child(1) {
  animation: loadingC 1.6s 0.1s ease-in-out infinite;
}
.line:nth-last-child(2) {
  animation: loadingC 1.6s 0.4s ease-in-out infinite;
}
.line:nth-last-child(3) {
  animation: loadingC 1.6s 0.6s ease-in-out infinite;
}

@keyframes loadingC {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  50% {
    transform: translate(0, 8px);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
