import {QueryFilter, QueryLocationsResponse, QueryLocationsResponseItem} from "~/types";

const appConfig = useRuntimeConfig()
const apiToken = appConfig.public.apiToken
const baseURL = appConfig.public.apiBaseUrl

async function getSamples(filters: QueryFilter[] = []): Promise<QueryLocationsResponseItem[] | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })

  const { data} = await useFetch<QueryLocationsResponseItem[]>(
    `${baseURL}/geodata/samplesclustered`,
    {
      query: { addcoordinates: true, ...filterObj },
      headers: {
        'DIGIS-API-ACCESSKEY': apiToken
      },
      watch: false
    }
  )
  return data.value
}

export {
  getSamples
}

