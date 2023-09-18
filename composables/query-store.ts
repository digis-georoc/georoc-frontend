import { defineStore } from "pinia";
import {QueryFilter, QueryState} from "~/types";

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
    async setPanelFilter(filter: QueryFilter, shouldCache = false) {
      this.setFilter(filter, shouldCache)
      // debounceMap(() => this.executeMapQuery(), mapTimer)
      // debounceList(() => this.executeListQuery(), listTimer)
    },
    setFilter(filter: QueryFilter, shouldCache = false) {
      const index  = this.activeFilters.findIndex(({ name }) => name === filter.name)
      if (index === -1) this.activeFilters.push(filter)
      else this.activeFilters[index] = filter

      if (shouldCache) window.localStorage.setItem(filter.name + '-filter', filter.value)
    },
    unsetFilter(name: string) {
      const index = this.activeFilters.findIndex(({ name: oldName }) => oldName === name)
      if (index === -1) return
      this.activeFilters.splice(index, 1)
      window.localStorage.removeItem(name + '-filter')
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
        } catch (e) {
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
      this.unsetFilter('rocktype')
      this.unsetFilter('inclusiontype')
      this.unsetFilter('mineral_inclusion')
    }
  },
  getters: {
    getFilter(state) {
      return (name: string): QueryFilter | null => {
        const index  = state.activeFilters.findIndex(filter => filter.name === name)
        if (index === -1) return null
        return state.activeFilters[index]
      }
    }
  },
})
