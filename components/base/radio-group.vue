<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const props = defineProps<{
  modelValue: RadioGroupOption
  options: RadioGroupOption[]
}>()

// watch(() => props.options, (value) => {
//   selected.value = value[0]
// }, { immediate: true })
// const selected = ref<Option>()

const emit = defineEmits(['change', 'update:modelValue'])

</script>
<template>
  <div class="w-full px-4 py-16">
    <div class="mx-auto w-full max-w-md">
      <RadioGroup :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
              as="template"
              v-for="option in options"
              :key="option.value"
              :value="option"
              v-slot="{ active, checked }"
          >
            <div
                :class="[
                active
                  ? 'ring-2 ring-primary dark:ring-primary-300 dark:ring-opacity-50 ring-opacity-25'
                  : '',
                checked ? 'bg-primary text-white ' : 'bg-white  ',
              ]"
                class="relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none border-2"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                    >
                      {{ option.label }}
                    </RadioGroupLabel>
<!--                    <RadioGroupDescription-->
<!--                        as="span"-->
<!--                        :class="checked ? 'text-sky-100' : 'text-gray-500'"-->
<!--                        class="inline"-->
<!--                    >-->
<!--                      <span> {{ plan.ram }}/{{ plan.cpus }}</span>-->
<!--                      <span aria-hidden="true"> &middot; </span>-->
<!--                      <span>{{ plan.disk }}</span>-->
<!--                    </RadioGroupDescription>-->
                  </div>
                </div>
                <div v-show="checked" class="shrink-0 text-white">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="#fff"
                        fill-opacity="0.2"
                    />
                    <path
                        d="M7 13l3 3 7-7"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>
