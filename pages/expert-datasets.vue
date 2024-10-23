<script setup lang="ts">
import { FetchError } from 'ofetch'

const { t } = useI18n()

let expertDataSets: ExpertDatasetResponse | undefined
let expertDataSetError: FetchError | undefined
try {
  expertDataSets = <ExpertDatasetResponse>await getExpertDatasets()
} catch (error: any) {
  expertDataSetError = error
}

const columns = [
  {
    field: 'authors',
    header: t('authors'),
  },
  {
    field: 'title',
    header: t('title'),
  },
  {
    field: 'versionNr',
    header: t('ver'),
  },
  {
    field: 'productionDate',
    header: t('prod_date'),
  },
  {
    field: 'persistentUrl',
    header: t('link_to_dataset'),
  },
]
</script>
<template>
  <PageContainer>
    <PageHead headline="Expert Datasets" />
    <BaseError
      v-if="expertDataSetError"
      :error="expertDataSetError"
    ></BaseError>
    <template v-else>
      <BaseDataTable
        :rows="expertDataSets?.datasets"
        :columns="columns"
        :link-to-dataset-text="t('show_expert_dataset')"
      ></BaseDataTable>
    </template>
  </PageContainer>
</template>
