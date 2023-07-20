import {defineStore} from "pinia";
import { PolygonState } from "~/types";

export const usePolygonStore = defineStore('polygon', {
  state: (): PolygonState => ({
    activeState: 0
  }),
})
