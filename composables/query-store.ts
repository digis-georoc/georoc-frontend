import { defineStore } from "pinia";
import {QueryFilter, QueryState} from "~/types";

let mapTimer: NodeJS.Timeout
let listTimer: NodeJS.Timeout
let abortController: AbortController | null = null

const materialSpecificFilters = [
  QueryKey.HostMaterial,
  QueryKey.InclusionMaterial,
  QueryKey.InclusionType,
  QueryKey.RockClass,
  QueryKey.RockType,
]

function debounceMap(func: Function, timeout = 500){
  clearTimeout(mapTimer)
  mapTimer = setTimeout(() => { func() }, timeout)
}

function debounceList(func: Function, timeout = 500) {
  clearTimeout(listTimer)
  listTimer = setTimeout(() => { func() }, timeout)
}

function toQuery({ name, value }: QueryFilter): QueryFilter {
  if (name === 'material' && value === 'WR') value = 'IN:WR,GL'
  return { name, value }
}

export const useQueryStore = defineStore('query', {
  state: (): QueryState => ({
    activeFilters: [],
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
      const index = this.activeFilters.findIndex(({ name }) => name === 'polygon')
      if (index === -1) return
      this.activeFilters.splice(index, 1)
      debounceMap(() => this.executeMapQuery())
    },
    async setBboxFilter(filter: QueryFilter) {
      this.setFilter(filter)
      debounceMap(() => this.executeMapQuery())
    },
    async setPanelFilter(filter: QueryFilter) {
      this.setFilter(filter)
      // debounceMap(() => this.executeMapQuery(), mapTimer)
      // debounceList(() => this.executeListQuery(), listTimer)
    },
    setFilter(filter: QueryFilter) {
      const index  = this.activeFilters.findIndex(({ name }) => name === filter.name)
      if (index === -1) this.activeFilters.push(filter)
      else this.activeFilters[index] = filter

      this.cacheFilter(filter)
    },
    unsetFilter(name: string) {
      const index = this.activeFilters.findIndex(({ name: oldName }) => oldName === name)
      if (index === -1) return
      this.activeFilters.splice(index, 1)
      window.localStorage.removeItem(this.getCachingKey(name))
    },
    async execute() {
      debounceMap(() => this.executeMapQuery())
      debounceList(() => this.executeListQuery())
    },
    async executeMapQuery() {
      if (abortController) abortController.abort()
      abortController = new AbortController()
      // The query request requires a bounding box in order to return clusters, we need to check if it has been set.
      const hasBbox = this.activeFilters.findIndex(({ name }) => name === 'bbox') > -1;
      const hasMaterial = this.activeFilters.findIndex(({ name }) => name === 'material') > -1;

      if (hasBbox && hasMaterial) {
        this.loadingQuery(true)
        try {
          this.result = await getSamples(this.activeFilters.map(toQuery), abortController)
          this.loadingQuery(false)
        } catch (e: any) {
          if (e.message !== 'abort') this.loadingQuery(false)
        }
      }
    },
    async executeListQuery() {
      const hasMaterial = this.activeFilters.findIndex(({ name }) => name === 'material') > -1;
      if (hasMaterial) {
        try {
          this.listResult = await getList(this.activeFilters.map(toQuery))
        } catch (e) {
          console.log(e)
        }
      }
    },
    resetOnMaterialChange() {
      materialSpecificFilters.forEach(key => this.unsetFilter(key))
    },
    cacheFilter(filter: QueryFilter) {
      window.localStorage.setItem(this.getCachingKey(filter.name), filter.value)

      // TODO: below is the implementation for material specific filter caching by appending the material filter value
      //      to the storage key. So far it is not necessary because all child filters are different
      //      when switching the parent material filter
      // const materialFilter = this.getFilter(QueryKey.Material)
      // if (filter.name === QueryKey.Material ) {
      //   window.localStorage.setItem('filter-' + filter.name, filter.value)
      //   return
      // }
      // if (materialFilter && materialSpecificFilters.includes(filter.name)) {
      //   window.localStorage.setItem('filter-' + filter.name + '-' + materialFilter.value, filter.value)
      // } else {
      //   window.localStorage.setItem('filter-' + filter.name, filter.value)
      // }
    },
    getCachedFilterValue(key: typeof QueryKey[keyof typeof QueryKey]) {
      return window.localStorage.getItem(this.getCachingKey(key))
    }
  },
  getters: {
    getFilter(state) {
      return (name: string): QueryFilter | null => {
        const index  = state.activeFilters.findIndex(filter => filter.name === name)
        if (index === -1) return null
        return state.activeFilters[index]
      }
    },
    getCachingKey() {
      return (name: string) => 'filter-' + name
    }
  },
})
