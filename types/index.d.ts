interface QueryFilter {
  name: 'material' | 'polygon',
  value: any
}

interface MapSample {
  sampleID: number,
  latitude: number,
  longitude: number
}

interface SampleItem {
  sampleID: number,
  latitude: number,
  longitude: number
}
interface QueryLocationsResponse {
  data: MapSample[],
  numItems: number
}

interface QueryListResponse {
  data: MapSample[],
  numItems: number
}
interface ResponseRef<T> {
  data: T
}

interface QueryState {
  activeFilters: QueryFilter[],
  result: QueryLocationsResponse | null,
  listResult: QueryListResponse | null
}

interface PolygonState {
  activeState: number,
}

export {
  QueryFilter,
  QueryState,
  SampleItem,
  MapSample,
  QueryLocationsResponse,
  PolygonState,
}


