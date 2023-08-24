import { defineStore } from "pinia";
import {QueryFilter, QueryState} from "~/types";

let timer: NodeJS.Timeout;

function debounce(func: Function, timeout = 100){
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
      if (hasBbox) this.result = await getSamples(this.activeFilters)
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
