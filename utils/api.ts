import {QueryFilter, QueryLocationsResponse, RocktypesResponse } from "~/types";

async function getSamples(filters: QueryFilter[] = [], { signal }: AbortController): Promise<QueryLocationsResponse | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })

  try {
    const res: Response = await fetch(
      '/api/query?' + Object.keys(filterObj).map(key => key + '=' + filterObj[key]).join('&'),
      { signal }
    )
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('abort')
  }
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

