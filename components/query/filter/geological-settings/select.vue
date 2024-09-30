<script lang="ts" setup>
import TreeNode, { type TreeSelectionKeys } from 'primevue/tree'
import {storeToRefs} from "pinia";
import {getChemistryFilterOptions} from "~/utils/api";
import katex from 'katex';
import 'katex/dist/katex.css';
import { chemistryTypesLabels } from "~/utils/chemistry-types";

const props = withDefaults(defineProps<{
  modelValue: TreeNode[]
  options: TreeNode[]
}>(), {
  modelValue: () => [],
  options: () => []
})

const selected = ref<TreeNode[]>(<TreeNode[]>[])

const nodes = ref<TreeNode[]>([])
const loading = ref(true)
const selectedKeys = ref<TreeSelectionKeys>({})

const emit = defineEmits<{
  'update:modelValue': [keys: TreeSelectionKeys]
}>()

onMounted(async () => {
  nodes.value = props.options
  selectedKeys.value = mapNodesToSelectionKeys(selected.value)
  loading.value = false
})

watch(selectedKeys, (value) => emit('update:modelValue', mapSelectionKeysToNodes(value)))

function mapSelectionKeysToNodes(keys: TreeSelectionKeys): TreeNode[] {
  return nodes.value.filter(({ key }) => key && keys.hasOwnProperty(key)).map(node => {
    const { key = '', label = '' } = node

    let selectedChildren =
      node
        ?.children
        ?.filter((child) => Object.keys(keys).findIndex(selectionKey => selectionKey === child.key) > -1)
      ?? []

    const storedSelectedNode = store.selected.find(({ key: storedKey }) => storedKey === key)

    if (storedSelectedNode) {
      selectedChildren = selectedChildren.map((node) => {
        const { key: selectedChildKey} = node
        const { children } = storedSelectedNode
        const child = children?.find(({key: storedChildKey }) => selectedChildKey === storedChildKey)
        return child ?? node
      })
    }

    return {
      key,
      label,
      children: selectedChildren
    }
  })
}

function mapNodesToSelectionKeys(selectedNodes: TreeNode[]): TreeSelectionKeys {
  const keys = <TreeSelectionKeys>{}

  selectedNodes.forEach(({ key, children = [] }) => {
    const node = nodes.value.find(node => node.key === key)
    if (!node) return
    keys[key ?? ''] = node.children?.length === children.length ? {checked: true } : {checked: false, partialChecked: true }
    children.forEach(({ key }) => keys[key ?? ''] = {checked: true})
  })

  return keys
}
</script>
<template>
  <div v-if="loading" class="h-[400px] flex items-center justify-center">
    <BaseLoading class="text-[4rem]"/>
  </div>
  <BaseTreeSelect
    v-else
    v-model="selectedKeys"
    :nodes="nodes"
    filter-placeholder="Type to filter by a chemical name"
  />
</template>
