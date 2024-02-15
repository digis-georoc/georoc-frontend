<script lang="ts" setup>
const queryStore = useQueryStore()
const materialFilter = queryStore.getFilter(QueryKey.Material)

const props = defineProps<{
  item: QueryListItem | null,
}>()

function getMaterialLabel() {
  if (materialFilter?.value === MaterialKeys.WRGL) return 'rock_class'
  if (materialFilter?.value === MaterialKeys.MIN) return 'mineral_name'
  if (materialFilter?.value === MaterialKeys.INC) return 'inclusion_type'
  return null
}

function getMaterial() {
  if (materialFilter?.value === MaterialKeys.WRGL) return props.item?.rockClass
  if (materialFilter?.value === MaterialKeys.MIN) return props.item?.mineral
  if (materialFilter?.value === MaterialKeys.INC) return props.item?.inclusionType
  return null
}

</script>
<template>
  <div class="flex flex-wrap gap-x-5 gap-y-2 px-4 py-2 border rounded-lg hover:ring-2 hover:ring-primary hover:bg-primary-50/70 dark:hover:bg-primary-50/10 transition-all cursor-pointer dark:border-zinc-600">
    <div class="flex w-full items-center">
      <span class="text-sm font-bold">{{ item.sampleName }}</span>
      <span class="text-xs text-zinc-300 ml-auto">#{{ item.sampleID }}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-zinc-500">{{ $t(getMaterialLabel()) }}</span>
      <span class="text-sm">{{ getMaterial() }}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-zinc-500">{{ $t('tectonic_setting') }}</span>
      <span class="text-sm">{{ item.geologicalSetting }}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-zinc-500">{{ $t('age') }}</span>
      <span class="text-sm">{{ item.geologicalAge ?? '-' }}</span>
    </div>
  </div>
</template>
