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
      nav: { class: 'flex space-x-1 py-2' },
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
            'p-2 rounded-t-md select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-300',
            parent.state.d_activeIndex === index
              ? 'bg-primary text-white'
              : 'hover:bg-primary-50 hover:text-black',
          ],
        }),
      }"
    >
      <slot :name="`${header}-slot`"></slot>
    </TabPanel>
  </TabView>
</template>
