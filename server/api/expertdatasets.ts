import { H3Event } from 'h3'
import { FetchResponse } from 'ofetch'
import { XMLParser } from 'fast-xml-parser'

const { apiGFZURL } = useRuntimeConfig()

export default defineEventHandler<ExpertDatasetResponse | undefined>(
  async ({ node }: H3Event) => {
    const data = await fetchGFZData('?verb=ListRecords&metadataPrefix=oai_dc&set=DOIDB.DIGIS')
    const records = data['ListRecords']['record']

    const rows: ExpertDatasetRow[] = []
    
    for (let record of records) {
      const metadata = record['metadata']['oai_dc:dc']
      rows.push({
        authors: 
          Array.isArray(metadata['dc:creator'])
            ? metadata['dc:creator']
            : [metadata['dc:creator']],
        title: metadata['dc:title'],
        productionDate: 
          Array.isArray(metadata['dc:date'])
            ? metadata['dc:date'][0]
            : metadata['dc:date'],
        persistentUrl: 'https://doi.org/' + metadata['dc:identifier'][1].split(':')[1]
      })
    }
    return { datasets: rows }
  },
)

async function fetchGFZData(query: string): Promise<any> {
  try {
    const response: FetchResponse<string> = await $fetch.raw(
      apiGFZURL + query,
      { method: 'GET' }
    )
    const xml = response._data
    if(xml) {
      const parser = new XMLParser()
      const data = parser.parse(xml)
      return data['OAI-PMH']
    }
    else {
      throw createError({
        message: 'Requested data not found.',
        statusCode: 503
      })
    }
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: error.statusCode,
    })
  }
}
