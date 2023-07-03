import {defineStore} from "pinia";

interface Filter {
    name: string,
    value: string | number | Array<any>
}

interface QueryState {
    activeFilters: Filter[]
}


export const useQueryStore = defineStore('query', {
  state: (): QueryState => ({
    activeFilters: []
  }),
  actions: {
    startDrawingOnMap() {
    },
    stopDrawingOnMap() {
    },
    resetPolygonOnMap() {
      const index = this.activeFilters.findIndex(({ name }) => name === 'draw')
      if (index === -1) return
      this.activeFilters.splice(index, 1)
    }
  },
  getters: {

  },
})
