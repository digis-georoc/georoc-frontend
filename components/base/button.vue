<script lang="ts" setup>
  interface Props {
    text?: string,
    display?: 'filled' | 'link' | 'mono' | 'flat',
    size?: 'small' | 'normal',
    icon?: string | null,
    iconPosition?: 'left' | 'right' | null
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    display: 'filled',
    icon: null,
    size: 'normal',
    iconPosition: 'left'
  })

  let _icon = props.icon
  let _iconPosition = props.iconPosition
  let isIconOnly = false

  if (props.text === '' && _icon !== null) {
    isIconOnly = true
    _iconPosition = null
  }

  const classes: { [key: string]: boolean } = {}

  if (props.display === 'link') {
    _iconPosition = 'right'
    _icon = 'heroicons:arrow-right-20-solid'
  }

  classes['focus:outline-none focus:ring-4 text-sm font-medium flex items-center leading-2'] = true

  classes['rounded-lg'] = !isIconOnly
  classes['rounded-full'] = isIconOnly


  classes['py-2.5 ps-3 pe-5'] = props.size === 'normal' && !!(_icon) && _iconPosition === 'left'
  classes['py-2.5 ps-5 pe-3'] = props.size === 'normal' && !!(_icon) && _iconPosition === 'right'
  classes['p-2'] = props.size === 'normal' && isIconOnly
  classes['py-2.5 px-5'] = props.size === 'normal' && !_icon

  classes['py-1.5 ps-2 pe-3'] = props.size === 'small' && !!(_icon) && _iconPosition === 'left'
  classes['py-1.5 ps-3 pe-2'] = props.size === 'small' && !!(_icon) && _iconPosition === 'right'
  classes['p-1'] = props.size === 'small' && isIconOnly
  classes['py-1.5 px-3'] = props.size === 'small' && !_icon

  classes['focus:ring-primary focus:ring-opacity-25 dark:focus:ring-primary-300 dark:focus:ring-opacity-50 bg-primary text-white hover:bg-emerald-700 ' +
  'dark:bg-primary dark:hover:bg-primary dark:focus:ring-green-800'] = props.display === 'filled'

  classes['focus:ring-primary focus:ring-opacity-25 dark:focus:ring-primary-300 dark:focus:ring-opacity-50 bg-none text-primary hover:underline ' +
  'dark:focus:ring-green-800'] = props.display === 'link'

  classes['bg-white text-dark border-2 border-zinc-400 focus:ring-zinc-300 focus:ring-opacity-50 hover:bg-zinc-100 dark:bg-zinc-800'] = props.display === 'mono'

  classes['bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-600 ' +
  'focus:ring-primary dark:focus:ring-primary-300 dark:focus:ring-opacity-50 focus:ring-opacity-25'] = props.display === 'flat'

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
