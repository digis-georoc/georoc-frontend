<template>
  <div class="bg-white dark:bg-gray-800">
    <BaseContainer :style="{'min-height': minHeight + 'px'}">
      <slot/>
    </BaseContainer>
  </div>
</template>
<script setup lang="ts">
let headerHeight = 0;
let footerHeight = 0;
const minHeight = ref(300);

onMounted(() => {
  const header = document.querySelector('nav');
  const footer = document.querySelector('footer');
  const viewHeight = window.innerHeight;
  if (header) {
    headerHeight = header.offsetHeight;
  }

  if (footer) {
    footerHeight = footer.clientHeight;
  }

  minHeight.value = viewHeight - headerHeight - footerHeight;

})
</script>
