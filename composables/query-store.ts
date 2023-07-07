import { defineStore } from "pinia";

interface QueryState {
  activeFilters: Filter[],
  result: MapSample[]
}
export const useQueryStore = defineStore('query', {
  state: (): QueryState => ({
    activeFilters: [],
    result: []
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
    async setFilter(filter: Filter) {
      const index  = this.activeFilters.findIndex(({ name }) => name === filter.name)
      if (index === -1) this.activeFilters.push(filter)
      else this.activeFilters[index] = filter

      await this.execute()
    },
    async execute() {
      this.result = await getSamples(this.activeFilters)
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
