<script lang="ts" setup>
  interface Props {
    text: string,
    display?: 'filled' | 'link' | 'mono' | 'flat',
    icon?: string | null,
    iconPosition?: string | null
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    display: 'filled',
    icon: null,
    iconPosition: 'left'
  })


  let _icon = props.icon
  let _iconPosition = props.iconPosition
  let isIconOnly = false

  if (props.text === '' && _icon !== null) {
    isIconOnly = true
    _iconPosition = null
  }

  let classes = 'focus:outline-none focus:ring-4 ' +
      'text-sm font-medium flex items-center leading-2 '

  if (_icon && _iconPosition === 'left') classes += 'rounded-lg py-2.5 ps-3 pe-5 '
  else if (_icon && _iconPosition === 'right') classes += 'rounded-lg py-2.5 ps-5 pe-3 '
  else if (isIconOnly) classes += 'rounded-full p-2 '
  else classes += 'rounded-lg py-2.5 px-5 '

  if (props.display === 'filled') {
    classes += 'focus:ring-primary focus:ring-opacity-25 dark:focus:ring-primary-300 dark:focus:ring-opacity-50 bg-primary text-white hover:bg-emerald-700 ' +
        'dark:bg-primary dark:hover:bg-primary dark:focus:ring-green-800'
  } else if (props.display === 'link') {
    classes += 'focus:ring-primary focus:ring-opacity-25 dark:focus:ring-primary-300 dark:focus:ring-opacity-50 bg-none text-primary hover:underline ' +
        'dark:focus:ring-green-800'
    _iconPosition = 'right';
    _icon = 'heroicons:arrow-right-20-solid'
  } else if (props.display === 'mono') {
    classes += 'bg-white text-dark border-2 border-zinc-400 focus:ring-zinc-300 ' +
      'focus:ring-opacity-50 hover:bg-zinc-100 ' +
      'dark:bg-zinc-800'
  } else if (props.display === 'flat') {
    classes += 'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-600 ' +
        'focus:ring-primary dark:focus:ring-primary-300 dark:focus:ring-opacity-50 focus:ring-opacity-25'
  }

</script>
<template>
  <button type="button" :class="classes">
    <template v-if="_icon && _iconPosition === 'left'">
      <Icon :name="_icon" class="text-base me-1 mt-[1px]" />
    </template>
    <template v-if="isIconOnly"><Icon :name="_icon" class="text-xl mt-[1px]" />
    </template>
    <template v-else>{{ text }}</template>
    <template v-if="_icon && _iconPosition === 'right'">
      <Icon :name="_icon" class="text-base ms-1" />
    </template>
  </button>
</template>
