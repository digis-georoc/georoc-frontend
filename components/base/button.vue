<script lang="ts" setup>
  interface Props {
    text: string,
    display?: string,
    icon?: string | null,
    iconPosition?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    display: 'filled',
    icon: null,
    iconPosition: 'left'
  })


  let _icon = props.icon
  let _iconPosition = props.iconPosition

  let classes = 'rounded-lg py-2.5 focus:outline-none focus:ring-4 ' +
      'text-sm font-medium flex items-center leading-2 '

  if (_icon && _iconPosition === 'left') classes += 'ps-3 pe-5 '
  else if (_icon && _iconPosition === 'right') classes += 'ps-5 pe-3 '
  else classes += 'px-5 '

  if (props.display === 'filled') {
    classes += 'focus:ring-green-300 bg-primary text-white hover:bg-emerald-700 ' +
        'dark:bg-primary dark:hover:bg-primary dark:focus:ring-green-800'
  } else if (props.display === 'link') {
    classes += 'focus:ring-green-300 bg-none text-primary hover:underline ' +
        'dark:focus:ring-green-800'
    _iconPosition = 'right';
    _icon = 'heroicons:arrow-right-20-solid'
  } else if (props.display === 'mono') {
    classes += 'bg-white text-dark border-2 border-zinc-400 focus:ring-zinc-300 ' +
      'focus:ring-opacity-50 hover:bg-zinc-100 ' +
      'dark:bg-zinc-800'
  }

</script>
<template>
  <button type="button" :class="classes">
    <template v-if="_icon && _iconPosition === 'left'">
      <Icon :name="_icon" class="text-base me-1 mt-[1px]" />
    </template>
    {{ text }}
    <template v-if="_icon && _iconPosition === 'right'">
      <Icon :name="_icon" class="text-base ms-1" />
    </template>
  </button>
</template>
