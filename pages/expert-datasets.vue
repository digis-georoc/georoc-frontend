<script setup lang="ts">
  import expertdatasets from '~/server/api/expertdatasets';
  import { ExpertDatasetResponse } from '~/types';
  const expertDataSets = await getExpertDatasets();
  const { t } = useI18n();
  const columns = [
    {
      field: "authors",
      header: t('authors')
    },
    {
      field: "title",
      header: t('title')
    },
    {
      field: "versionNr",
      header: t('ver')
    },
    {
      field: "productionDate",
      header: t('prod_date')
    },
    {
      field: "persistentUrl",
      header: t('link_to_dataset')
    }
  ]
</script>
<template>
  <PageContainer>
    <PageHead headline="Expert Datasets"/>
    <BaseFluidContainer>
      <BaseDataTable :rows="expertDataSets?.datasets" :columns="columns" :link-to-dataset-text="t('show_expert_dataset')"></BaseDataTable>
    </BaseFluidContainer>
  </PageContainer>
</template>
