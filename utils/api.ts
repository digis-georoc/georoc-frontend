import {QueryFilter, QueryLocationsResponse} from "~/types";

const appConfig = useRuntimeConfig()
const apiToken = appConfig.public.apiToken
const baseURL = appConfig.public.apiBaseUrl

async function getSamples(filters: QueryFilter[] = []): Promise<QueryLocationsResponse | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })

  const { data} = await useFetch<QueryLocationsResponse>(
    `${baseURL}/queries/samples`,
    {
      query: { limit: 1000, addcoordinates: true, ...filterObj },
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

