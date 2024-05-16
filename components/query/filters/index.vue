<script setup lang="ts">
const { t } = useI18n()

const queryStore = useQueryStore()

const materialFilterValue = computed(() => queryStore.getFilter(QueryKey.Material)?.value)

const selectedMaterialId = ref<string | null>(materialFilterValue.value ?? null)
const isLoading = ref(false)
const amountActiveFilters = computed(() => queryStore.filters.active.length)
const hasChanges = computed(() => queryStore.hasChanges)
const materialFilterIsCollapsed = ref(false)

function handleFilterSelection(value: string | null) {
  if (value === null) return
  selectedMaterialId.value = value
  queryStore.setMaterialFilter({
    name: QueryKey.Material,
    value
  })
}

function submit() {
  queryStore.execute()
}

function resetAll() {
 queryStore.resetAllActiveFilters()
}

function getSearchButtonIcon() {
  if (isLoading.value) return 'line-md:loading-loop'
  if (!hasChanges.value && selectedMaterialId.value !== null) return 'ic:round-check'
  return ''
}

function getSearchButtonText() {
  if (isLoading.value) return `${t('updating')}...`
  if (hasChanges.value || selectedMaterialId.value === null) return t('update_query')
  return t('query_updated')
}

const unsubscribe = queryStore.$onAction(
    ({ name, args }) => {
      if (name === 'loadingQuery') {
        isLoading.value = args[0]
      }
    }
)

onBeforeUnmount(() => unsubscribe())

</script>
<template>
  <div class="overflow-auto flex flex-col flex-1">
    <BaseCard :title="$t('material')" class="m-2 flex-shrink-0" @collapsed-change="materialFilterIsCollapsed = $event">
      <template #header-right>
        <div v-if="selectedMaterialId !== null && materialFilterIsCollapsed" class="flex items-center justify-center px-1.5 py-0.5 border border-primary rounded-md text-primary text-xs">
          {{ $t(selectedMaterialId) }}
        </div>
      </template>
      <QueryFilterMaterial class="w-full" :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
    </BaseCard>
    <template v-if="selectedMaterialId">
      <div class="flex px-4 pt-2 pb-1 items-end border-b dark:border-zinc-600 relative">
        <h3 class="font-bold mb-2">{{ $t('filters') }}:</h3>
        <div v-if="amountActiveFilters > 0" class="flex items-center justify-center px-1.5 py-0.5 border border-primary rounded-md text-primary text-xs ml-2 mb-2">
          {{ amountActiveFilters }}
        </div>
        <BaseButton
          v-if="amountActiveFilters > 0"
          size="small"
          display="flat"
          class="ml-auto text-zinc-400"
          @click="resetAll"
          :text="$t('reset_all')" />

      </div>
      <div class="flex flex-1 flex-col scroll-gradient relative mb-2 pt-2">
        <QueryFiltersWholeRockGlass v-if="selectedMaterialId === MaterialKeys.WRGL" />
        <QueryFiltersInclusion v-if="selectedMaterialId === MaterialKeys.INC" />
        <QueryFiltersMineral v-if="selectedMaterialId === MaterialKeys.MIN" />
      </div>
    </template>
    <template v-else>
      <div class="flex-1 flex justify-center items-center">
        <span class="text-zinc-400"> {{ $t('filter_panel_message_no_material_selected') }}</span>
      </div>
    </template>
  </div>
  <div class="p-4 border-t dark:border-zinc-600 flex mt-auto bg-white dark:bg-zinc-800">
    <BaseButton
      :text="getSearchButtonText()"
      size="normal"
      class="flex-1"
      :disabled="selectedMaterialId === null || !hasChanges"
      :icon="getSearchButtonIcon()"
      @click="submit"
    />
  </div>
</template>
