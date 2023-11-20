<script setup lang="ts">

const props = defineProps<{
  items: SelectedChemicalElement[]
}>()

const emit = defineEmits<{
  update: [item: SelectedChemicalElement]
}>()

</script>

<template>
  <div class="flex flex-1 flex-col mb-2" v-for="(item, i) in items" :key="item.value">
    <h3 class="font-semibold mb-2">{{ item.label }}:</h3>
    <div class="flex ps-4">

    </div>
  </div>
  <div v-if="items.length > 0" class="w-full flex flex-col flex-1">
    <div class="flex flex-1 mb-2" v-for="(item, i) in items">
      <div class="w-1/4">
        <p v-if="i === 0" class="text-sm font-semibold">{{ $t('type') }}</p>
        <p>{{ item.type?.label }}</p>
      </div>
      <div class="w-1/4">
        <p v-if="i === 0" class="text-sm font-semibold">{{ $t('element') }}</p>
        <p>{{ item.element?.label }}</p>
      </div>
      <div class="w-1/4">
        <p v-if="i === 0" class="text-sm font-semibold">{{ $t('min') }}</p>
<!--        <p>{{ item.min }}</p>-->
        <BaseInput
            type="number"
            :model-value="item.min"
            @update:modelValue="emit('update', { ...item, min: $event})"
        />
      </div>
      <div class="w-1/4">
        <p v-if="i === 0" class="text-sm font-semibold">{{ $t('max') }}</p>
        <p>{{ item.max }}</p>
      </div>
      <div class="flex items-end pb-1.5">
        <Icon name="ic:close" @click="remove(i)" class="cursor-pointer"/>
      </div>
    </div>
  </div>
  <div v-else class="text-sm text-stone-400">{{ $t('no_options_selected') }}.</div>
</template>

<style scoped>

</style>
