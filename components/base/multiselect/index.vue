<script setup lang="ts">
import {MultiselectOption} from "~/types";

const id = ref(1)

const _options = ref<MultiselectOption[]>([])
const selectedOptions = ref<MultiselectOption[]>([])
const tags = computed(() => selectedOptions.value.map(({ label }) => label))
const props = defineProps<{
  idPrefix: string,
  options: MultiselectOption[]
}>()

const emit = defineEmits(['change'])

watch(() => props.options, (value) => {
  _options.value = value
}, {immediate:true})
function addToSelected(option: MultiselectOption) {
  selectedOptions.value.push(option)
  emit('change', selectedOptions.value)
}

function removeFromSelected(option: MultiselectOption) {
  const index = selectedOptions.value.findIndex(({ value }) => value === option.value)
  if (index === -1) return
  selectedOptions.value.splice(index, 1)
  emit('change', selectedOptions.value)
}

function includes(search: string, str: string) {
  if (!search) search = 'undefined'
  const text = str.toString().toLowerCase()
  return text.indexOf(search.trim()) !== -1
}

function filterOptions(search: string) {
  return _options.value.filter(({ label }) => includes(search, label))
}

function onEnter(value: string) {
  if (_options.value.length === 0) return

  const selectedOption = _options.value[0]
  selectedOption.active = true

  const index = props.options.findIndex(({ value }) => value === selectedOption.value)

  _options.value = props.options
  _options.value[index].active = true

  addToSelected(selectedOption)
}

function onInput(value: string) {
  if (value === '') _options.value = props.options
  else _options.value = filterOptions(value)
}

function onOptionChange({ index, checked }: { index: number, checked: boolean}) {
  const option = _options.value[index]
  option.active = checked
  if (checked) addToSelected(option)
  else removeFromSelected(option)
}

function onTagRemove(index: number) {
  removeFromSelected(selectedOptions.value[index])
}
</script>

<template>
<div ref="container" class="">
  <BaseMultiselectInput @enter="onEnter($event)" @input="onInput($event)" />
  <div v-if="tags.length > 0" class="flex mt-2">
    <BaseMultiselectTags v-model="tags" @remove="onTagRemove" />
  </div>
  <div class="h-[300px] overflow-y-auto pl-[2px] -mr-4 mt-4">
    <BaseMultiselectOptions v-model="_options" :id-prefix="idPrefix" @change="onOptionChange" />
  </div>
</div>
</template>

<style scoped>

</style>
