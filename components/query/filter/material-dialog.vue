<script setup lang="ts">
const emit = defineEmits(['select'])

const isOpen = ref(window.localStorage.getItem('hide-material-dialog') === null)

const stored = window.localStorage.getItem('material-filter')
const initial = stored !== null ? stored : 'WR'
const selected = ref(isOpen.value ? initial : null)

const dontShowAgain = ref(false)

function handleContinue() {
  isOpen.value = false
}

watch(() => isOpen.value, (value) => {
  if (value === true) return

  if (dontShowAgain.value) window.localStorage.setItem('hide-material-dialog', '')
  else window.localStorage.removeItem('hide-material-dialog')

  emit('select', selected.value)
})

</script>

<template>
  <BaseDialog title="Please select a material type" v-model="isOpen">
    <QueryFilterMaterial v-model="selected" />
    <div class="flex justify-between items-center mt-4">
      <BaseCheckbox label="Don't show again" v-model="dontShowAgain" />
      <BaseButton text="Continue" @click="handleContinue" />
    </div>
  </BaseDialog>
</template>
