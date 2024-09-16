<template>
  <PageContainer>
    <PageHead headline="Get Started"/>
    <p class="mb-6">GEOROC data are accessible in different ways:</p>
    <ol class="list-decimal pl-6 space-y-2">
      <li>
        Select according to specific geographic region to be selected graphically from a global map, optionally followed by additional filter options
      </li>
      <li>
        Select from world-wide samples (or from selected samples according to 1.) using filters:
        <ul class="pl-4 md:w-[500px]">
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Geographic location</span><span class="w-1/2">e.g. “Hawaii”</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Geological setting</span><span class="w-1/2">e.g. “oceanic subduction zone”</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Rock type</span><span class="w-1/2">e.g. “alkali basalt”</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Mineral type</span><span class="w-1/2">e.g. “olivine”</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Inclusion type</span><span class="w-1/2">glass</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Chemical composition</span><span class="w-1/2">major- and trace elements</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Isotopic composition</span><span class="w-1/2">radiogenic and stable isotopes</span>
          </li>
          <li class="flex">
            <span class="mr-4">-</span><span class="w-1/2">Age</span><span class="w-1/2">numerical age, geological age</span>
          </li>
        </ul>
      </li>
    </ol>
    <p class="mt-6">See here: <BaseNuxtLink to="/how-to-filter" class="text-primary">How to filter</BaseNuxtLink></p>
  </PageContainer>
</template>
<script setup lang="ts">
</script>
