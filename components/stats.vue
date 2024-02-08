<template>
  <section v-if="stats" class="py-5">
    <BaseContainer>
      <div
        class="flex flex-wrap md:flex-nowrap w-full text-stone-700 dark:text-zinc-400"
      >
        <div
          class="border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
        >
          <span class="text-2xl">{{
            stats?.numCitations.toLocaleString($i18n.locale)
          }}</span>
          <span>{{ $t('indexPage.statistic_1') }}</span>
        </div>
        <div
          class="md:border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
        >
          <span class="text-2xl">{{
            stats?.numSamples.toLocaleString($i18n.locale)
          }}</span>
          <span>{{ $t('indexPage.statistic_2') }}</span>
        </div>
        <div
          class="border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
        >
          <span class="text-2xl">{{
            stats?.numAnalyses.toLocaleString($i18n.locale)
          }}</span>
          <span>{{ $t('indexPage.statistic_3') }}</span>
        </div>
        <div
          class="border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
        >
          <span class="text-2xl">{{
            stats?.numResults.toLocaleString($i18n.locale)
          }}</span>
          <span>{{ $t('indexPage.statistic_4') }}</span>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
<script setup lang="ts">
const { data: stats, error } = await getStatistics()
if (error.value) {
  console.log(
    'Error while fetching statistics:',
    error.value.statusCode,
    error.value.statusMessage,
  )
}
</script>
