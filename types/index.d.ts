import { Feature, Point, Polygon } from 'geojson'
import type { TreeNode } from 'primevue/tree'

declare global {
  interface QueryFilter {
    name: (typeof QueryKey)[keyof typeof QueryKey]
    value: any
  }

  interface BboxQueryFilter {
    name: (typeof QueryKey)[keyof typeof QueryKey]
    value: number[][]
  }

  interface QueryListItem {
    sampleID: number
    sampleName: string
    latitude: number
    longitude: number
    geologicalAges: string[]
    geologicalSettings: string[]
    inclusionTypes: string[]
    minerals: string[] | null
    rockClasses: string[]
  }

  interface QueryLocationFeature {
    coordinates: string[]
    type: string
  }

  interface QueryLocationsResponse {
    bbox: Feature<Polygon>
    clusters: QueryLocationsCluster[]
    points: Feature<Point>[]
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
      bbox: BboxQueryFilter | null
      WRGL: QueryFilter[]
      INC: QueryFilter[]
      MIN: QueryFilter[]
    }
    result: QueryLocationsResponse | null
    listResult: QueryListResponse | null
    listOffset: number
    hasChanges: boolean
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

  interface SampleFullData {
    ageMax: number | null
    ageMin: number | null
    geologicalAge: string | null
    eruptionDate: string | null
    sampleID: number
    sampleName: string
    material: string
    rockTypes: BaseField[]
    rockClasses: BaseField[]
    comments: string[]
    rockTextures: string[]
    alteration: string
    drillDepthMax: string | null
    drillDepthMin: string | null
    samplingTechnique: string | null
    references: Citation[]
    batchData: BatchData[]
    tectonicSetting: string | null
    locationNames: string[]
    locationComments: string[]
    latitudeMax: string | null
    latitudeMin: string | null
    longitudeMax: string | null
    longitudeMin: string | null
    elevationMax: string | null
    elevationMin: string | null
  }

  interface BaseField {
    value: string
    label: string
  }

  interface BatchData {
    batchID: number | null
    batchName: string | null
    crystal: string | null
    hostMinerals: BaseField[]
    inclusionMinerals: BaseField[]
    inclusionTypes: string[]
    material: string | null
    minerals: BaseField[]
    results: BatchDataResult[]
    rimOrCoreInclusion: string | null
    rimOrCoreMineral: string | null
    sampleID: number | null
    specimenMedium: string | null
    tasData: DiagramData
  }

  interface BatchDataResult {
    itemGroup: string | null
    itemName: string | null
    medium: string | null
    method: string | null
    standardName: string | null
    standardValue: number | null
    standardVariable: string | null
    unit: string | null
    value: number | null
    valueCount: number | null
  }

  interface DiagramData {
    xAxisLabel: string
    yAxisLabel: string
    values: number[][]
  }

  interface Citation {
    authors: Author[]
    bookTitle: string | null
    citationID: number
    citationLink: string | null
    editors: string | null
    externalIdentifier: string | null
    firstPage: string | null
    issue: string | null
    journal: string | null
    lastPage: string | null
    publicationYear: number | null
    publisher: string | null
    title: string | null
    volume: string | null
  }

  interface Author {
    firstName: string | null
    lastName: string | null
    order: number | null
    personID: number
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

  interface Version {
    major: number
    minor: number
  }

  interface PrecompiledFilePreview {
    protocol: string
    authority: string
    identifier: string
    title: string
    version: Version
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
    version: Version
    license: {
      name: string
      uri: string
    }
    files: {
      id: number
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
    latestDate: Date
    numCitations: number
    numSamples: number
    numAnalyses: number
    numResults: number
  }

  interface DownloadOptionsDataset {
    isDataset: true
    identifier: string
    filetitle: string
    version: Version
  }
  interface DownloadOptionsFiles {
    isDataset: false
    identifier: number | number[]
    filetitle: string
  }
  type DataDownloadOptions = DownloadOptionsDataset | DownloadOptionsFiles

  interface MetaDataDownloadOptions {
    identifier: string
    version: Version
  }

  interface DownloadOptions {
    dataOptions: DataDownloadOptions
    metadataOptions: MetaDataDownloadOptions
    license: PrecompiledFiles['license']
  }

  interface RockTypeState {
    nodes: TreeNode[]
    selected: TreeNode[]
  }

  interface ChemistryFilterOption {
    value: string
    type: string
    unit: string
    visible: string
    latex: string
  }
}

export {}
