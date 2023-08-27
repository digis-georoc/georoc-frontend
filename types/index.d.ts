import {Feature, MultiPoint, Point, Polygon} from "geojson";

interface QueryFilter {
  name: 'material' | 'polygon' | 'bbox' | 'rocktype',
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

interface QueryLocationFeature {
  coordinates: string[],
  type: string
}

interface QueryLocationsResponse {
  bbox: Feature<Polygon>,
  clusters: QueryLocationsCluster[]
}

interface QueryLocationsCluster {
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
  result: QueryLocationsResponse | null,
  listResult: QueryListResponse | null
}

interface RocktypesResponseItem {
  Name: string
}

interface RocktypesResponse {
  Data: RocktypesResponseItem[],
  NumItems: number
}

interface PolygonState {
  activeState: number,
}

interface MultiselectOption {
  value: string,
  label: string,
  active: boolean
}

export {
  QueryFilter,
  QueryState,
  SampleItem,
  MapSample,
  QueryLocationsResponse,
  QueryLocationsResponseItem,
  PolygonState,
  MultiselectOption,
  RocktypesResponse,
  RocktypesResponseItem
}


