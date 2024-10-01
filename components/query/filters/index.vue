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
    <div class="relative m-2">
      <div class="absolute left-0 top-0  w-full h-full z-0 bg-primary-300 opacity-50 rounded-md" :class="{'ping-running': !selectedMaterialId }"></div>
      <BaseCard :title="$t('material')" class="relative z-1 flex-shrink-0" @collapsed-change="materialFilterIsCollapsed = $event">
        <template #header-right>
          <div v-if="selectedMaterialId !== null && materialFilterIsCollapsed" class="flex items-center justify-center px-1.5 py-0.5 border border-primary rounded-md text-primary text-xs">
            {{ $t(selectedMaterialId) }}
          </div>
        </template>
        <QueryFilterMaterial class="w-full" :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
      </BaseCard>
    </div>

    <template v-if="selectedMaterialId">
      <div class="flex px-4 pt-2 pb-1 items-end border-b dark:border-gray-600 relative">
        <h3 class="font-bold mb-2">{{ $t('filters') }}:</h3>
        <div v-if="amountActiveFilters > 0" class="flex items-center justify-center px-1.5 py-0.5 border border-primary rounded-md text-primary text-xs ml-2 mb-2">
          {{ amountActiveFilters }}
        </div>
        <BaseButton
          v-if="amountActiveFilters > 0"
          size="small"
          display="flat"
          color="neutral"
          class="ml-auto text-gray-400"
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
        <span class="text-gray-400"> {{ $t('filter_panel_message_no_material_selected') }}</span>
      </div>
    </template>
  </div>
  <div class="p-4 border-t dark:border-gray-600 flex mt-auto bg-white dark:bg-gray-800">
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
<style scoped lang="scss">
.ping-running {
  animation: ping 2s .65s ease-out infinite;
}


@keyframes ping {
  0% {
    box-shadow: 0 0 2px 2px rgba(#664152, 0.7), inset 0 0 1px rgba(#664152,0.5);
  }
  55% {
    box-shadow: 0 0 50px rgba(#a88593,0), inset 0 0 30px rgba(#a88593,0);
  }
  100% {
    box-shadow: 0 0 50px rgba(#a88593,0), inset 0 0 30px rgba(#a88593,0);
  }
}
</style>
