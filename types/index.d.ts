interface QueryFilter {
  name: string,
  value: any
}

interface MapSample {
  SampleID: number,
  Latitude: number,
  Longitude: number
}

interface SampleItem {
  SampleID: number,
  Latitude: number,
  Longitude: number
}
interface QueryLocationsResponse {
  Data: MapSample[],
  NumItems: number
}

interface QueryListResponse {
  Data: MapSample[],
  NumItems: number
}
interface ResponseRef<T> {
  data: T
}

interface QueryState {
  activeFilters: QueryFilter[],
  result: QueryLocationsResponse | null,
  listResult: QueryListResponse | null
}

export {
  QueryFilter,
  QueryState,
  SampleItem,
  MapSample,
  QueryLocationsResponse
}


