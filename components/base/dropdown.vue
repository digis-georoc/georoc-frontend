<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      as="button"
      :class="[
        'inline-flex w-full justify-center items-center bg-primary-50 dark:bg-zinc-700 dark:bg-inherit rounded-md',
        { 'py-2 px-4': size === 'normal'},
        { 'py-4 px-6': size === 'large'},
        'font-medium select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-300 border-2 border-transparent hover:border-primary',
      ]"
    >
      {{ buttontext }}
      <Icon name="pepicons-pop:angle-down" class="ml-3 text-base translate-y-[2px]"></Icon>
    </MenuButton>
    <MenuItems
      :class="[
        'absolute mt-2 p-3 origin-top-left bg-white border dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md shadow-lg ring-1 ring-black/5',
        'focus:outline-none z-[9999] overflow-y-scroll max-h-96 max-w-[50vw] md:left-[50%] lg:left-0 md:translate-x-[-50%] lg:translate-x-0',
      ]"
    >
      <MenuItem
          v-slot="{ active, disabled }"
          v-for="link in links"
          :disabled="link.isCurrent"
      >
        <a
            :href="link.href"
            :class="[
              'flex whitespace-nowrap w-full items-center rounded-md p-3',
              active ? 'bg-primary text-white' : '',
              disabled ? 'bg-primary-50 dark:bg-zinc-700' : '',
            ]"
        >
          {{ link.label }}
        </a>
      </MenuItem>
    </MenuItems>
  </Menu>
  <!--
  <div id="dropdown_menu" class="relative inline-block text-left">
    <button :class="[
      'inline-flex justify-center items-center space-x-2 bg-primary-50 dark:bg-zinc-700 rounded-md px-2 py-2',
      'text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 border-2 border-transparent hover:border-primary'

    ]" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
      <Icon name="pepicons-pop:angle-down" class="ml-1 text-base"></Icon>
      <div>{{ buttontext }}</div>
    </button>
    <Menu ref="menu" id="overlay_menu" :model="links" :popup="true" :autoZIndex="false" :baseZIndex="9999" :unstyled="true" appendTo="#dropdown_menu" :pt="{
      root: {
        class: 'absolute top-0 left-0 mt-12 bg-white dark:bg-zinc-800 dark:text-white rounded-md shadow-lg max-h-96 overflow-y-scroll',
        style: {top: '0px !important', left: '0px !important', transformOrigin: 'top !important'}
      },
      menuItem: {
        class: ''
      },
      content: ({props, state, context}) => ({
        class: ['p-2 rounded-md hover:bg-primary hover:text-white', context.focused ? 'bg-primary text-white' : undefined, context.item.disabled ? 'bg-primary-50 text-black' : undefined]
      })
    }">
    <template #item="{ item, props }">
      <a :href="item.href" v-bind="props.action" class="text-sm" :disabled="item.isCurrent">{{ item.label }}</a>
    </template>
    </Menu>
  </div>
--></template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
//import Menu from 'primevue/menu';
//const menu = ref();
const props = withDefaults(
  defineProps<{
    links: { href: string; label: string; isCurrent?: boolean }[]
    buttontext?: string
    size?: 'small' | 'normal' | 'large'
  }>(),
  {
    links: () => [],
    buttontext: 'Please select.',
    size: 'normal'
  },
)
//toggle menu and stop teleport
/*
  const toggle = async (event: any) => {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    await menu.value.toggle(event);
    window.scrollTo(0, scrollPos);
  };
  */
</script>
