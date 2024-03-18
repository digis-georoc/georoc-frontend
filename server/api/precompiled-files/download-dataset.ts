import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

//prob. better to call only for complete compilation?
export default defineEventHandler<Blob | undefined>(
  async ({ node }: H3Event) => {
    const params = new URLSearchParams(node.req.url?.split('?')[1])
    const paramsObj = Object.fromEntries(params.entries())
    const data = <Blob>(
      await fetchData(
        `access/dataset/:persistentId/?persistentId=${paramsObj.identifier}`,
      )
    )
    return data
  },
)
