import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

export default defineEventHandler<string | undefined>(
  async ({ node }: H3Event) => {
    const params = new URLSearchParams(node.req.url?.split('?')[1])
    const paramsObj = Object.fromEntries(params.entries())
    const data = <string>(
      await fetchData(
        `datasets/export?exporter=dataverse_json&persistentId=${paramsObj['identifier']}`,
      )
    )
    return JSON.stringify(data)
  },
)
