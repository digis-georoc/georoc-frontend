<template>
  <section
    id="smallFooter"
    class="bg-white dark:bg-zinc-800 border-t dark:border-zinc-700"
  >
    <BaseContainer
      class="flex flex-col sm:flex-row justify-center items-center py-4 text-sm"
    >
      <div class="flex flex-row justify-center items-center">
        <p><BaseNuxtLink to="/legal-notice">Legal Notice</BaseNuxtLink></p>
        <p class="px-2">-</p>
        <p>
          <a
            href="https://www.uni-goettingen.de/en/439479.html"
            target="_blank"
            class="hover:border-b-primary border-transparent border-b-2"
            >Privacy Statement</a
          >
        </p>
      </div>
      <ClientOnly>
        <p class="flex sm:flex-row justify center items-center">
          <LastDatabaseUpdate>
            <template #before>
              <span class="px-2 hidden sm:inline">-</span>
              <span class="pr-2">Last Database Update:</span>
            </template>
          </LastDatabaseUpdate>
        </p>
      </ClientOnly>
    </BaseContainer>
  </section>
</template>
<script setup lang="ts"></script>
