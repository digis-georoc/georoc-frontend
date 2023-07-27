import {Feature, Point} from "geojson";

interface QueryFilter {
  name: 'material' | 'polygon' | 'bbox',
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

interface QueryLocationFeature {
  coordinates: string[],
  type: string
}
interface QueryLocationsResponseItem {
  centroid: Feature<Point>,
  convexHull: Feature
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
  result: QueryLocationsResponseItem[] | null,
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
  QueryLocationsResponseItem,
  PolygonState,
}


