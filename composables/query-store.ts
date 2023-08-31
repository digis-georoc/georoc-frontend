import { defineStore } from "pinia";
import {QueryFilter, QueryState} from "~/types";

let timer: NodeJS.Timeout

let requestTimes: any = {}

function debounce(func: Function, timeout = 500){
  clearTimeout(timer)
  timer = setTimeout(() => { func() }, timeout)
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
      debounce(() => this.execute())
    },
    async setFilter(filter: QueryFilter, shouldCache = false) {
      const index  = this.activeFilters.findIndex(({ name }) => name === filter.name)
      if (index === -1) this.activeFilters.push(filter)
      else this.activeFilters[index] = filter

      if (shouldCache) window.localStorage.setItem(filter.name + '-filter', filter.value)

      debounce(() => this.execute())
    },
    async execute() {
      // The query request requires a bounding box in order to return clusters, we need to check if it has been set.
      const hasBbox = this.activeFilters.findIndex(({ name }) => name === 'bbox') > -1;
      const requestTime = new Date().getTime().toString()
      this.loadingQuery(true)
      requestTimes[requestTime] = null
      if (hasBbox) {
        const data = await getSamples(this.activeFilters)

        delete requestTimes[requestTime]
        if (Object.keys(requestTimes).length === 0) {
          this.result = data
        }
        this.loadingQuery(false)
      }
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
