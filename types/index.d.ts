import {Feature, MultiPoint, Point, Polygon} from "geojson";

interface QueryFilter {
  name: 'material' | 'polygon' | 'bbox' | 'rocktype',
  value: any
}

interface QueryListItem {
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
  data: QueryListItem[],
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
  label: string,
  value: string
}

interface RocktypesResponse {
  data: RocktypesResponseItem[],
  numItems: number
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
  MapSample,
  QueryLocationsResponse,
  QueryLocationsResponseItem,
  PolygonState,
  MultiselectOption,
  RocktypesResponse,
  RocktypesResponseItem,
  QueryListResponse
}


