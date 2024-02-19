<script setup lang="ts">
const uiStore = useUiStore()

if (process.client) {
  window.onscroll = () => {
    uiStore.scrolled = window.scrollY > 64;
  }
}
</script>
<template>
  <div class="min-h-full flex-1 flex flex-col" :class="{'scrolled' : uiStore.scrolled }">
    <Header/>
    <main class="relative flex flex-col flex-1 top-0 pt-[64px]">
      <slot/>
    </main>
    <Footer/>
  </div>
</template>
