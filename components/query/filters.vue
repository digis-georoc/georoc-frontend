<script setup lang="ts">
const { t } = useI18n()

const queryStore = useQueryStore()

const inclusionTypeFilterValue = computed(() => queryStore.getFilter('inclusiontype')?.value)

const storedMaterial = window.localStorage.getItem('material-filter')
const hideMaterialDialog = window.localStorage.getItem('hide-material-dialog')

const selectedMaterialId = ref<string | null>(hideMaterialDialog !== null && storedMaterial ? storedMaterial : null)

handleFilterSelection(selectedMaterialId.value)

function handleFilterSelection(value: string | null) {
  if (value === null) return
  selectedMaterialId.value = value
  queryStore.setPanelFilter({
    name: 'material',
    value
  }, true)
  submit()
}

function submit() {
  queryStore.execute()
}

function startDrawingOnMap() {
  queryStore.startDrawingOnMap()
}

function resetPolygonOnMap() {
  queryStore.resetPolygonOnMap()
}

function stopDrawingOnMap() {
  queryStore.stopDrawingOnMap()
}
</script>
<template>
  <div class="self-start flex justify-center items-center space-x-2 mb-4 w-full">
    <QueryFilterMaterial class="flex-grow-0" :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
  </div>
  <div class="flex overflow-hidden">
    <div class="flex-grow" v-if="selectedMaterialId === 'WR'">
      <QueryFilterRockType />
    </div>
    <div class="flex-grow" v-if="selectedMaterialId === 'INC'">
      <QueryFilterInclusionType />
    </div>
    <div v-if="inclusionTypeFilterValue === 'IMIN'" class="h-full mx-4 border-r dark:border-stone-700"></div>
    <div v-if="inclusionTypeFilterValue === 'IMIN'" class="flex-grow flex">
      <QueryFilterMaterialInclusion />
    </div>
    <div class="h-full mx-4 border-r dark:border-stone-700"></div>
    <div class="flex-grow">
      <QueryFilterBaseContainer :title="$t('chemistry')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterChemistry />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="h-full mx-4 border-r dark:border-stone-700"></div>
    <div class="flex-grow">
      <QueryFilterBaseContainer :title="$t('tectonic_setting')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterTectonic />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="h-full mx-4 border-r dark:border-stone-700"></div>
    <div class="flex-grow">
      <QueryFilterBaseContainer :title="$t('location_type')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterLocationType />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="h-full mx-4 border-r dark:border-stone-700"></div>
    <div class="flex-grow">
      <QueryFilterBaseContainer :title="$t('age')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterAge />
        </template>
      </QueryFilterBaseContainer>
    </div>
  </div>
  <div class="absolute -bottom-[68px] z-[9999] left-1/2 -translate-x-1/2">
    <QueryFilterPolygon
        @start="startDrawingOnMap"
        @reset="resetPolygonOnMap"
        @stop="stopDrawingOnMap"
    />
  </div>

  <QueryFilterMaterialDialog @select="handleFilterSelection" />
</template>
