<script setup>
const appConfig = useRuntimeConfig()
const apiToken = appConfig.public.apiToken;
const baseURL = 'https://api-test.georoc.eu/api/v1';

const { data } = await useFetch(
  () => `${baseURL}/queries/citations`,
  {
    headers: {
      'DIGIS-API-ACCESSKEY': apiToken
    }
  }
)

</script>

<template>
  <div v-for="item in data.Data">
    {{item.Title}}
  </div>
</template>
