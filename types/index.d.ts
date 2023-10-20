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
  numItems: number,
  totalCount: number
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

interface ChemicalElementType {
  name: string
}


interface SelectedChemicalElement {
  type: RadioGroupOption | null,
  element: RadioGroupOption | null,
  min: number,
  max: number
}

interface TreeNode {
  key: string,
  label: string,
  children: TreeNode[],
}

interface RockClass {
  value: string,
  label: string
}

interface BaseResponse<T> {
  data: T[],
  numItems: number
}

type RockClassResponse = BaseResponse<RockClass>
type ElementTypesResponse = BaseResponse<ChemicalElementType>
type MineralsResponse = BaseResponse<MineralsResponseItem>
type ElementsResponse = BaseResponse<ChemicalElement>
type RocktypesResponse = BaseResponse<RocktypesResponseItem>

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
  SelectedChemicalElement,
  TreeNode,
  RockClassResponse,
  RockClass
}


