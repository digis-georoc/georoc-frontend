<script lang="ts" setup>
  interface Props {
    text?: string,
    display?: 'filled' | 'link' | 'mono' | 'flat' | 'outline' | 'outline-dashed',
    color: 'primary' | 'neutral',
    size?: 'large' | 'tiny' | 'small' | 'normal',
    icon?: string | null,
    iconPosition?: 'left' | 'right' | null,
    rounded?: boolean | null,
    disabled?: boolean,
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    display: 'filled',
    color: 'primary',
    icon: null,
    size: 'normal',
    iconPosition: 'left',
    rounded: null,
    disabled: false,
  })

  let _icon = props.icon
  let _iconPosition = props.iconPosition
  let isIconOnly = false

  if (props.text === '' && _icon !== null) {
    isIconOnly = true
    _iconPosition = null
  }

  let _rounded = false
  if (props.rounded === null && props.text === '') _rounded = true
  if (props.rounded === null && props.text !== '') _rounded = false
  if (props.rounded !== null ) _rounded = props.rounded

  const classes: { [key: string]: boolean } = {}

  if (props.display === 'link') {
    _iconPosition = 'right'
    _icon = 'heroicons:arrow-right-20-solid'
  }

  classes['focus:outline-none focus-visible:ring-4 font-medium flex items-center justify-center transition-colors'] = true

  classes['rounded-md'] = !_rounded
  classes['rounded-full'] = _rounded

  classes['lg:text-lg lg:font-semibold leading-5'] = props.size === 'large'
  classes['py-3 ps-3 pe-5'] = props.size === 'large' && !!(_icon) && _iconPosition === 'left'
  classes['py-3 ps-5 pe-3'] = props.size === 'large' && !!(_icon) && _iconPosition === 'right'
  classes['p-2'] = props.size === 'large' && isIconOnly
  classes['py-3 px-5 lg:py-4 lg:px-6 '] = props.size === 'large' && !_icon

  classes['text-md leading-5'] = props.size === 'normal'
  classes['py-3 ps-3 pe-5'] = props.size === 'normal' && !!(_icon) && _iconPosition === 'left'
  classes['py-3 ps-5 pe-3'] = props.size === 'normal' && !!(_icon) && _iconPosition === 'right'
  classes['p-2'] = props.size === 'normal' && isIconOnly
  classes['py-3 px-5'] = props.size === 'normal' && !_icon

  classes['text-sm'] = props.size === 'small'
  classes['py-1 ps-1.5 pe-2'] = props.size === 'small' && !!(_icon) && _iconPosition === 'left'
  classes['py-1 ps-2 pe-1.5'] = props.size === 'small' && !!(_icon) && _iconPosition === 'right'
  classes['p-1'] = props.size === 'small' && isIconOnly
  classes['py-1 px-3'] = props.size === 'small' && !_icon

  classes['py-1 ps-1 pe-1.5'] = props.size === 'tiny' && !!(_icon) && _iconPosition === 'left'
  classes['py-1 ps-1.5 pe-1'] = props.size === 'tiny' && !!(_icon) && _iconPosition === 'right'
  classes['p-0.5'] = props.size === 'tiny' && isIconOnly
  classes['py-1.5 px-2'] = props.size === 'tiny' && !_icon
  classes['text-xs leading-3'] = props.size === 'tiny'

  classes['focus-visible:ring-primary dark:focus-visible:ring-primary-300 focus-visible:ring-opacity-25 dark:focus-visible:ring-opacity-50'] = props.color === 'primary'
  classes['focus-visible:ring-gray-500 dark:focus-visible:ring-gray-300 focus-visible:ring-opacity-25 dark:focus-visible:ring-opacity-50'] = props.color === 'neutral'

  classes['bg-primary text-white hover:bg-primary-300 ' +
  'dark:bg-primary dark:hover:bg-primary'] = props.display === 'filled' && props.color === 'primary'

  classes[`gray-300 text-gray-600 dark:text-gray-700 hover:bg-gray-400 ` +
  `dark:bg-gray-500 dark:hover:bg-gray-600`] = props.display === 'filled' && props.color === 'neutral'

  classes['bg-none text-primary hover:underline '] = props.display === 'link'

  classes['bg-white text-dark border border-gray-400 dark:border-gray-600 focus:ring-gray-300 hover:bg-gray-100 dark:bg-gray-800'] = props.display === 'mono'

  classes['bg-none text-primary border border-primary-300 hover:bg-primary-50 dark:hover:bg-gray-800'] = (props.display === 'outline'  || props.display === 'outline-dashed') && props.color === 'primary'

  classes['bg-none text-gray-500 border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'] = (props.display === 'outline'  || props.display === 'outline-dashed') && props.color === 'neutral'


  classes['border-dashed'] = props.display === 'outline-dashed'

  classes['bg-transparent hover:bg-primary-50 dark:hover:bg-gray-600 text-primary'] = props.display === 'flat' && props.color === 'primary'

  classes['bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-400'] = props.display === 'flat' && props.color === 'neutral'

  watch(() => props.disabled, value => classes['opacity-[0.6] pointer-events-none'] = value, { immediate: true })
  watch(() => props.icon, value => _icon = value, { immediate: true })
</script>
<template>
  <button type="button" :class="classes" :disabled="disabled">
    <template v-if="_icon && _iconPosition === 'left'">
      <Icon
        :name="_icon"
        class="text-base"
        :class="[{'me-1.5': size === 'normal', 'me-1': size !== 'normal'}]" />
    </template>
    <template v-if="isIconOnly"><Icon :name="_icon" class="mt-[1px]" />
    </template>
    <template v-else>{{ text }}</template>
    <template v-if="_icon && _iconPosition === 'right'">
      <Icon :name="_icon" class="text-base ms-1" />
    </template>
  </button>
</template>
