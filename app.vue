<script setup>

const { data } = await useFetch(
  () => `https://api.gs.sub.uni-goettingen.de/v1/monasteries/list?limit=30&offset=0`
)

</script>

<template>
  <div v-for="item in data.list">
    {{item.name}}
  </div>
</template>
