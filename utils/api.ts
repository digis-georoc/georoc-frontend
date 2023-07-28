import {QueryFilter, QueryLocationsResponse} from "~/types";

async function getSamples(filters: QueryFilter[] = []): Promise<QueryLocationsResponse | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })


  const { data} = await useFetch<QueryLocationsResponse>(
    '/api/query',
    {
      query: { addcoordinates: true, ...filterObj }
    }
  )
  return data.value
}

export {
  getSamples
}

