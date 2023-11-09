async function getSamples(filters: QueryFilter[] = [], { signal }: AbortController): Promise<QueryLocationsResponse | null> {

  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })

  try {
    const res: Response = await fetch(
      '/api/query?' + Object.keys(filterObj).map(key => key + '=' + filterObj[key]).join('&'),
      { signal }
    )
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('abort')
  }

  return null
}

async function getRocktypes(): Promise<RocktypesResponse | null> {
  const { data} = await useFetch<RocktypesResponse>('/api/rocktypes',)
  return data.value
}

async function getMinerals(): Promise<MineralsResponse | null> {
  const { data} = await useFetch<MineralsResponse>(
    '/api/minerals',
  )
  return data.value
}

async function getList(filters: QueryFilter[] = []): Promise<QueryListResponse | null> {
  const filterObj: any = {}
  filters.forEach(({ name, value }) => {
    filterObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
  })
  filterObj['limit'] = 30

  try {
    const res: Response = await fetch(
      '/api/list?' + Object.keys(filterObj).map(key => key + '=' + filterObj[key]).join('&')
    )
    return await res.json()
  } catch (err) {
  }

  return null
}

async function getExpertDatasets() {
    const { data } = await useFetch<ExpertDatasetResponse>(
      '/api/expertdatasets',
    )
    return data.value
}

async function getElements(type: string): Promise<ElementsResponse | null> {
  const { data} = await useFetch<ElementsResponse>('/api/elements' + (type ? `?type=${type}` : ''))
  return data.value
}

async function getElementTypes(): Promise<ElementsResponse | null> {
  const { data} = await useFetch<ElementsResponse>('/api/element-types')
  return data.value
}

async function getRockClasses(rockType: string): Promise<RockClassResponse | null> {
  const { data} = await useFetch<RockClassResponse>('/api/rock-classes' + (rockType ? `?rocktype=${rockType}` : ''))
  return data.value
}

async function getHostMaterials(): Promise<HostMaterialsResponse | null> {
  const { data} = await useFetch<HostMaterialsResponse>('/api/host-materials')
  return data.value
}

async function getInclusionMaterials(): Promise<HostMaterialsResponse | null> {
  const { data} = await useFetch<HostMaterialsResponse>('/api/inclusion-materials')
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
  getInclusionMaterials
}

