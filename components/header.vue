<script lang="ts" setup>
import Menubar from 'primevue/menubar'
import PanelMenu from 'primevue/panelmenu'

const route = useRoute()

const externalIcon = 'prime:external-link'
const showSidebar = ref(false)
const items = ref([
  {
    label: 'Get Started',
    route: '/get-started'
  },
  {
    label: 'Access Data',
    items: [
      {
        label: 'Database Query',
        route: '/query',
      },
      {
        label: 'Precompiled Files',
        route: '/precompiled-files',
      },
      {
        label: 'Expert Datasets',
        route: '/expert-datasets',
      },
    ],
  },
  {
    label: 'Terms of Use',
    route: '/terms-of-use',
  },
  {
    label: 'Submit Data',
    route: '/submit-data',
  },
  {
    label: 'Project Info',
    items: [
      {
        label: "History of the Database",
        route: '/history-of-the-database',
      },
      {
        label: 'What\'s New',
        route: '/whats-new',
      },
      {
        label: "How to contribute",
        route: '/how-to-contribute',
      },
    ],
  },
])
const mobileItems = ref(
  Array.prototype.concat(items.value, [
    {
      label: 'Legal Notice',
      route: '/legal-notice',
    },
    {
      label: 'Privacy Statement',
      href: 'https://www.uni-goettingen.de/en/439479.html',
      icon: externalIcon,
    },
  ]),
)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>
<template>
  <div
    class="fixed z-[9001] bg-white dark:bg-gray-800 w-full border-b dark:border-gray-700"
  >
    <BaseFluidContainer>
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center w-full">
          <div class="flex-shrink-0 flex">
            <NuxtLink
              to="/"
              class="flex items-center text-gray-800 dark:text-gray-300 text-sm font-medium"
            >
              <Logo class="mr-2" />
              <span class="whitespace-nowrap">GEOROC Database</span>
            </NuxtLink>
          </div>
          <Menubar
            :model="items"
            :unstyled="true"
            :pt="{
              root: {
                class:
                  'lg:flex lg:flex-wrap hidden ml-auto lg:mr-2 items-center mt-1',
              },
              menu: {
                class: 'flex py-2 rounded-md space-x-4',
              },
              menuItem: {
                class: 'cursor-pointer flex items-center relative',
              },
              content: ({ context }) => ({
                class: [
                  {
                    'bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-50':
                      (route.path.startsWith(context.item.item.route) || context.item.items && context.item.items.some(
                        (item: any) =>
                          item.item.route?.length > 1 &&
                          route.path.startsWith(item.item.route),
                      )),
                  },
                  'rounded-md p-2 text-sm font-medium',
                  { 'mb-1': !context.item.items || context.item.items.length === 0 },
                  !context.active ? 'hover:text-gray-800 hover:dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-400' : ''
                ],
              }),
              action: {
                class: 'whitespace-nowrap',
              },
              submenu: {
                class:
                  'bg-white dark:bg-gray-800 p-2 rounded-md absolute top-[108%] border dark:border-gray-600',
              },
              button: {
                class: 'hidden',
              },
            }"
          >
            <template #item="{ item, props, hasSubmenu }">
                <NuxtLink
                  v-if="item.route"
                  :to="item.route"
                  v-bind="props.action"
                >
                  {{ item.label }}
                </NuxtLink>
                <NuxtLink
                  v-else-if="item.href"
                  :href="item.href"
                  :external="true"
                  target="_blank"
                  v-bind="props.action"
                >
                  <span v-if="item.icon" class="mr-2"
                    ><Icon :name="item.icon"></Icon
                  ></span>
                  <span>{{ item.label }}</span>
                </NuxtLink>
                <NuxtLink v-else v-bind="props.action">
                  <span v-if="item.icon" class="mr-2"
                    ><Icon :name="item.icon"></Icon
                  ></span>
                  <span>{{ item.label }}</span>
                  <span v-if="hasSubmenu">
                    <Icon
                      name="material-symbols-light:keyboard-arrow-down"
                      class="h-6 w-6"
                    />
                  </span>
                </NuxtLink>
            </template>
          </Menubar>

          <DarkModeSwitch class="ml-auto lg:ml-2" />
          <!--Mobile-->
          <div class="flex lg:hidden ml-2">
            <button class="p-2 rounded-md" @click="toggleSidebar">
              <Icon
                v-if="showSidebar"
                name="heroicons:x-mark"
                class="w-6 h-6"
              ></Icon>
              <Icon v-else name="heroicons:bars-3" class="w-6 h-6"></Icon>
            </button>
            <aside
              v-if="showSidebar"
              class="lg:hidden w-full sm:w-[50%] h-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-md top-16 right-0 fixed z-[9001] transition-transform translate-x-0"
            >
              <PanelMenu
                :model="mobileItems"
                :unstyled="true"
                :pt="{
                  root: {
                    class: 'flex flex-col',
                  },
                  headerContent: ({ context }) => ({
                    class: [
                      'flex flex-row px-2 shadow-sm px-4 py-2 text-normal font-medium',
                      'hover:bg-gray-300 hover:dark:bg-gray-400 hover:dark:bg-opacity-[0.2] hover:bg-opacity-[0.4] hover:text-gray-800 hover:dark:text-gray-300',
                      {
                        'text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-400 dark:bg-opacity-[0.2] bg-opacity-[0.4]':
                          context.focused,
                      },
                      {
                        'bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-50':
                          (!context.focused &&
                            mobileItems[context.index]?.items &&
                            mobileItems[context.index].items.some(
                              (item: any) =>
                                item.route?.length > 1 &&
                                route.path.startsWith(item.route),
                            )) ||
                          (mobileItems[context.index]?.route &&
                            mobileItems[context.index].route?.length > 1 &&
                            route.path.startsWith(
                              mobileItems[context.index].route,
                            )),
                      },
                    ],
                  }),
                  content: ({ context }) => ({
                    class: [
                      'rounded-md px-4 py-1 text-normal font-medium',
                      'hover:bg-gray-300 hover:dark:bg-gray-400 hover:dark:bg-opacity-[0.2] hover:bg-opacity-[0.4] hover:text-gray-800 hover:dark:text-gray-300',
                      {
                        'bg-gray-300 dark:bg-gray-400 dark:bg-opacity-[0.2] bg-opacity-[0.4]':
                          context.focused,
                      },
                      {
                        'bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-50':
                          !context.focused &&
                          context.item.item.route &&
                          context.item.item.route?.length > 1 &&
                          route.path.startsWith(context.item.item.route),
                      },
                    ],
                  }),
                  menu: {
                    class: 'm-2',
                  },
                }"
              >
                <template #item="{ item, hasSubmenu, props, active }">
                  <div class="w-full">
                    <NuxtLink
                      v-if="item.route"
                      :to="item.route"
                      @click="toggleSidebar"
                      >{{ item.label }}
                    </NuxtLink>

                    <NuxtLink
                      v-else-if="item.href"
                      :href="item.href"
                      external
                      target="_blank"
                    >
                      <span v-if="item.icon" class="mr-2"
                        ><Icon :name="item.icon"></Icon
                      ></span>
                      <span>{{ item.label }}</span>
                    </NuxtLink>

                    <NuxtLink
                      v-else
                      v-bind="props.action"
                      class="flex justify-between"
                    >
                      <span v-if="item.icon" class="mr-2"
                        ><Icon :name="item.icon"></Icon
                      ></span>
                      <span>{{ item.label }}</span>
                      <span v-if="hasSubmenu">
                        <Icon
                          v-if="active"
                          name="material-symbols-light:keyboard-arrow-up"
                          class="h-6 w-6"
                        ></Icon>
                        <Icon
                          v-else
                          name="material-symbols-light:keyboard-arrow-down"
                          class="h-6 w-6"
                        />
                      </span>
                    </NuxtLink>
                  </div>
                </template>
              </PanelMenu>
            </aside>

            <div
              aria-hidden="true"
              :class="[
                'fixed top-16 right-0 bg-black opacity-0',
                { 'left-0 bottom-0 opacity-40 transition-colors': showSidebar },
              ]"
            ></div>
          </div>
        </div>
      </div>
    </BaseFluidContainer>
  </div>
</template>
