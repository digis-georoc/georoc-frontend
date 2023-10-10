import {Feature, Point, Polygon} from "geojson";

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
interface ChemicalElement {
  value: string,
  label: string,
}

interface ElementsResponse {
  data: ChemicalElement[],
  numItems: number
}

interface ChemicalElementType {
  name: string
}

interface ElementTypesResponse {
  data: ChemicalElementType[],
  numItems: number
}

interface SelectedChemicalElement {
  type: RadioGroupOption | null,
  element: RadioGroupOption | null,
  min: number,
  max: number
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
  QueryListResponse,
  RadioGroupOption,
  MineralsResponse,
  ChemicalElement,
  ElementsResponse,
  ElementTypesResponse,
  ChemicalElementType,
  SelectedChemicalElement
}


