import { H3Event } from 'h3'
import { fetchData } from '~/server/utils/fetchGroData'


export default defineEventHandler<PrecompiledFilePreviews | undefined>(
  async ({ node }: H3Event) => {
    const datasets = (<DataverseOKResponse>(
      await fetchData('dataverses/34512/contents')
    ))['data']
    const previewArr: PrecompiledFilePreview[] = []
    for (let dataset of datasets) {
      const { id, protocol, authority, identifier } = dataset
      const precompiled = (<DataverseOKResponse>(
        await fetchData(
          `datasets/${id}/versions/:latest-published?includeFiles=false`,
        )
      ))['data']
      const title =
        precompiled['metadataBlocks']['citation']['fields'][0]['value']
      const version = {
        major: precompiled['versionNumber'],
        minor: precompiled['versionMinorNumber'],
      }
      previewArr.push({
        protocol,
        authority,
        identifier,
        title,
        version,
      })
    }
    return { preview: previewArr }
  },
)
