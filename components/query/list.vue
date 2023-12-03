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
  <div class="flex flex-col flex-1 bg-white py-4 h-full dark:bg-zinc-800">
    <template v-if="listResult === null">
      <span>{{ $t('no_samples') }}</span>
    </template>
    <template v-else>
      <h2 class="text-xl font-bold px-4 mb-4">{{ $t('samples') }}</h2>
      <div class="overflow-y-auto flex-1 px-4 pb-4 pt-[2px]">
        <template v-if="loading">
          <div class="flex items-center justify-center h-full">
            <BaseLoading class="text-[4rem]"></BaseLoading>
          </div>
        </template>
        <template v-else>
          <QueryListItem v-for="item in listResult.data" :item="item" class="mb-2" />
        </template>
      </div>
      <Paginator
        :rows="30"
        :totalRecords="listResult.totalCount"
        pageLinkSize="3"
        @page="onPageChange" :rowsPerPageOptions="[10, 20, 30]"
        :pt="PaginatorPassThroughOptions"
      >
      </Paginator>
    </template>
  </div>
</template>
