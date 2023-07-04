<template>
  <div class="flex flex-col items-start flex-wrap">
    <BaseButton :text="buttonText" @click="handleButton"/>
    <div class="text-gray-400 text-sm flex-1 mt-2">{{ message }}</div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['start', 'reset', 'stop'])
const queryStore = useQueryStore()

enum States {
  Idle,
  Drawing,
  Finished
}

const state = ref(States.Idle)

watch(() => state.value, (value) => {
  if (value === States.Idle) {
    buttonText.value = 'Draw shape'
    message.value = messageStartText
  } else if (value === States.Drawing) {
    emit('start')
    buttonText.value = 'Cancel drawing'
    message.value = 'Drawing mode active.'
  } else if (value === States.Finished) {
    buttonText.value = 'Reset area'
    message.value = 'Area selected!'
  }
})

const messageStartText = 'Click to start drawing a polygon on the map';

const buttonText = ref('Draw shape')
const message = ref(messageStartText)

const hasPolygon = computed(() => {
  return queryStore.activeFilters.findIndex(filter => filter.name === 'draw') !== -1
})

watch(() => hasPolygon.value, (value) => {
  if (value) {
    state.value = States.Finished
  }
})

queryStore.$onAction(({ name }) => {
  if (name === 'stopDrawingOnMap') {
    buttonText.value = 'Draw shape'
  }
})


function handleButton() {
  if (state.value === States.Idle) {
    state.value = States.Drawing
  } else if (state.value === States.Drawing) {
    emit('stop')
    state.value = States.Idle
  } else if (state.value === States.Finished) {
    emit('reset')
    state.value = States.Idle
  }
}
</script>
