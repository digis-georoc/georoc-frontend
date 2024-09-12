<script setup lang="ts">
import Tree from 'primevue/tree'
import type { TreeNode, TreeSelectionKeys, TreeExpandedKeys } from 'primevue/tree'

const props = withDefaults(defineProps<{
  nodes: TreeNode[]
  modelValue: TreeSelectionKeys,
  loadChildren: (node: TreeNode) => void
  loading: boolean
  filterPlaceholder: string
}>(),{
  nodes: () => <TreeNode[]>[],
  modelValue: () => <TreeSelectionKeys>{},
  loading: false,
  loadChildren: () => {},
})

const emit = defineEmits<{
  select: [keys: TreeSelectionKeys]
  'update:modelValue': [value: TreeSelectionKeys]
}>()

let typingTimer
const typingDelay = 500

const _nodes = ref<TreeNode[]>([])
const filterValue = ref('')
const expandedKeys = ref<TreeExpandedKeys>({})
const hasFiltered = ref(false)
const visibleNodesAfterFiltering = ref<TreeNode[]>([])

function doneTyping(filterText: string) {

  const hasFilterText = filterText !== ''
  expandedKeys.value = {}

  if (!hasFilterText) {
    _nodes.value = props.nodes
    visibleNodesAfterFiltering.value = []
    hasFiltered.value = false
    return
  }

  const copyNodes = JSON.parse(JSON.stringify(props.nodes))

  const resultNodes: TreeNode[] = []

  copyNodes.forEach((node, i) => {
    let childNodes = [...node.children]
    node.children = []

    for (let childNode of childNodes) {
      let copyChildNode = { ...childNode };

      const regex = new RegExp(filterText.toLowerCase(), 'gi')
      const cleanNodeValue = copyChildNode.key.toLowerCase().split('_/_')[1]

      if (regex.test(cleanNodeValue)) {
        node.children.push(copyChildNode);
      }
    }
    if (node.children.length > 0) {
      resultNodes.push(node)
    }
  })

  _nodes.value = resultNodes

  _nodes.value.forEach(node => {
    expandedKeys.value[node.key] = true
    node.children.forEach(node => {
      if (node.data && node.data.hasOwnProperty('visible') && !node.data.visible) {
        node.data.visible = true
        visibleNodesAfterFiltering.value.push(node)
      }
    })
  })

  hasFiltered.value = true
}

watch(() => props.nodes, (value) => _nodes.value = value, { immediate: true })

watch(filterValue, (value) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => doneTyping(value), typingDelay);
})

async function onSelect(node: TreeNode) {
  if (!node.key) return

  const nodeIndex = props.nodes.findIndex(({ key }) => key === node.key)
  const isTopLevelNode = nodeIndex > -1
  if (!isTopLevelNode) return
  expandedKeys.value[node.key] = true

  if (node.children && node.children?.length > 0) return

  await props.loadChildren(node)
  const keys = {...props.modelValue, ...props.nodes[nodeIndex].children.reduce((acc, cur) => {
      acc[cur.key] = { checked: true }
      return acc
    }, {})}

  emit('update:modelValue', keys)
}

function onButtonClick(node: TreeNode) {
  node.data.handler(node)
}

function onExpand(node: TreeNode) {
  props.loadChildren(node)
}
</script>

<template>
  <div class="px-3 py-0.5 mb-6">
    <BaseInput search v-model="filterValue" :placeholder="filterPlaceholder" />
  </div>
  <Tree
    ref="tree"
    v-model:expandedKeys="expandedKeys"
    :selectionKeys="modelValue"
    @update:selectionKeys="emit('update:modelValue', $event)"
    :value="_nodes"
    selectionMode="checkbox"
    class="w-full"
    unstyled
    @node-expand="onExpand"
    @node-select="onSelect"
    :loading="loading"
    :pt="{
      root: 'relative',
      wrapper: 'relative h-[60vh] overflow-auto',
      filterContainer: 'w-full relative mb-4',
      input: 'w-full p-2 px-9 dark:bg-zinc-700 border dark:border-zinc-500 rounded-lg transition colors ' +
       'hover:border-primary dark:hover:border-primary ' +
       'outline-none focus:ring-2 focus:border-primary focus:ring-primary-100 dark:focus:ring-primary',
      searchIcon: 'w-4 h-4 absolute left-3 top-1/2 -mt-2',
      nodeCheckbox: options => {
        return {
          root: {
            class: [
              'me-2 border-2 rounded-md w-[22px] h-[22px] transition-colors flex items-center justify-center',
              {
                'bg-zinc-50 dark:bg-zinc-700 dark:border-zinc-600 hover:border-primary-300 dark:hover:border-primary': !options.context.checked,
                'bg-primary border-primary dark:border-primary text-white hover:bg-primary-700': options.context.checked,
              }
            ]
          },
          input: 'hidden',
          box: 'flex items-center'
        }
      },
      container: 'me-4',
      content: options => {
        return {
          class: [
              'flex px-2.5 items-center rounded-lg cursor-pointer',
              { 'py-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700': options.props.node.type !== 'button' },
              { 'hidden' : options.props.node.data?.visible === false }
            ]
        }
      },
      toggler: options => { return { class: ['border-0 me-2 -mt-[3px]', { 'hidden': options.context.leaf }] } },
      label: options => { return {
          class: [
            'cursor-pointer select-none',
            {
              'text-zinc-600 dark:text-zinc-500': options.context.leaf,
              'dark:text-zinc-300 font-semibold': !options.context.leaf
            }
          ]
        }
      },
      subgroup: 'ps-6',
      loadingOverlay: 'absolute z-10 w-full h-full flex items-center justify-center bg-white dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75'
    }"
  >
    <template v-slot:loadingicon>
      <BaseLoading class="text-[2rem]" />
    </template>
    <template v-slot:default="{ node }">
      <span v-html="node.data?.structuredLabel ?? node.label"></span>
      <span v-if="node.children?.length" class="inline-flex items-center justify-center px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded-md text-zinc-600 dark:text-zinc-400 text-xs ml-3">
        {{ node.children?.length }}
      </span>
    </template>
    <template #button="{ node }">
      <button @click="onButtonClick(node)" class="ml-5 mb-2 text-primary px-2 py-1 rounded-md hover:bg-primary-50 text-sm">{{ node.label }}</button>
    </template>
  </Tree>
</template>

<style scoped>

</style>
