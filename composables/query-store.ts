import { defineStore } from "pinia";
import { MaterialKeys } from "~/utils/material-keys";
let mapTimer: NodeJS.Timeout
let listTimer: NodeJS.Timeout
let abortController: AbortController | null = null

function debounceMap(func: Function, timeout = 500){
  clearTimeout(mapTimer)
  mapTimer = setTimeout(() => { func() }, timeout)
}

function debounceList(func: Function, timeout = 500) {
  clearTimeout(listTimer)
  listTimer = setTimeout(() => { func() }, timeout)
}

function toQuery({ name, value }: QueryFilter): QueryFilter {
  if (name === QueryKey.Material && value === MaterialKeys.WRGL) value = 'IN:WR,GL'
  return { name, value }
}

export const useQueryStore = defineStore('query', {
  state: (): QueryState => ({
    filters: {
      active: [],
      material: null,
      bbox: null,
      WRGL: [],
      INC: [],
      MIN: [],
    },
    result: null,
    listResult: null,
  }),
  actions: {
    loadingQuery(isLoading: boolean) {
    },
    startDrawingOnMap() {
    },
    stopDrawingOnMap() {
    },
    async resetPolygonOnMap() {
      const index = this.filters.active.findIndex(({ name }) => name === QueryKey.Polygon)
      if (index === -1) return
      this.filters.active.splice(index, 1)
      debounceMap(() => this.executeMapQuery())
    },
    async setBboxFilter(filter: QueryFilter) {
      this.filters.bbox = filter
      debounceMap(() => this.executeMapQuery())
    },
    async setMaterialFilter(filter: QueryFilter, withCache = true) {
      this.filters.material = filter
      if (withCache) this.cacheFilter(filter)
      this.swapFilters(filter.value)
    },
    async setPanelFilter(filter: QueryFilter, withCache = true) {
      this.setFilter(filter, withCache)
    },
    setFilter(filter: QueryFilter, withCache = true) {
      this.addOrUpdateActiveFilter(filter)
      this.addOrUpdateFilterByMaterial(filter, this.filters.material?.value)

      if (withCache) this.cacheFilter(filter)
    },
    addOrUpdateActiveFilter(filter: QueryFilter) {
      const filters = this.filters.active
      const index  = filters.findIndex(({ name }) => name === filter.name)
      if (index === -1) filters.push(filter)
      else filters[index] = filter
    },
    addOrUpdateFilterByMaterial(filter: QueryFilter, materialValue: keyof typeof MaterialKeys) {
      const filters = this.getFiltersByMaterial(materialValue)
      if (!filters) return
      const index  = filters.findIndex(({ name }) => name === filter.name)
      if (index === -1) filters.push(filter)
      else filters[index] = filter
    },
    swapFilters(materialValue: keyof typeof MaterialKeys) {
      this.filters.active = [...this.getFiltersByMaterial(materialValue)]
    },
    unsetFilter(name: string, removeFromCache = true) {
      const index = this.filters.active.findIndex(({ name: oldName }) => oldName === name)
      if (index === -1) return
      this.filters.active.splice(index, 1)

      if (removeFromCache) window.localStorage.removeItem(this.getCachingKey(name))
    },
    async execute() {
      debounceMap(() => this.executeMapQuery())
      debounceList(() => this.executeListQuery())
    },
    async executeMapQuery() {
      if (abortController) abortController.abort()
      abortController = new AbortController()
      // The query request requires a bounding box in order to return clusters, we need to check if it has been set.
      const hasBbox = !!(this.filters.bbox)
      const hasMaterial = !!(this.filters.material)

      if (hasBbox && hasMaterial) {
        this.loadingQuery(true)
        try {
          this.result = await getSamples(this.createUrlParams(), abortController)
          this.loadingQuery(false)
        } catch (e: any) {
          if (e.message !== 'abort') this.loadingQuery(false)
        }
      }
    },
    async executeListQuery(offset: number = 0, limit: number = 30) {
      const hasMaterial = !!(this.filters.material)
      if (hasMaterial) {
        try {

          const params = this.createUrlParams()
          params.set('offset', offset.toString())
          params.set('limit', limit.toString())

          this.listResult = await getList(params)
        } catch (e) {
          console.log(e)
        }
      }
    },
    createUrlParams(): URLSearchParams {
      const filtersObj: any = {}
      const filters: QueryFilter[] = [...this.filters.active]

      if (this.filters.material) filters.push(this.filters.material)
      if (this.filters.bbox) filters.push(this.filters.bbox)

      filters.map(toQuery).forEach(({ name, value }) => {
        filtersObj[name] = Array.isArray(value) ? JSON.stringify(value) : value
      })

      return new URLSearchParams(filtersObj)
    },
    cacheFilter(filter: QueryFilter) {
      // const storage = window.sessionStorage
      // window.localStorage.setItem(this.getCachingKey(filter.name), filter.value)

      // TODO: below is the implementation for material specific filter caching by appending the material filter value
      //      to the storage key. So far it is not necessary because all child filters are different
      //      when switching the parent material filter
      // const materialFilter = this.getFilter(QueryKey.Material)
      // if (filter.name === QueryKey.Material ) {
      //   storage.setItem('filter-' + filter.name, filter.value)
      //   return
      // }
      // if (materialFilter) {
      //   storage.setItem('filter-' + filter.name + '-' + materialFilter.value, filter.value)
      // } else {
      //   storage.setItem('filter-' + filter.name, filter.value)
      // }
    },
    getCachedFilterValue(key: typeof QueryKey[keyof typeof QueryKey]) {
      return window.localStorage.getItem(this.getCachingKey(key))
    }
  },
  getters: {
    getFilter(state) {
      return (key: typeof QueryKey[keyof typeof QueryKey]): QueryFilter | null => {
        if (key === QueryKey.Material || key === QueryKey.Bbox) {
          return state.filters[key]
        }

        const index  = state.filters.active.findIndex(filter => filter.name === key)
        if (index === -1) return null
        return state.filters.active[index]
      }
    },
    getCachingKey() {
      return (name: string) => 'filter-' + name
    },
    getFiltersByMaterial(state) {
      return (materialKey: keyof typeof MaterialKeys): QueryFilter[] => {
        return state.filters[materialKey]
      }
    }
  },
})
