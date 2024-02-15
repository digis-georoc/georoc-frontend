import { Feature, Point, Polygon } from 'geojson'
import type { TreeNode } from 'primevue/tree'

declare global {
  interface QueryFilter {
    name: FilterKey
    value: any
  }

  interface QueryListItem {
    sampleID: number
    sampleName: string
    latitude: number
    longitude: number
    geologicalAge: string | null
    geologicalSetting: string | null
    inclusionType: string | null
    mineral: string | null
    rockClass: string | null
  }

  interface QueryLocationFeature {
    coordinates: string[]
    type: string
  }

  interface QueryLocationsResponse {
    bbox: Feature<Polygon>
    clusters: QueryLocationsCluster[]
  }

  interface QueryLocationsCluster {
    centroid: Feature<Point>
    convexHull: Feature
  }

  interface QueryListResponse {
    data: QueryListItem[]
    numItems: number
    totalCount: number
    error?: {
      statusCode: number
      statusMessage: string
    }
  }

  interface ResponseRef<T> {
    data: T
  }

  interface QueryState {
    filters: {
      active: QueryFilter[]
      material: QueryFilter | null
      bbox: QueryFilter | null
      WRGL: QueryFilter[]
      INC: QueryFilter[]
      MIN: QueryFilter[]
    }
    result: QueryLocationsResponse | null
    listResult: QueryListResponse | null
  }

  interface RocktypesResponseItem {
    label: string
    value: string
  }

  interface MineralsResponseItem {
    label: string
    value: string
  }

  interface PolygonState {
    activeState: number
  }

  interface MultiselectOption {
    value: string
    label: string
    active: boolean
  }

  interface RadioGroupOption {
    value: string
    label: string
  }

  interface ChemicalElement {
    value: string
    label: string
    unit: string
  }

  interface ChemicalElementType {
    name: string
  }

  interface SelectedChemicalElement {
    type: RadioGroupOption | null
    element: RadioGroupOption | null
    min: number
    max: number
  }

  interface RockClass {
    value: string
    label: string
  }

  interface HostMaterial {
    count: number
    label: string
    value: string
  }

  interface InclusionMaterial {
    count: number
    label: string
    value: string
  }

  interface BaseResponse<T> {
    data: T[]
    numItems: number
  }

  type RockClassResponse = BaseResponse<RockClass>
  type ElementTypesResponse = BaseResponse<ChemicalElementType>
  type MineralsResponse = BaseResponse<MineralsResponseItem>
  type ElementsResponse = BaseResponse<ChemicalElement>
  type RocktypesResponse = BaseResponse<RocktypesResponseItem>
  type HostMaterialsResponse = BaseResponse<HostMaterial>
  type InclusionMaterialsResponse = BaseResponse<InclusionMaterial>

  interface ExpertDatasetRow {
    authors: string
    title: string
    versionNr: string
    productionDate: number
    persistentUrl: string
  }

  interface ExpertDatasetResponse {
    datasets: ExpertDatasetRow[]
  }

  interface DataverseOKResponse {
    status: 'OK'
    data: any
  }

  interface PrecompiledFilePreview {
    protocol: string
    authority: string
    identifier: string
    title: string
  }

  interface PrecompiledFilePreviews {
    preview: PrecompiledFilePreview[]
  }

  interface PrecompiledFiles {
    title: string
    authors: string[]
    persistentUrl: string
    description: string
    publicationDate: Date
    subject: string
    datasetPersistentId: string
    productionDate: Date
    license: {
      name: string
      uri: string
    }
    files: {
      contentType: string
      label: string
      persistentId: string
      filesize: number
      persistentUrl: string
    }[]
  }

  interface NestedSelected {
    [key: string]: RadioGroupOption[]
  }

  interface SelectedRockType {
    label: string
    value: string
    classes: RadioGroupOption[]
  }

  interface ChemistryState {
    nodes: TreeNode[]
    selected: TreeNode[]
  }

  interface Statistics {
    numCitations: number
    numSamples: number
    numAnalyses: number
    numResults: number
  }
}

export {}
