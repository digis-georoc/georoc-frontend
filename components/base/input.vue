<script setup lang="ts">
const id = ref(1)
const inputValue = ref()

const props = withDefaults(defineProps<{
  placeholder?: string,
  type: string,
  modelValue: string | number,
  title?: string,
  disabled?: boolean,
  size?: 'sm' | 'md' | 'lg'
  search: boolean
}>(), {
  placeholder: 'please_enter',
  type: 'text',
  disabled: false,
  size: 'md',
  search: false
})

watch(() => props.modelValue, (value) => { return inputValue.value = value }, { immediate: true })
watch(() => inputValue.value, (value) => emit('update:modelValue', value))

const emit = defineEmits(['input', 'update:modelValue'])

function onInput(value: string) {
  inputValue.value = value
  emit('input', inputValue.value)
}

const classes = [
  'outline-none bg-white dark:bg-zinc-800 w-full transition-colors',
  'border dark:border-zinc-600 rounded hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-100',
  {'py-2': props.size === 'md'},
  {'py-1 text-sm': props.size === 'sm'},
  {'pl-8 pr-2': props.search },
  {'px-2': !props.search },
  {'opacity-50': props.disabled}
]
</script>

<template>
  <div>
    <h3 v-if="title" class="font-semibold" :class="{'opacity-50': disabled}">{{ title }}</h3>
    <div class="relative" ref="container">
      <Icon v-if="search" :name="'heroicons:magnifying-glass'" class="absolute left-2.5 top-[13px]" />
      <input
        :class="classes"
        autocapitalize="none"
        autocorrect="off"
        autocomplete="off"
        spellcheck="false"
        aria-autocomplete="list"
        :type="type"
        class=""
        :id="id"
        :placeholder="$t(placeholder)"
        :disabled="disabled"
        @blur="blur"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
