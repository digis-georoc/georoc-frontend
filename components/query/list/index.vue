<script setup lang="ts">
import Paginator from "primevue/paginator"
import type { PageState } from "primevue/paginator"
import { PaginatorPassThroughOptions } from "~/utils/pt";

const queryStore = useQueryStore()

const listResult = computed(() => queryStore.listResult)
const loading = ref(false)
async function onPageChange(page: PageState) {
  loading.value = true
  await queryStore.executeListQuery(page.first, page.rows)
  loading.value = false
}
</script>
<template>
  <div class="flex flex-col flex-1 bg-white py-4 h-full dark:bg-gray-800 overflow-hidden">
    <h2 class="text-xl font-bold px-4 mb-4 hidden xl:block">{{ $t('selected_samples') }}</h2>
    <template v-if="loading || listResult === null">
      <div class="flex items-center justify-center h-full">
        <BaseLoading class="text-[4rem]"></BaseLoading>
      </div>
    </template>
    <template v-else>
      <template v-if="!listResult?.error && listResult?.totalCount === 0">
        <div class="flex flex-1 items-center justify-center px-4 pb-4 pt-[2px]">
          <span class="text-gray-500">{{ $t('no_samples') }}</span>
        </div>
      </template>
      <template v-else-if="listResult?.error">
        <div class="flex flex-1 items-center justify-center px-4 pb-4 pt-[2px] text-gray-500">
          <div class="max-w-full">
            <p
              v-if="listResult.error.statusCode === 500 || listResult.error.statusCode === 503"
              class="font-semibold flex-1 text-center"
            >
            {{ $t('server_error') }}
          </p>
          <p class="truncate cursor-pointer" :title="listResult.error.statusMessage">{{ listResult.error.statusMessage }}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="overflow-y-auto flex-1 px-4 pb-4 pt-[2px]">
          <QueryListItem v-for="item in listResult.data" :item="item" class="mb-2" />
        </div>
      </template>
    </template>
    <Paginator
        :rows="30"
        :totalRecords="listResult?.totalCount"
        :pageLinkSize="5"
        @page="onPageChange"
        :pt="PaginatorPassThroughOptions"
    />
  </div>
</template>
