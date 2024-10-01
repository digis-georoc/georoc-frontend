<script setup lang="ts">
  import { Switch } from "@headlessui/vue"
  const uiStore = useUiStore();

  type Theme = 'light' | 'dark'
  const LOCAL_STORAGE_THEME_KEY = 'theme'

  const isDarkMode = ref(false)
  const setTheme = (newTheme: Theme) => {
    const htmlEl = document.documentElement
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    uiStore.theme = newTheme
    newTheme === 'dark'
      ? htmlEl.classList.add('dark')
      : htmlEl.classList.remove('dark')
  }
  onMounted(() => {
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme


    if (themeFromLocalStorage) {
      setTheme(themeFromLocalStorage)
      isDarkMode.value = themeFromLocalStorage === 'dark';
    } else {
      setTheme(isDarkModePreferred ? 'dark' : 'light')
      isDarkMode.value = isDarkModePreferred;
    }
  })

  watch(() => isDarkMode.value, (selected) => {
    setTheme(selected ? 'dark' : 'light')
  })
</script>
<template>
  <Switch
    v-model="isDarkMode"
    :class="isDarkMode ? 'bg-gray-400 dark:bg-gray-700' : 'bg-gray-300 dark:bg-gray-800'"
    class="relative inline-flex h-7 w-[56px] items-center rounded-full border border-gray-300 dark:border-gray-700"
  >
    <span class="sr-only">Switch dark mode</span>
    <span
      :class="isDarkMode ? 'translate-x-[29px]' : 'translate-x-0'"
      class="inline-flex justify-center items-center h-6 w-6 transform rounded-full bg-white dark:bg-gray-300 transition"
    >
      <Icon :name="isDarkMode ? 'ph:moon-fill' : 'ic:baseline-wb-sunny'" class="text-sm text-gray-400 dark:text-gray-600"/>
    </span>
  </Switch>
</template>
