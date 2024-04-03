<script setup lang="ts">
const { t } = useI18n()

const queryStore = useQueryStore()

const materialFilterValue = computed(() => queryStore.getFilter(QueryKey.Material)?.value)

const selectedMaterialId = ref<string | null>(materialFilterValue.value ?? null)
const isLoading = ref(false)
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
    <QueryFiltersCard :title="$t('material')" class="m-2 flex-shrink-0">
      <QueryFilterMaterial class="w-full" :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
    </QueryFiltersCard>
    <template v-if="selectedMaterialId">
      <h3 class="px-4 py-2 font-bold border-b dark:border-zinc-600 relative">Filters:</h3>
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
      :text="$t('search')"
      size="normal"
      class="flex-1"
      :disabled="selectedMaterialId === null"
      :icon="isLoading ? 'line-md:loading-loop' : 'ic:round-check'"
      @click="submit"
    />
  </div>
</template>
