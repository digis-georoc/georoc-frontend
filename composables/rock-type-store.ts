import {defineStore} from "pinia";

export const useRockTypeStore = defineStore('rock-type', {
    state: (): RockTypeState => ({
        nodes: [],
        selected: []
    }),
})
