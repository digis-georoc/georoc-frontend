<script setup lang="ts">
const { t } = useI18n()
const queryStore = useQueryStore()
const polygonStore = usePolygonStore()

const enum PolygonDrawingStates {
  Idle,
  Drawing,
  Finished
}

const state = computed(() => polygonStore.activeState)

const messageStartText = t('start_drawing_polygon');

const buttonText = ref(t('draw_shape'))
const message = ref(messageStartText)

const hasPolygon = computed(() => {
  return queryStore.activeFilters.findIndex(filter => filter.name === 'polygon') !== -1
})

watch(() => state.value, (value) => {
  if (value === PolygonDrawingStates.Idle) {
    buttonText.value = t('draw_shape')
    message.value = messageStartText
  } else if (value === PolygonDrawingStates.Drawing) {
    start()
    buttonText.value = t('cancel_drawing')
    message.value = t('drawing_mode_active')
  } else if (value === PolygonDrawingStates.Finished) {
    buttonText.value = t('reset_shape')
    message.value = t('shape_selected') + '!'
  }
}, { immediate: true })

watch(() => hasPolygon.value, (value) => {
  if (value) {
    polygonStore.activeState = PolygonDrawingStates.Finished
  }
})

queryStore.$onAction(({ name }) => {
  if (name === 'stopDrawingOnMap') {
    buttonText.value = t('draw_shape')
  }
})


function handleButton() {
  if (state.value === PolygonDrawingStates.Idle) {
    polygonStore.activeState = PolygonDrawingStates.Drawing
  } else if (state.value === PolygonDrawingStates.Drawing) {
    stop()
    polygonStore.activeState = PolygonDrawingStates.Idle
  } else if (state.value === PolygonDrawingStates.Finished) {
    reset()
    polygonStore.activeState = PolygonDrawingStates.Idle
  }
}

function start() {
  queryStore.startDrawingOnMap()
}

function reset() {
  queryStore.resetPolygonOnMap()
}

function stop() {
  queryStore.stopDrawingOnMap()
}
</script>
<template>
  <div class="flex flex-col items-start flex-wrap">
    <BaseButton @click="handleButton" :rounded="false"  display="mono" icon="ph:polygon-bold" class="shadow-lg"/>
    <!--    <div class="text-gray-400 text-sm flex-1 mt-2">{{ message }}</div>-->
  </div>
</template>
