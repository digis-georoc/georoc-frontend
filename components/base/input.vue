<script setup lang="ts">
const id = ref(1)
const inputValue = ref()

const props = withDefaults(defineProps<{
  placeholder?: string,
  type: string,
  modelValue: string | number,
  title?: string
}>(), {
  placeholder: 'please_enter',
  type: 'text'
})

watch(() => props.modelValue, (value) => inputValue.value = value, { immediate: true })
watch(() => inputValue.value, (value) => emit('update:modelValue', value))

const emit = defineEmits(['input', 'update:modelValue'])

function onInput(value: string) {
  inputValue.value = value
  emit('input', inputValue.value)
}
</script>

<template>
  <div>
    <h3 v-if="title" class="font-semibold">{{ title }}</h3>
    <div class="border dark:border-zinc-600 rounded-lg p-2" ref="container">
      <input
          autocapitalize="none"
          autocorrect="off"
          autocomplete="off"
          spellcheck="false"
          aria-autocomplete="list"
          :type="type"
          class="outline-none bg-transparent"
          :id="id"
          :placeholder="$t(placeholder) + '...'"
          @blur="blur"
          v-model="inputValue"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
