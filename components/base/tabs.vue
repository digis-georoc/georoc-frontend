<script setup lang="ts">
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
const props = defineProps<{
  headers: any
}>()
</script>
<template>
  <TabView
    :unstyled="true"
    :pt="{
      nav: { class: 'flex space-x-1 border-b dark:border-zinc-600' },
    }"
  >
    <TabPanel
      v-for="(header, index) in headers"
      :header="header"
      :unstyled="true"
      :pt="{
        header: { class: 'font-medium' },
        headerAction: ({ props, parent }) => ({
          class: [
            'flex justify-center border-t border-x py-2 px-4 min-w-[100px] rounded-t-md select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus:ring-primary-100',
            parent.state.d_activeIndex === index
              ? 'border-primary bg-primary text-white'
              : 'border-zinc-300 dark:border-zinc-600 hover:bg-primary-50 hover:text-black',
          ],
        }),
      }"
    >
      <slot :name="`${header}-slot`"></slot>
    </TabPanel>
  </TabView>
</template>
