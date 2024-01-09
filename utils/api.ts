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
  const { data } = await useFetch<RocktypesResponse>('/api/rocktypes')
  return data.value
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

async function getPrecompiledFiles(
  protocol: string,
  authority: string,
  id: string,
): Promise<PrecompiledFiles | null> {
  const params = new URLSearchParams({ protocol, authority, id })
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

async function getPrecompiledFile(
  identifier: string,
  isDataset: boolean,
): Promise<Blob | null> {
  const params = new URLSearchParams({
    identifier,
    isDataset: isDataset.toString(),
  })
  const { error, data } = await useFetch<Blob>(
    '/api/precompiled-files/download-file' +
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
  const { data } = await useFetch<ElementsResponse>('/api/element-types')
  return data.value
}

async function getRockClasses(
  rockType: string,
): Promise<RockClassResponse | null> {
  const { data } = await useFetch<RockClassResponse>(
    '/api/rock-classes' + (rockType ? `?rocktype=${rockType}` : ''),
  )
  return data.value
}

async function getHostMaterials(): Promise<HostMaterialsResponse | null> {
  const { data } = await useFetch<HostMaterialsResponse>('/api/host-materials')
  return data.value
}

async function getInclusionMaterials(): Promise<HostMaterialsResponse | null> {
  const { data } = await useFetch<HostMaterialsResponse>(
    '/api/inclusion-materials',
  )
  return data.value
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
  getPrecompiledFile,
  getPrecompiledPreview,
}
