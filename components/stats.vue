<template>
  <section>
    <BaseFluidContainer>
      <div
        class="flex flex-wrap md:flex-nowrap w-full text-stone-700 dark:text-zinc-400 justify-center"
      >
        <div v-if="pending || stats" class="grow pt-5 md:pb-5">
          <div
            v-if="pending && !stats"
            class="flex h-full justify-center items-center text-stone-700 dark:text-zince-400"
          >
            <BaseLoading class="w-12 h-12 my-5"></BaseLoading>
          </div>
          <div v-else-if="stats" class="flex flex-wrap h-full">
            <div
              class="border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/5 text-center p-4 md:p-2 lg:p-4"
            >
              <span class="text-2xl">{{
                stats.numCitations.toLocaleString($i18n.locale)
              }}</span>
              <span>{{ $t('indexPage.statistic_1') }}</span>
            </div>
            <div
              class="md:border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/5 text-center p-4 md:p-2 lg:p-4"
            >
              <span class="text-2xl">{{
                stats.numSamples.toLocaleString($i18n.locale)
              }}</span>
              <span>{{ $t('indexPage.statistic_2') }}</span>
            </div>
            <div
              class="border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/5 text-center p-4 md:p-2 lg:p-4"
            >
              <span class="text-2xl">{{
                stats.numAnalyses.toLocaleString($i18n.locale)
              }}</span>
              <span>{{ $t('indexPage.statistic_3') }}</span>
            </div>
            <div
              class="flex flex-col w-1/2 md:w-1/5 text-center p-4 md:p-2 lg:p-4"
            >
              <span class="text-2xl">{{
                stats.numResults.toLocaleString($i18n.locale)
              }}</span>
              <span>{{ $t('indexPage.statistic_4') }}</span>
            </div>
            <div
              class="border-t md:border-t-0 md:border-l border-stone-300 dark:border-zinc-700 flex flex-col w-full md:w-1/5 text-center p-4 md:p-2 lg:p-4"
            >
              <span class="text-2xl">{{
                new Date(stats.latestDate).toLocaleDateString($i18n.locale, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              }}</span>
              <span>{{ $t('indexPage.statistic_5') }}</span>
            </div>
          </div>
        </div>
      </div>
    </BaseFluidContainer>
  </section>
</template>
<script setup lang="ts">
const { data: stats, error, pending } = await getStatisticsForClient()
watch(
  () => pending.value,
  (pending) => {
    if (!pending && error.value) {
      console.log(
        'Error while fetching statistics:',
        error.value.statusCode,
        error.value.statusMessage,
      )
    }
  },
)
</script>
