<script setup lang="ts">
const id = ref(1)
const searchValue = ref('')
const props = withDefaults(defineProps<{
  placeholder: string,
}>(), {
  placeholder: 'please_enter'
})

const emit = defineEmits(['enter', 'input'])

function updateSearch(value: string) {
  searchValue.value = value
  emit('input', searchValue.value)
}

function onEnter(event: Event) {
  emit('enter', searchValue.value)
  searchValue.value = ''
}

</script>

<template>
  <div class="border border-zinc-300 dark:border-zinc-600 rounded p-2" ref="container">
    <input
      autocapitalize="none"
      autocorrect="off"
      autocomplete="off"
      spellcheck="false"
      aria-autocomplete="list"
      type="text"
      class="outline-0 bg-transparent"
      :id="id"
      :value="searchValue"
      role="combobox"
      aria-haspopup="true"
      aria-expanded="true"
      :aria-controls="`${id}OptionsList`"
      :aria-aria-activedescendant="`${id}${pointer}HighlightedOption`"
      :aria-owns="`${id}OptionsList`"
      :placeholder="$t(placeholder) + '...'"
      @focus="focus"
      @blur="blur"
      @keydown.space.stop="$emit('space', $event)"
      @keydown.self.up.prevent="$emit('up')"
      @keydown.self.down.prevent="$emit('down')"
      @keydown.self.delete="$emit('delete')"
      @keydown.enter.stop.self="onEnter($event)"
      @keyup.tab="$emit('tab')"
      @keyup.esc="$emit('esc')"
      @input="updateSearch($event.target.value)"
    />
  </div>
</template>

<style scoped>

</style>
