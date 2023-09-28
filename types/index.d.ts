import {Feature, Point, Polygon} from "geojson";

enum QueryKey {
  Material = 'material',
  Polygon = 'polygon',
  Bbox = 'bbox',
  RockType = 'rocktype',
  InclusionType = 'inclusiontype',
  HostMaterial = 'hostmaterial',
  InclusionMaterial = 'inclusionmaterial'
}

interface QueryFilter {
  name: FilterKey,
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

interface MineralsResponseItem {
  label: string,
  value: string
}

interface RocktypesResponse {
  data: RocktypesResponseItem[],
  numItems: number
}

interface MineralsResponse {
  data: MineralsResponseItem[],
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

interface RadioGroupOption {
  value: string,
  label: string,
}

export {
  QueryKey,
  QueryFilter,
  QueryState,
  MapSample,
  QueryLocationsResponse,
  QueryLocationsResponseItem,
  PolygonState,
  MultiselectOption,
  RocktypesResponse,
  RocktypesResponseItem,
  QueryListResponse,
  RadioGroupOption,
  MineralsResponse
}


