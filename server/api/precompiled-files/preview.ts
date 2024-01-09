import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

export default defineEventHandler<PrecompiledFilePreviews | undefined>(
  async ({ node }: H3Event) => {
    const datasets = (<DataverseOKResponse>(
      await fetchData('dataverses/34512/contents')
    ))['data']
    const previewArr: PrecompiledFilePreview[] = []
    for (let dataset of datasets) {
      const { id, protocol, authority, identifier } = dataset
      const precompiled = (<DataverseOKResponse>(
        await fetchData(`datasets/${id}/versions/:latest-published/metadata`)
      ))['data']
      const { title } = precompiled
      previewArr.push({ protocol, authority, identifier, title })
    }
    return { preview: previewArr }
  },
)
