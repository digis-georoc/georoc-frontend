import {defineStore} from "pinia";
export const usePolygonStore = defineStore('polygon', {
  state: (): PolygonState => ({
    activeState: 0
  }),
})
