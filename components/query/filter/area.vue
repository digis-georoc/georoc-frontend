<template>
  <div class="flex flex-col items-start flex-wrap">
    <BaseButton :text="buttonText" @click="handleButton"/>
    <div class="text-gray-400 text-sm flex-1 mt-2">{{ message }}</div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['start', 'reset'])
const queryStore = useQueryStore()

const messageStartText = 'Click to start drawing a polygon on the map';

const buttonText = ref('Draw shape')
const message = ref(messageStartText)

const hasPolygon = computed(() => {
  return queryStore.activeFilters.findIndex(filter => filter.name === 'draw') !== -1
})

watch( () => hasPolygon.value, (value) => {
  if (value) {
    buttonText.value = 'Reset area'
    message.value = 'Area selected!'
  } else {
    buttonText.value = 'Draw area'
    message.value = messageStartText
  }
})

queryStore.$onAction(({ name }) => {
  if (name === 'stopDrawingOnMap') {
    buttonText.value = 'Draw shape'
  }
})


function handleButton() {
  if (hasPolygon.value) emit('reset')
  else {
    emit('start')
    buttonText.value = 'Cancel drawing'
    message.value = 'Drawing mode active.'
  }
}
</script>
