<script setup lang="ts">
import Tree from 'primevue/tree'
import type {TreeNode, TreeSelectionKeys, TreeExpandedKeys} from 'primevue/tree'

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

const expandedKeys = ref<TreeExpandedKeys>({})

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

function onButtonClick(node) {
  node.data.handler(node)
}
</script>

<template>
  <Tree
    ref="tree"
    v-model:expandedKeys="expandedKeys"
    :selectionKeys="modelValue"
    @update:selectionKeys="emit('update:modelValue', $event)"
    :value="nodes"
    :filter="true"
    filterMode="lenient"
    :filterPlaceholder="filterPlaceholder"
    selectionMode="checkbox"
    class="w-full"
    unstyled
    @node-expand="loadChildren"
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
              'flex px-3 rounded-lg cursor-pointer',
              { 'py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700': options.props.node.type !== 'button' },
              { 'hidden' : options.props.node.data?.visible === false }
            ]
        }
      },
      toggler: options => { return { class: ['border-0 me-2', { 'hidden': options.context.leaf }] } },
      label: 'cursor-pointer select-none',
      subgroup: 'ps-4',
      loadingOverlay: 'absolute z-10 w-full h-full flex items-center justify-center bg-white dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75'
    }"
  >
    <template v-slot:loadingicon>
      <BaseLoading class="text-[2rem]" />
    </template>
    <template v-slot:default="{ node }">
      <span v-html="node.data?.structuredLabel ?? node.label"></span>
    </template>
    <template #button="{ node }">
      <button @click="onButtonClick(node)" class="ml-5 mb-2 text-primary px-2 py-1 rounded-md hover:bg-primary-50 text-sm">{{ node.label }}</button>
    </template>
  </Tree>
</template>

<style scoped>

</style>
