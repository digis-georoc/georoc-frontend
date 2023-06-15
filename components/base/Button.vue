<script lang="ts" setup>
  interface Props {
    text: string,
    display: string
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    display: 'filled'
  })

  let classes = '';
  let iconRight = '';


  if (props.display === 'filled') {
    classes = 'rounded-lg px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300 bg-primary text-white hover:bg-emerald-700 font-medium\n' +
        'text-sm dark:bg-primary dark:hover:bg-primary dark:focus:ring-green-800'
  } else if (props.display === 'link') {
    classes = 'rounded-lg pr-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300 bg-none text-primary hover:underline font-medium\n' +
        'text-sm dark:focus:ring-green-800'
    iconRight = 'heroicons:arrow-right-20-solid'
  }

</script>
<template>
  <button
      type="button"
      :class="classes">
    {{ text }}
    <template v-if="iconRight">
      <Icon :name="iconRight" />
    </template>
  </button>
</template>
