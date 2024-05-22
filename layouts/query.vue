<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <Header />
    <main class="relative h-full top-0 pt-[64px] overflow-hidden">
      <slot />
    </main>
    <SmallFooter />
  </div>
</template>
<script setup lang="ts"></script>
