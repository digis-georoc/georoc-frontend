import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

export default defineEventHandler<string | undefined>(
  async ({ node }: H3Event) => {
    const params = new URLSearchParams(node.req.url?.split('?')[1])
    const paramsObj = Object.fromEntries(params.entries())
    const data = (<DataverseOKResponse>(
      await fetchData(
        `datasets/:persistentId/versions/${paramsObj['version']}?persistentId=${paramsObj['identifier']}`,
      )
    ))['data']
    //if fileIds are provided the metadata should include only these files
    if (typeof paramsObj['fileIds'] !== 'undefined') {
      const fileIds: number[] = paramsObj['fileIds'].split(',').map(Number)
      data['files'] = data['files'].filter((file: any) =>
        fileIds.includes(file['dataFile']['id']),
      )
    }
    return JSON.stringify(data)
  },
)
