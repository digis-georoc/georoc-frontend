import {QueryFilter, QueryLocationsResponseItem} from "~/types";

async function getSamples(filters: QueryFilter[] = []): Promise<QueryLocationsResponseItem[] | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })


  const { data} = await useFetch<QueryLocationsResponseItem[]>(
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

