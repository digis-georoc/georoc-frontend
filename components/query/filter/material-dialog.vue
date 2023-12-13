<script setup lang="ts">
const emit = defineEmits(['select'])

const queryStore = useQueryStore()
const hideDialogStorageKey = 'hide-material-dialog'
const isOpen = ref(window.localStorage.getItem(hideDialogStorageKey) === null)

const stored = window.localStorage.getItem(queryStore.getCachingKey(QueryKey.Material))
const initial = stored !== null ? stored : MaterialKeys.WRGL
const selected = ref(isOpen.value ? initial : null)

const dontShowAgain = ref(false)

function handleContinue() {
  isOpen.value = false
}

watch(() => isOpen.value, (value) => {
  if (value === true) return

  if (dontShowAgain.value) window.localStorage.setItem(hideDialogStorageKey, '')
  else window.localStorage.removeItem(hideDialogStorageKey)

  emit('select', selected.value)
})
</script>

<template>
  <BaseDialog :title="$t('please_select')" v-model="isOpen" :closable="false">
    <QueryFilterMaterial v-model="selected" />
    <div class="flex justify-between items-center mt-4">
      <BaseCheckbox label="Don't show again" v-model="dontShowAgain" />
      <BaseButton text="Continue" @click="handleContinue" />
    </div>
  </BaseDialog>
</template>
