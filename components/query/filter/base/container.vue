<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  dialogTitle?: string,
  loading?: boolean,
  hasSelected?: boolean
}>(), {
  title: '',
  dialogTitle: '',
  loading: false,
  hasSelected: false
})

const emit = defineEmits(['submit', 'reset', 'open'])

const isOpen = ref(false)

watch(() => props.hasSelected, (value) => {
  console.log(value)
})

function onSubmit() {
  isOpen.value = false
  emit('submit')
}

function onReset() {
  emit('reset')
}

function openDialog() {
  emit('open')
  isOpen.value = true
}

const collapsed = ref(false)

</script>
<template>
  <QueryFiltersCard :title="title" class="mx-2 mt-2">
    <template #header-right>
      <BaseButton
        v-if="hasSelected"
        size="small"
        display="flat"
        class="ml-auto mr-2 self-center text-zinc-400"
        @click="onReset"
        text="Reset" />
      <BaseButton
        v-if="hasSelected"
        class="self-start"
        icon="ic:twotone-mode-edit"
        icon-position="left"
        display="outline"
        @click="openDialog"
        :text="$t('Edit')"
        size="small" />
    </template>
    <template #default>
      <slot name="selected"/>
      <BaseButton
          v-if="!hasSelected"
          class="my-4 self-start mx-auto text-primary-300 border-primary-300"
          icon="material-symbols:add-rounded"
          icon-position="left"
          display="outline-dashed"
          @click="openDialog"
          :text="$t('Add New Filter')"
          size="small"
      >
      </BaseButton>
    </template>
  </QueryFiltersCard>
  <BaseDialog :title="dialogTitle" v-model="isOpen">
    <NuxtErrorBoundary>
    <slot name="options"/>
      <template #error="{ error }">
        <div class="flex flex-col justify-center items-center h-[400px]">
          <span v-if="error.value.statusCode === 500" class="text-zinc-500 dark:text-zinc-400 font-semibold mb-2">
            {{ $t('server_error') }}:
          </span>
          <p class="text-zinc-400 dark:text-zinc-500">{{ error?.value?.statusMessage ?? $t('oh_no_something_went_wrong') }}</p>
        </div>
      </template>
    </NuxtErrorBoundary>
    <BaseButton class="ms-auto mt-2" @click="onSubmit" :text="$t('confirm')"></BaseButton>
  </BaseDialog>
</template>
