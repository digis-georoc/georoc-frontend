import {defineStore} from "pinia";
import type {TreeNode} from "primevue/tree";

export const useChemistryStore = defineStore('chemistry', {
  state: (): ChemistryState => ({
    nodes: [],
    selected: []
  }),
  actions: {
    setNodes(nodes: TreeNode[]){ this.nodes = nodes },
    setSelected(nodes: TreeNode[]){ this.selected = nodes },
  }
})
