import { createError, H3Error, H3Event } from 'h3'
import { FetchResponse } from 'ofetch'

const { apiExpertToken, apiExpertUrl } = useRuntimeConfig()

export default defineEventHandler<ExpertDatasetResponse | undefined>(
  async ({ node }: H3Event) => {
    //get the collection of datasets to fetch
    const collectionData = (<DataverseOKResponse>(
      await fetchData('dataverses/digis/contents')
    ))['data']
    const datasetIDs = []
    const datasets = []
    //get the dataset ids
    for (let i = 0; i < collectionData.length; i++) {
      if (collectionData[i]['title'].startsWith('Compilations ')) {
        let id = collectionData[i]['id']
        let dataverseEntrys = (<DataverseOKResponse>(
          await fetchData(`dataverses/${id}/contents`)
        ))['data']
        for (let entry of dataverseEntrys) {
          datasetIDs.push(entry['id'])
        }
      }
    }
    //get the datasets
    for (let i = 0; i < datasetIDs.length; i++) {
      let id = datasetIDs[i]
      datasets.push(
        (<DataverseOKResponse>await fetchData(`datasets/${id}`))['data'],
      )
    }
    const rows: ExpertDatasetRow[] = []
    for (let dataset of datasets) {
      rows.push({
        authors: formatAuthors(
          dataset['latestVersion']['metadataBlocks']['citation']['fields'][1][
            'value'
          ],
        ),
        title:
          dataset['latestVersion']['metadataBlocks']['citation']['fields'][0][
            'value'
          ],
        versionNr:
          dataset['latestVersion']['versionNumber'] +
          '.' +
          dataset['latestVersion']['versionMinorNumber'],
        productionDate: parseInt(
          dataset['latestVersion']['productionDate'].split('-')[0],
        ),
        persistentUrl: dataset['persistentUrl'],
      })
    }
    return { datasets: rows }
  },
)

export async function fetchData(
  path: string,
): Promise<DataverseOKResponse | Blob | string | undefined> {
  try {
    const response: FetchResponse<DataverseOKResponse | Blob | string> =
      await $fetch.raw(apiExpertUrl + path, {
        method: 'GET',
      })
    return response._data
  } catch (error: any) {
    //Dataverse errors during fetching are visible in full in the error message
    throw createError({
      statusMessage: error.message,
      statusCode: error.statusCode,
    })
  }
}

function formatAuthors(authorList: any): string {
  function getLastName(fullname: string): string {
    return fullname.split(',')[0]
  }
  if (authorList.length <= 0) {
    return ''
  }
  if (authorList.length == 1) {
    return authorList[0]['authorName']['value']
  }
  if (authorList.length == 2) {
    return (
      getLastName(authorList[0]['authorName']['value']) +
      ' & ' +
      getLastName(authorList[1]['authorName']['value'])
    )
  }
  return getLastName(authorList[0]['authorName']['value']) + ' et al.'
}
