<script setup lang="ts">
const props = defineProps<{
  label?: string,
  value: string | number | string[] | number[] | null
}>()


function valueIsArray() {
  return Array.isArray(props.value)
}
</script>

<template>
  <div class="flex flex-col mb-4">
    <h3 v-if="label" class="font-semibold">{{ label }}</h3>
    <div class="flex">
      <template v-if="valueIsArray()">
        <template v-if="value.length > 0">
          <template v-for="(item, i) in value">
            {{ item }}<template v-if="value.length > 1 && i < (value.length - 1)">,&nbsp;</template>
          </template>
        </template>
        <template v-else>
          {{ $t('no_value_given') }}
        </template>
      </template>
      <template v-else-if="value !== null">
        <p>{{ value }}</p>
      </template>
      <template v-else>
        {{ $t('no_value_given') }}
      </template>
    </div>
  </div>
</template>
