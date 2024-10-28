<script setup lang="ts">
import { FetchError } from 'ofetch'

const { t } = useI18n()

let expertDataSetError: FetchError | undefined
const rows: ExpertDatasetRow[] = []
try {
  const expertDataSets = <ExpertDatasetResponse>await getExpertDatasets()  
  expertDataSets?.datasets.forEach(dataset => {
    rows.push({...dataset, authors: formatAuthors(dataset.authors)})
  })
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
    field: 'productionDate',
    header: t('year'),
  },
  {
    field: 'persistentUrl',
    header: t('link_to_dataset'),
  },
]

function formatAuthors(authorList: string[]): string {
  function getLastName(fullname: string): string {
    return fullname.split(',')[0]
  }
  if (authorList.length <= 0) {
    return ''
  }
  if (authorList.length == 1) {
    return getLastName(authorList[0])
  }
  if (authorList.length == 2) {
    return (
      getLastName(authorList[0]) +
      ' & ' +
      getLastName(authorList[1])
    )
  }
  return getLastName(authorList[0]) + ' et al.'
}
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
        :rows="rows"
        :columns="columns"
        :link-to-dataset-text="t('show_expert_dataset')"
      ></BaseDataTable>
    </template>
  </PageContainer>
</template>
