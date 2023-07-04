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
    },
    setFilter(filter: Filter) {
      const index  = this.activeFilters.findIndex(({ name }) => name === filter.name)
       if (index === -1) this.activeFilters.push(filter)
      else this.activeFilters[index] = filter
    }
  },
  getters: {
    getFilter(state) {
      return (name: string): Filter | null => {
        const index  = state.activeFilters.findIndex(filter => filter.name === name)
        if (index === -1) return null
        return state.activeFilters[index]
      }
    }
  },
})
