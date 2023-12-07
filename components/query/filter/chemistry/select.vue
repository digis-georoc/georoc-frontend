<script lang="ts" setup>
import type {TreeNode, TreeSelectionKeys} from "primevue/tree";
import {storeToRefs} from "pinia";

const props = defineProps<{
  modelValue: TreeNode[]
  title: string
}>()

const store = useChemistryStore()

const { selected } = storeToRefs(store)

const nodes = ref<TreeNode[]>([])
const loadingChildren = ref(false)
const loading = ref(true)
const selectedKeys = ref<TreeSelectionKeys>({})

const emit = defineEmits<{
  'update:modelValue': [keys: TreeSelectionKeys]
}>()

onMounted(async () => {
  if (store.nodes.length === 0) {
    const elementTypes = await getElementTypes()
    store.nodes = elementTypes?.data.map(({ value, label }): TreeNode => ({ key: value , label, children: [], leaf: false })) ?? []
  }

  nodes.value = store.nodes
  selectedKeys.value = mapNodesToSelectionKeys(selected.value)

  loading.value = false
})

watch(selectedKeys, (value) => emit('update:modelValue', mapSelectionKeysToNodes(value)))

async function loadChildren(node: TreeNode) {
  const index = nodes.value.findIndex(({ key }) => node.key === key)

  if (index === -1 || !nodes.value[index]) return
  if (nodes.value[index].children.length > 0) return

  loadingChildren.value = true
  const elements = await getElements(nodes.value[index].key)
  nodes.value[index].children = elements
    ?.data
    .map(({ value, label, unit }) => ({key: value, label, children: [], data: { min: null, max: null, unit }}))
  ?? []
  store.nodes = nodes.value
  loadingChildren.value = false
}

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

    // if (selectedChildren.length === node?.children?.length) {
    //   // When loading values from cache (onMounted) we assumed that the rock type is partially checked
    //   // Here we can tell for sure if all classes of that rock type were cached, if yes we mark also the rock type as checked.
    //   selectedKeys.value[key] = { checked: true }
    // }

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
    :load-children="loadChildren"
    :loading="loadingChildren"
  />
</template>
