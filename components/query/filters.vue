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
  queryStore.resetOnMaterialChange()
  submit()
}

function submit() {
  queryStore.execute()
}

</script>
<template>
  <div class="self-start flex items-center mb-8 w-full px-4">
    <QueryFilterMaterial :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
  </div>
  <div class="flex flex-1 flex-col px-4 overflow-auto">
    <div v-if="selectedMaterialId === 'WR'">
      <QueryFilterRockType />
    </div>
    <div v-if="selectedMaterialId === 'INC'">
      <QueryFilterInclusionType />
    </div>
    <div v-if="inclusionTypeFilterValue === 'IMIN'" class="my-6 border-b dark:border-stone-700"></div>
    <div v-if="inclusionTypeFilterValue === 'IMIN'" class="flex-grow flex">
      <QueryFilterMaterialInclusion />
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterBaseContainer :title="$t('chemistry')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterChemistry />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterBaseContainer :title="$t('tectonic_setting')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterTectonic />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterBaseContainer :title="$t('location_type')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterLocationType />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
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
  <QueryFilterMaterialDialog @select="handleFilterSelection" />
</template>
