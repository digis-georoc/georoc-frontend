<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = withDefaults(defineProps<{
  options: RadioGroupOption[]
  modelValue: RadioGroupOption | null
  title?: string,
  disabled?: boolean
}>(), { disabled: false })

const _selected = ref<RadioGroupOption |null>({ label: 'Please select', value: 'none'})
const emit = defineEmits<{
  'update:modelValue': [selected: RadioGroupOption | null]
}>()

watch(() => props.modelValue, (value) => {
  _selected.value = value ?? { label: 'Please select', value: 'none'}
})

watch(() => _selected.value, (value) => {
  emit('update:modelValue', value)
})

</script>
<template>
  <div>
    <h3 v-if="title" class="font-semibold"  :class="{'opacity-50': disabled}">{{ title }}</h3>
    <Listbox v-model="_selected" :disabled="disabled">
      <div class="relative mt-1">
        <ListboxButton
          v-slot="{ value, disabled }"
          class="relative w-full cursor-default rounded-lg bg-white dark:bg-zinc-600 border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500
        focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          :class="{'opacity-50': disabled}"
        >
          <span class="block truncate">{{ value.label }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon name="fluent:chevron-up-down-16-regular" class="h-5 w-5 text-stone-400" aria-hidden="true"/>
          </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              class="absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-zinc-600 py-1 text-base shadow-lg ring-1
            ring-black ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="option in options"
                :key="option.value"
                :value="option"
                as="template"
            >
              <li
                  class="cursor-pointer"
                  :class="[
                active ? 'bg-primary-50 text-primary dark:text-primary-300 dark:bg-primary-300 dark:bg-opacity-10' : 'text-stone-700 dark:text-stone-300',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
              >
                <span :class="[ selected ? 'font-medium' : 'font-normal','block truncate']">{{ option.label }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary dark:text-primary-300">
                  <Icon name="ic:baseline-check" class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
