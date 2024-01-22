<script lang="ts" setup>
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
const navigation = [
  { name: 'Database Query', href: '/query', current: false },
  { name: 'Precompiled Files', href: '/precompiled-files', current: false },
  { name: 'Expert Datasets', href: '/expert-datasets', current: false },
]
</script>
<template>
  <Disclosure
      as="nav"
      class="fixed z-[9001] bg-white dark:bg-zinc-800 w-full border-b dark:border-zinc-700"
      v-slot="{ open, close }"
  >
    <BaseFluidContainer>
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center w-full">
          <div class="flex-shrink-0 flex">
            <NuxtLink to="/" class="flex items-center text-stone-800 dark:text-zinc-300 text-sm font-medium">
              <img
                  class="h-8 mr-2"
                  src="~/assets/images/GEOROC_Logo.svg"
                  alt="Your Company"
              />
              GEOROC Database
            </NuxtLink>
          </div>
          <div class="hidden lg:flex ml-auto">
            <div class="flex items-center space-x-4">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                active-class="bg-primary-50 dark:bg-zinc-700 text-primary dark:text-primary-50"
                class="text-stone-800 dark:text-zinc-300 hover:bg-stone-300 dark:hover:bg-stone-400
                dark:hover:bg-opacity-[0.2]
                hover:bg-opacity-[0.4]
                rounded-md px-3 py-2 text-sm font-medium"
              >
                {{ item.name }}
              </NuxtLink>
              <NuxtLink to="/get-started">
                <BaseButton text="Get Started"/>
              </NuxtLink>
              <DarkModeSwitch/>
            </div>
          </div>
        </div>
        <!--          <div class="hidden lg:block">-->
        <!--            <div class="ml-4 flex items-center md:ml-6">-->
        <!--              <button type="button" class="rounded-full bg-stone-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">-->
        <!--                <span class="sr-only">View notifications</span>-->
        <!--                <BellIcon class="h-6 w-6" aria-hidden="true" />-->
        <!--              </button>-->
        <!--            </div>-->
        <!--          </div>-->
        <div class="-mr-2 flex flex-shrink-0 lg:hidden items-center space-x-4">
          <NuxtLink to="/get-started" class="hidden sm:flex">
            <BaseButton text="Get Started"/>
          </NuxtLink>
          <DarkModeSwitch/>
          <!-- Mobile menu button -->
          <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-stone-200
              dark:hover:bg-zinc-700
              focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-zinc-700
              focus:ring-offset-2 focus:ring-offset-stone-100 dark:focus:ring-offset-zinc-600">
            <span class="sr-only">Open main menu</span>
            <Icon name="heroicons:bars-3" v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <Icon name="heroicons:x-mark" v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </BaseFluidContainer>

    <DisclosurePanel class="lg:hidden">
      <div class="flex flex-col items-start space-y-1 px-2 pb-5 pt-2 sm:px-3">
        <div class="absolute w-full h-screen -z-10 left-0 bg-red" @click="close()"></div>
        <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            active-class="bg-primary-50 dark:bg-zinc-700 text-primary dark:text-primary-50"
            class="text-zinc-800 dark:text-zinc-300 hover:bg-stone-300 hover:bg-opacity-[0.4] rounded-md px-3 py-2 my-2 text-base font-medium"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
