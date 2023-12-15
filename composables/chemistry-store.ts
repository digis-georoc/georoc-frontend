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
  },
  getters: {
    getNodeLabel() {
      return (key: string): string | null => {
        let resultNode = null
        for (const node of this.nodes) {
          if (node.key === key) {
            resultNode = node
            break
          }

          for (const childNode of (node.children ?? [])) {
            if (childNode.key === key) {
              resultNode = childNode
              break
            }
          }
        }

        return resultNode?.label ?? null
      }
    }
  }
})
