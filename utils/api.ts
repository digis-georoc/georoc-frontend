const appConfig = useRuntimeConfig()
const apiToken = appConfig.public.apiToken
const baseURL = appConfig.public.apiBaseUrl

async function getSamples(filters: Filter[] = []): Promise<MapSampleQueryResponse | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = value
  })

  const { data} = await useFetch<MapSampleQueryResponse>(
    () => `${baseURL}/queries/samples`,
    {
      query: { limit: 1000, addcoordinates: true, ...filterObj },
      headers: {
        'DIGIS-API-ACCESSKEY': apiToken
      }
    }
  )
  return data.value
}

export {
  getSamples
}

