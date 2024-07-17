<script lang="ts" setup>
import type {TreeNode, TreeSelectionKeys} from "primevue/tree";
import {storeToRefs} from "pinia";
import {getChemistryFilterOptions} from "~/utils/api";
import katex from 'katex';
import 'katex/dist/katex.css';
import { chemistryTypesLabels } from "~/utils/chemistry-types";

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
  const options = await getChemistryFilterOptions()

  if (!options) return

  const optionsGrouped: {[key: string]: TreeNode[]} = options.reduce((acc, cur) => {
    if (acc[cur.type]) {
      acc[cur.type].push(cur)
    } else {
      acc[cur.type] = [cur]
    }

    return acc
  }, <{[key: string]: TreeNode[]}>{})

  store.nodes = Object
    .keys(optionsGrouped)
    // Render only nodes where at least one of the children has visible = "Yes"
    .filter(key => (<TreeNode[]>optionsGrouped[key]).find(node => node.visible === 'Yes'))
    .map((key, i) => {
      const node = {key: key, label: chemistryTypesLabels[key] ?? key, children: <TreeNode[]>[]}
      let amountInvisible = 0
      node.children = (<TreeNode[]>optionsGrouped[key]).map(({ value, latex, unit, visible }) => {
        const isVisible = visible === 'Yes'
        if (!isVisible) amountInvisible++
        return {
          key: generateChildKey(node.key, value),
          label: value,
          data: {
            structuredLabel: parseToLatex(latex),
            unit,
            visibleInitial: isVisible,
            visible: isVisible,
            min: null,
            max: null
          }
        }
      })

      if (amountInvisible > 0) {
        node.children.push({
          key: 'more_button',
          label: 'Show more',
          type: 'button',
          selectable: false,
          data: {
            parentIndex: i,
            handler: loadMoreButtonHandler,
            expanded: false
          }
        })
      }

      return node
  })

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
          .map(({ value, label, unit }) => ({key: generateChildKey(node.key, value), label, children: [], data: { min: null, max: null, unit }}))
      ?? []
  store.nodes = nodes.value
  loadingChildren.value = false
}

function mapSelectionKeysToNodes(keys: TreeSelectionKeys): TreeNode[] {
  if (keys['more_button']) {
    //TODO: Ugly hack to remove keys that came from clicking the "load more" button.
    // The tree component adds the load more button key and it's parent key to selected keys by mistake.
    // So we are cleaning them.
    delete keys['more_button']
    if (Object.keys(keys).length === 1) keys = {}
    selectedKeys.value = keys
  }
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

function parseToLatex(str: string) {
  try {
    const latexValue = katex.renderToString(str.replaceAll('$', ''))
    return latexValue;

  } catch(e) {
    console.log(e)
  }

  return ''
  // console.log(latexValue)
}

function loadMoreButtonHandler(node: TreeNode) {
  const { parentIndex, expanded } = node.data
  const { children } = store.nodes[parentIndex]
  store.nodes[parentIndex].children = children
    .map(childNode => {
      if (childNode.key === 'more_button') return childNode
      if (expanded) {
        childNode.data.visible = !!(childNode.data.visibleInitial)
      } else {
        childNode.data.visible = true
      }

      return childNode
    })
  node.data.expanded = !expanded
  node.label = node.data.expanded ? 'Show less' : 'Show more'
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
