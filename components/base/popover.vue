<script setup lang="ts">
import {MultiselectOption, RadioGroupOption} from "~/types";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = withDefaults(defineProps<{
  buttonStyles: string,
  buttonTitle: string
}>(), {
  buttonStyles: '',
  buttonTitle: ''
})
</script>
<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton :class="[buttonStyles, open ? '' : 'text-opacity-90']">
      {{ buttonTitle }}
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute left-0 z-10 mt-3">
        <div class="bg-white rounded-xl border py-3 px-4 shadow">
          <slot />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
