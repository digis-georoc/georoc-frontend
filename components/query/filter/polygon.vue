<template>
  <div class="flex flex-col items-start flex-wrap">
    <BaseButton :text="buttonText" @click="handleButton"/>
    <div class="text-gray-400 text-sm flex-1 mt-2">{{ message }}</div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['start', 'reset', 'stop'])
const queryStore = useQueryStore()
const polygonStore = usePolygonStore()

const enum PolygonDrawingStates {
  Idle,
  Drawing,
  Finished
}

const state = computed(() => polygonStore.activeState)

const messageStartText = 'Click to start drawing a polygon on the map';

const buttonText = ref('Draw shape')
const message = ref(messageStartText)

const hasPolygon = computed(() => {
  return queryStore.activeFilters.findIndex(filter => filter.name === 'polygon') !== -1
})

watch(() => state.value, (value) => {
  if (value === PolygonDrawingStates.Idle) {
    buttonText.value = 'Draw shape'
    message.value = messageStartText
  } else if (value === PolygonDrawingStates.Drawing) {
    emit('start')
    buttonText.value = 'Cancel drawing'
    message.value = 'Drawing mode active.'
  } else if (value === PolygonDrawingStates.Finished) {
    buttonText.value = 'Reset area'
    message.value = 'Area selected!'
  }
}, { immediate: true })

watch(() => hasPolygon.value, (value) => {
  if (value) {
    polygonStore.activeState = PolygonDrawingStates.Finished
  }
})

queryStore.$onAction(({ name }) => {
  if (name === 'stopDrawingOnMap') {
    buttonText.value = 'Draw shape'
  }
})


function handleButton() {
  if (state.value === PolygonDrawingStates.Idle) {
    polygonStore.activeState = PolygonDrawingStates.Drawing
  } else if (state.value === PolygonDrawingStates.Drawing) {
    emit('stop')
    polygonStore.activeState = PolygonDrawingStates.Idle
  } else if (state.value === PolygonDrawingStates.Finished) {
    emit('reset')
    polygonStore.activeState = PolygonDrawingStates.Idle
  }
}
</script>
