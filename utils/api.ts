import {QueryFilter, QueryLocationsResponse, RocktypesResponse } from "~/types";

async function getSamples(filters: QueryFilter[] = []): Promise<QueryLocationsResponse | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })


  const { data} = await useFetch<QueryLocationsResponse>(
    '/api/query',
    {
      query: { ...filterObj }
    }
  )
  return data.value
}

async function getRocktypes(): Promise<RocktypesResponse | null> {
  const { data} = await useFetch<RocktypesResponse>(
    '/api/rocktypes',
  )
  return data.value
}

export {
  getSamples,
  getRocktypes
}

