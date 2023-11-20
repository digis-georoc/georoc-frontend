<script lang="ts" setup>
import type {TreeNode, TreeSelectionKeys} from "primevue/tree";

const props = defineProps<{
  modelValue: TreeNode[]
  title: string
}>()

const elementsSelectDisabled = ref(true)

const elementOptions = ref<RadioGroupOption[]>([])
const elementTypesOptions = ref<RadioGroupOption[]>([])
const elementTypesNodes = ref<TreeNode[]>([])
const loadingChildren = ref(false)
const selectedKeys = ref<TreeSelectionKeys>({})


const emit = defineEmits<{
  'update:modelValue': [nodes: TreeNode[]]
}>()

onMounted(async () => {
  const elementTypes = await getElementTypes()
  elementTypesNodes.value = elementTypes?.data.map(({ value, label }) => ({ key: value, label, children: <TreeNode[]>[], leaf: false })) ?? []
})

async function loadChildren(node: TreeNode) {
  const index = elementTypesNodes.value.findIndex(({ key }) => node.key === key)

  if (index === -1) return

  loadingChildren.value = true
  const elements = await getElements(node.key)
  elementTypesNodes.value[index].children = elements?.data.map(({ value, label }) => ({key: value, label, children: []})) ?? []
  loadingChildren.value = false
}

function onSelect (keys: TreeSelectionKeys) {
  selectedKeys.value = keys
  const selectedNodes = elementTypesNodes.value.filter(({ key }) => key && keys.hasOwnProperty(key)).map(node => {
    const { key, label } = node

    let classes =
        node
            ?.children
            ?.filter((child) => Object.keys(keys).findIndex(selectionKey => selectionKey === child.key) > -1) ?? []

    // if (classes.length === node?.children?.length) {
    //   // When loading values from cache (onMounted) we assumed that the rock type is partially checked
    //   // Here we can tell for sure if all classes of that rock type were cached, if yes we mark also the rock type as checked.
    //   selectedKeys.value[key] = { checked: true }
    // }

    return {
      key: key ?? '',
      label: label ?? '',
      children: classes.map(({ key, label }) => ({ value: key ?? '', label: label ?? ''}))
    }
  })

  emit('update:modelValue', selectedNodes)
}
</script>
<template>
  <BaseTreeSelect
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :nodes="elementTypesNodes"
    :load-children="loadChildren"
    :loading="loadingChildren"
  />
</template>
