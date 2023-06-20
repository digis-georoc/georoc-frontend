<template>
  <footer class="bg-white dark:bg-zinc-800 border-t dark:border-zinc-700">
    <BaseContainer class="flex flex-wrap-reverse flex-row-reverse sm:flex-row lg:flex-wrap py-8 items-end lg:items-start">
      <div class="w-full lg:w-1/3 flex lg:flex-col mt-12 lg:mt-0">
        <div class="lg:mb-10 w-1/2 lg:w-auto">
          <a href="/">
            <img class="h-24" src="/images/DIGIS_logo_transparent.png">
          </a>
          <p class="mt-2">Digital Geochemistry Infrastructure<br>for GEOROC 2.0</p>
        </div>
        <div class="flex flex-col">
          <a href="/" class="mb-8">
            <img class="h-8 dark:hidden" src="/images/GOE_Logo_Quer_Farbe.svg">
            <img class="h-8 hidden dark:inline" src="/images/GOE_Logo_Quer_Farbe_NEG.svg">
          </a>
          <a href="/">
            <img class="h-7 dark:hidden" src="/images/dfg_logo_schriftzug.svg">
            <img class="h-7 hidden dark:inline" src="/images/dfg_logo_schriftzug_weiss.svg">

          </a>
        </div>
      </div>
      <div class="sm:flex-1 w-full sm:w-auto mt-12 sm:mt-0">
        <h4 class="text-xl font-bold mb-4">Useful links</h4>
        <ul class="space-y-1">
          <li><BaseNuxtLink to="/imprint">Imprint</BaseNuxtLink></li>
          <li><BaseNuxtLink to="/privacy-statement">Privacy Statement</BaseNuxtLink></li>
          <li><BaseNuxtLink to="/legal-notice">Legal Notice</BaseNuxtLink></li>
          <li>Useful link</li>
          <li>Useful link</li>
        </ul>
      </div>
      <div class="sm:flex-1 w-full sm:w-auto">
        <h4 class="text-xl font-bold mb-4">Contact</h4>
        <div class="space-y-1">
          <p>DIGIS</p>
          <p>Geoscience Centre Göttingen</p>
          <p>Geochemistry and Isotop Geology</p>
          <p>Goldschmidtstr. 1</p>
          <p>D-37077 Göttingen</p>
          <p>Email: digis-info[at]uni-goettingen.de</p>
        </div>
      </div>
    </BaseContainer>
    <BaseContainer class="flex justify-center items-center py-4 border-t dark:border-zinc-700">
      Copyright + Version
    </BaseContainer>
  </footer>
</template>
<script setup lang="ts">
</script>
