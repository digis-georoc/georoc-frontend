<script setup lang="ts">
import Tree, {TreeNode, TreeSelectionKeys} from 'primevue/tree'

const props = withDefaults(defineProps<{
  nodes: TreeNode[]
  modelValue: TreeSelectionKeys
}>(),{
  nodes: [],
  modelValue: {}
})

const emit = defineEmits<{
  select: [keys: TreeSelectionKeys]
  'update:modelValue': [value: TreeSelectionKeys]
}>()

const selectedKeys = ref<TreeSelectionKeys>({})
</script>

<template>
  <Tree
    :selectionKeys="modelValue"
    @update:selectionKeys="emit('update:modelValue', $event)"
    :value="nodes"
    :filter="true"
    filterMode="lenient"
    selectionMode="checkbox"
    class="w-full"
    unstyled
    :pt="{
      wrapper: 'max-h-[400px] overflow-auto',
      filterContainer: 'w-full relative mb-4',
      filterInput: 'w-full p-2 border rounded-lg',
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
      subgroup: 'ps-4'
    }"
  ></Tree>
</template>

<style scoped>

</style>
