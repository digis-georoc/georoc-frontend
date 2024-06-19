import { FetchError } from 'ofetch'
async function getSamples(
  params: URLSearchParams,
  { signal }: AbortController,
): Promise<QueryLocationsResponse | null> {
  try {
    const res: Response = await fetch(`/api/query?${params}`, { signal })
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('abort')
  }

  return null
}

async function getRocktypes(): Promise<RocktypesResponse | null> {
  return await baseAPIRequest<RocktypesResponse>('/api/rocktypes')
}

async function getMinerals(): Promise<MineralsResponse | null> {
  const { data } = await useFetch<MineralsResponse>('/api/minerals')
  return data.value
}

async function getList(
  params: URLSearchParams,
): Promise<QueryListResponse | null> {
  const res: Response = await fetch(`/api/list?${params}`)

  if (res.ok) {
    return await res.json()
  } else {
    throw { statusCode: res.status, statusMessage: res.statusText }
  }
}

async function getExpertDatasets(): Promise<ExpertDatasetResponse | null> {
  const { error, data } = await useFetch<ExpertDatasetResponse>(
    '/api/expertdatasets',
  )
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }
  return data.value
}

async function getPrecompiledPreview(): Promise<PrecompiledFilePreviews | null> {
  const { error, data } = await useFetch<PrecompiledFilePreviews>(
    '/api/precompiled-files/preview',
  )
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }
  return data.value
}

async function getPrecompiledPreviewForClient(): Promise<{
  data: globalThis.Ref<PrecompiledFilePreviews | null>
  error: globalThis.Ref<FetchError<any> | null>
  pending: globalThis.Ref<boolean>
}> {
  const { data, error, pending } = await useFetch<PrecompiledFilePreviews>(
    'api/precompiled-files/preview',
    { server: false, lazy: true },
  )
  //we need to return the reactive values here (Client-only fetching)
  return { data, error, pending }
}

async function getPrecompiledFiles(
  protocol: string,
  authority: string,
  id: string,
  version: string,
): Promise<PrecompiledFiles | null> {
  const params = new URLSearchParams({ protocol, authority, id, version })
  const { error, data } = await useFetch<PrecompiledFiles>(
    '/api/precompiled-files/files' + (params ? `?${params.toString()}` : ''),
  )
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }
  return data.value
}
async function getPrecompiledZip(
  fileIds: number | number[],
): Promise<Blob | null> {
  const params = new URLSearchParams()
  params.append(
    'fileIds',
    Array.isArray(fileIds) ? fileIds.join(',') : fileIds.toString(),
  )
  const { error, data } = await useFetch<Blob>(
    '/api/precompiled-files/download-files' +
      (params ? `?fileIds=${params.toString()}` : ''),
  )
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }
  return data.value
}

async function getPrecompiledDatasetZip(
  identifier: string,
  version: string,
): Promise<Blob | null> {
  const params = new URLSearchParams({
    identifier,
    version,
  })
  const { error, data } = await useFetch<Blob>(
    '/api/precompiled-files/download-dataset' +
      (params ? `?${params.toString()}` : ''),
  )
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }
  return data.value
}
async function getPrecompiledMetadataFile(
  identifier: string,
  version: string,
  fileIds?: number | number[],
): Promise<string | null> {
  const params = new URLSearchParams({ identifier, version })
  if (typeof fileIds !== 'undefined') {
    params.append(
      'fileIds',
      Array.isArray(fileIds) ? fileIds.join(',') : fileIds.toString(),
    )
  }
  const { error, data } = await useFetch<string>(
    '/api/precompiled-files/export-metadata' +
      (params ? `?${params.toString()}` : ''),
  )
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }
  return data.value
}

async function getElements(type: string): Promise<ElementsResponse | null> {
  const { data } = await useFetch<ElementsResponse>(
    '/api/elements' + (type ? `?type=${type}` : ''),
  )
  return data.value
}

async function getElementTypes(): Promise<ElementsResponse | null> {
  return await baseAPIRequest<ElementsResponse>('/api/element-types')
}

async function getRockClasses(
  rockType: string,
): Promise<RockClassResponse | null> {
  return await baseAPIRequest<RockClassResponse>(
    '/api/rock-classes' + (rockType ? `?rocktype=${rockType}` : ''),
  )
}

async function getHostMaterials(): Promise<HostMaterialsResponse | null> {
  return await baseAPIRequest<HostMaterialsResponse>('/api/host-materials')
}

async function getInclusionMaterials(): Promise<HostMaterialsResponse | null> {
  return await baseAPIRequest<HostMaterialsResponse>('/api/inclusion-materials')
}

async function getStatisticsForClient(): Promise<{
  data: globalThis.Ref<Statistics | null>
  error: globalThis.Ref<FetchError<any> | null>
  pending: globalThis.Ref<boolean>
}> {
  const { data, error, pending } = await useFetch<Statistics>(
    '/api/statistics',
    {
      server: false,
      lazy: true,
    },
  )
  //we need to return the reactive values here (Client-only fetching)
  return { data, error, pending }
}

async function downloadFilteredXlsx(
  params: URLSearchParams,
): Promise<Blob | null> {
  const res: Response = await fetch(`/api/download/filtered?format=xlsx&${params}` )
  return await res.blob()
}

async function downloadFilteredCsv(
  params: URLSearchParams,
): Promise<string | null> {
  const res: Response = await fetch(`/api/download/filtered?format=csv&${params}` )
  return await res.text()
}

async function baseAPIRequest<T>(path: string): Promise<T> {
  const { data, error } = await useFetch<T>(path)
  if (!data.value)
    throw createError({
      statusCode: error.value?.statusCode,
      statusMessage: error.value?.statusMessage,
    })
  return <T>data.value
}

export {
  getSamples,
  getList,
  getRocktypes,
  getMinerals,
  getExpertDatasets,
  getElements,
  getElementTypes,
  getRockClasses,
  getHostMaterials,
  getInclusionMaterials,
  getPrecompiledFiles,
  getPrecompiledDatasetZip,
  getPrecompiledZip,
  getPrecompiledMetadataFile,
  getPrecompiledPreview,
  getStatisticsForClient,
  getPrecompiledPreviewForClient,
  downloadFilteredXlsx,
  downloadFilteredCsv
}
