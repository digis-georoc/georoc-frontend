const appConfig = useRuntimeConfig()
const apiToken = appConfig.public.apiToken
const baseURL = 'https://api-dev.georoc.eu/api/v1'
interface MapSample {
  SampleID: number,
  Latitude: number,
  Longitude: number
}
interface MapSampleQuery {
  Data: MapSample[],
  NumItems: number
}
interface SamplesResponse {
  data: MapSampleQuery
}

async function getSamples(): Promise<MapSampleQuery | null> {
  const { data} = await useFetch<MapSampleQuery>(
    () => `${baseURL}/queries/samples`,
    {
      query: { limit: 1000, addcoordinates: true },
      headers: {
        'DIGIS-API-ACCESSKEY': apiToken
      }
    }
  )
  // return Promise.resolve(points.map(({ lat, lng }: any, i: number) => ({sampleID: i, lat, lng })))
  return data.value
}

export {
  getSamples
}

