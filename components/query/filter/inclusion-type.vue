<script setup lang="ts">
import {RadioGroup, RadioGroupLabel, RadioGroupOption} from "@headlessui/vue";
const { t } = useI18n()
const queryStore = useQueryStore()


const selected = ref<{ id: string }>({ id: ''})

const types = [
  {
    id: 'IMIN',
    label: t('mineral'),
  },
  {
    id: 'IFL',
    label: t('fluid'),
  },
  {
    id: 'IGL',
    label: t('glass'),
  },
  {
    id: 'IMELT',
    label: t('melt'),
  },
]

watch(() => selected.value, ({ id }) => {
  queryStore.setPanelFilter({
    name: 'inclusiontype',
    value: id
  })
}, { immediate: true })

</script>
<template>
  <RadioGroup
      v-model="selected"
      by="id"
      class="bg-zinc-200/50 dark:bg-zinc-700 p-1 rounded-xl w-full"
  >
    <RadioGroupLabel class="sr-only">{{ $t('material_filter') }}</RadioGroupLabel>
    <div class="flex space-x-2">
      <RadioGroupOption
          as="template"
          v-for="type in types"
          :key="type.id"
          :value="type"
          v-slot="{ active, checked }"
      >
        <div
            :class="[
            active
              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-300'
              : '',
            checked ? 'bg-primary' : 'hover:bg-zinc-200 dark:hover:bg-zinc-600',
          ]"
            class="relative flex-shrink-0 flex-grow flex justify-center cursor-pointer rounded-lg px-3 py-2 focus:outline-none"
        >
          <RadioGroupLabel as="p" class="text-sm font-semibold flex items-center">
            <span :class="checked ? 'text-white' : 'text-zinc-600 dark:text-gray-300'">
              {{ type.label }}
            </span>
          </RadioGroupLabel>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
