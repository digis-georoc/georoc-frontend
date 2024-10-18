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

const nodes = ref<TreeNode[]>([])
const loading = ref(true)
const selectedKeys = ref<TreeSelectionKeys>({})

const emit = defineEmits<{
  'update:modelValue': [keys: TreeSelectionKeys]
}>()

onMounted(async () => {
  nodes.value = props.options
  selectedKeys.value = mapNodesToSelectionKeys(props.modelValue)
  loading.value = false
})

watch(selectedKeys, (value) => emit('update:modelValue', mapSelectionKeysToNodes(value)))

function mapSelectionKeysToNodes(keys: TreeSelectionKeys): TreeNode[] {
  return nodes.value.filter(({ key }) => key && keys.hasOwnProperty(key))
}

function mapNodesToSelectionKeys(selectedNodes: TreeNode[]): TreeSelectionKeys {
  const keys = <TreeSelectionKeys>{}

  selectedNodes.forEach(({ key }) => {
    const node = nodes.value.find(node => node.key === key)
    if (!node) return
    keys[key ?? ''] = {checked: true }
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
    filter-key="label"
    filter-placeholder="Type to filter by a chemical name"
  />
</template>
