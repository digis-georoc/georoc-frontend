<script setup lang="ts">
import Tree from 'primevue/tree'
import type {TreeNode, TreeSelectionKeys, TreeExpandedKeys} from 'primevue/tree'

const props = withDefaults(defineProps<{
  nodes: TreeNode[]
  modelValue: TreeSelectionKeys,
  loadChildren: (node: TreeNode) => void
  loading: boolean
}>(),{
  nodes: [],
  modelValue: {},
  loading: false,
  loadChildren: () => {}
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
    selectionMode="checkbox"
    class="w-full"
    unstyled
    @node-expand="loadChildren"
    @node-select="onSelect"
    :loading="loading"
    :pt="{
      root: 'relative',
      wrapper: 'relative h-[400px] overflow-auto',
      filterContainer: 'w-full relative mb-4',
      input: 'w-full p-2 border rounded-lg transition colors hover:border-primary outline-none focus:ring-2 focus:border-primary focus:ring-primary-100',
      searchIcon: 'w-4 h-4 absolute right-3 top-1/2 -mt-2',
      checkboxContainer: 'me-2',
      checkbox: options => { return {
        class: [
          'border-2 rounded-md w-[22px] h-[22px] transition-colors flex items-center justify-center',
          {
            'bg-stone-50 hover:border-primary': !options.context.checked,
            'bg-primary text-white hover:bg-primary-700': options.context.checked,
          }
        ]
      }},
      container: 'me-4',
      content: 'flex py-2 px-3 rounded-lg hover:bg-stone-200 cursor-pointer',
      toggler: options => { return { class: ['border-0 me-2', { 'hidden': options.context.leaf }] } },
      label: 'cursor-pointer select-none',
      subgroup: 'ps-4',
      loadingOverlay: 'absolute z-10 w-full h-full flex items-center justify-center bg-white bg-opacity-75'
    }"
  >
    <template v-slot:loadingicon>
      <BaseLoading class="text-[2rem]" />
    </template>

  </Tree>
</template>

<style scoped>

</style>
