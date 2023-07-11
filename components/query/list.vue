<script setup lang="ts">

const queryStore = useQueryStore()

const listResult = computed(() => queryStore.listResult)

const isOpen = ref(false)

</script>
<template>
  <div
    class="flex transition-transform relative h-full"
     :class="{'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <BaseButton
      text="List View"
      icon="ic:round-menu"
      display="mono"
      class="absolute top-6 left-0 -translate-x-[120%]"
      @click="isOpen = !isOpen"
    />
    <div class="flex flex-col flex-1 bg-white p-4 h-full overflow-scroll">
      <template v-if="listResult === null">
        <span>No samples to show.</span>
      </template>
      <template v-else>
        <QueryListItem v-for="item in listResult.Data" :item="item" class="mb-2" />
      </template>
    </div>
  </div>
</template>
