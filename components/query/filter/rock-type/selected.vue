<script setup lang="ts">
import type { TreeNode } from "primevue/tree";

const props = withDefaults(defineProps<{
  useFilter: Function
}>(), {
  useFilter: () => {}
})

const rockTypeStore = useRockTypeStore()
const queryStore = useQueryStore()

const _items = ref<TreeNode[]>([])

watch(() => rockTypeStore.selected, (value) =>  {
  _items.value = value
})

function remove(itemIndex: number, childIndex: number) {
  _items.value[itemIndex].children?.splice(childIndex, 1)
  if (_items.value[itemIndex].children?.length === 0) {
    _items.value.splice(itemIndex, 1)
  }
  rockTypeStore.selected = [..._items.value]
  props.useFilter()
}

function removeAll(rockTypeIndex: number) {
  _items.value.splice(rockTypeIndex, 1)
  rockTypeStore.selected = [..._items.value]
  props.useFilter()
}

function hasAllChildrenSelected(selectedNode: TreeNode): boolean {
  const node = rockTypeStore.nodes.find((node) => node.key === selectedNode.key)
  return selectedNode?.children?.length === 0 || node?.children?.length === selectedNode.children?.length
}
</script>

<template>
  <div class="flex flex-1 flex-col mb-2" v-for="(rockTypeNode, i) in _items" :key="rockTypeNode.key">
    <h3 class="font-semibold mb-2">{{ rockTypeNode.label }}:</h3>
    <div class="flex ps-4">
      <QueryFilterBaseSelected
        v-if="!hasAllChildrenSelected(rockTypeNode)"
        :items="rockTypeNode.children?.map(({ key, label }) => ({ value: key, label })) ?? []"
        @remove="remove(i, $event)"
      />
      <QueryFilterBaseSelected v-else :items="[{ value: 'ALL', label: 'All'}]" @remove="removeAll(i)" />
    </div>
  </div>
</template>

