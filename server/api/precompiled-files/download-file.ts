import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

export default defineEventHandler<Blob | undefined>(
  async ({ node }: H3Event) => {
    const params = new URLSearchParams(node.req.url?.split('?')[1])
    const paramsObj = Object.fromEntries(params.entries())
    const datatype = paramsObj['isDataset'] == 'true' ? 'dataset' : 'datafile'
    const data = <Blob | string>(
      await fetchData(
        `access/${datatype}/:persistentId/?persistentId=${paramsObj.identifier}`,
      )
    )
    let blob: Blob
    if (!(data instanceof Blob)) {
      blob = new Blob([data])
    } else {
      blob = data
    }
    return blob
  },
)
