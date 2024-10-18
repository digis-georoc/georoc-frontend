<script setup lang="ts">
const props = defineProps<{
  label: string,
  value: string | number | string[] | number[] | null
}>()


function valueIsArray() {
  return Array.isArray(props.value)
}
</script>

<template>
  <tr>
    <td class="font-semibold pr-2 pb-1">{{ label }}:</td>
    <td>
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
    </td>
  </tr>
</template>
