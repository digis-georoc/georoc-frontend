<template>
  <div v-if="lastDatabaseUpdate || pending">
    <slot name="before"></slot>
    <span v-if="lastDatabaseUpdate">
      {{
        lastDatabaseUpdate?.toLocaleDateString($i18n.locale, {
          day: '2-digit',
          month: month,
          year: 'numeric',
        })
      }}
    </span>
    <span v-else-if="pending"><BaseLoading /></span>
    <slot name="after"></slot>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    month?: 'long' | 'short'
  }>(),
  {
    month: 'long',
  },
)
const { data: stats, error, pending } = await getStatisticsForClient()
const lastDatabaseUpdate = ref<Date | undefined>(undefined)
watch(
  () => pending.value,
  (pending) => {
    if (!pending) {
      if (error.value) {
        console.log(
          'Error while fetching precompiled files preview:',
          error.value.statusCode,
          error.value.statusMessage,
        )
      } else if (stats.value) {
        lastDatabaseUpdate.value = new Date(stats.value.latestDate)
      }
    }
  },
)
</script>
