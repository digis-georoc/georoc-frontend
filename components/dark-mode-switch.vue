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
    :class="isDarkMode ? 'bg-blue-600 dark:bg-zinc-700' : 'bg-zinc-300 dark:bg-zinc-800'"
    class="relative inline-flex h-8 w-16 items-center rounded-full border border-zinc-300 dark:border-zinc-700"
  >
    <span class="sr-only">Switch dark mode</span>
    <span
      :class="isDarkMode ? 'translate-x-8' : 'translate-x-1'"
      class="inline-flex justify-center items-center h-6 w-6 transform rounded-full bg-white dark:bg-zinc-300 transition"
    >
      <Icon :name="isDarkMode ? 'ph:moon-fill' : 'ic:baseline-wb-sunny'" class="text-sm text-zinc-400 dark:text-zinc-600"/>
    </span>
  </Switch>
</template>
