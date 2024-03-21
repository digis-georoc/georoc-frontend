<template>
  <footer class="bg-white dark:bg-zinc-800 border-t dark:border-zinc-700">
    <BaseContainer
      class="flex flex-wrap-reverse flex-row-reverse sm:flex-row lg:flex-wrap py-8 items-end lg:items-start"
    >
      <div class="w-full lg:w-1/3 flex lg:flex-col mt-12 lg:mt-0">
        <div class="lg:mb-10 w-1/2 lg:w-auto flex flex-col">
          <a
            href="https://www.uni-goettingen.de/de/643369.html"
            target="_blank"
            class="self-start"
          >
            <img class="h-24" src="/images/DIGIS_logo_transparent.png" />
          </a>
          <a
            href="https://www.uni-goettingen.de/de/643369.html"
            target="_blank"
            class="self-start"
          >
            <p class="mt-2">
              Digital Geochemistry Infrastructure<br />for GEOROC 2.0
            </p>
          </a>
        </div>
        <div class="flex flex-col">
          <a
            href="https://www.uni-goettingen.de/"
            target="_blank"
            class="mb-8 self-start"
          >
            <img
              class="h-8 dark:hidden"
              src="/images/GOE_Logo_Quer_Farbe.svg"
            />
            <img
              class="h-8 hidden dark:inline"
              src="/images/GOE_Logo_Quer_Farbe_NEG.svg"
            />
          </a>
          <a href="https://www.dfg.de/" target="_blank" class="self-start">
            <img
              class="h-7 dark:hidden"
              src="/images/dfg_logo_schriftzug.svg"
            />
            <img
              class="h-7 hidden dark:inline"
              src="/images/dfg_logo_schriftzug_weiss.svg"
            />
          </a>
        </div>
      </div>
      <div class="sm:flex-1 w-full sm:w-auto mt-12 sm:mt-0">
        <h4 class="text-xl font-bold mb-4">Useful links</h4>
        <ul class="space-y-1">
          <li><BaseNuxtLink to="/how-to-cite">How to cite</BaseNuxtLink></li>
          <li>Useful link</li>
          <li>Useful link</li>
          <li>Useful link</li>
          <li>Useful link</li>
        </ul>
      </div>
      <div class="sm:flex-1 w-full sm:w-auto">
        <h4 class="text-xl font-bold mb-4">Contact</h4>
        <div class="space-y-1">
          <p>
            <a
              href="https://www.uni-goettingen.de/de/643369.html"
              target="_blank"
              class="hover:border-b-primary border-transparent border-b-2"
              >DIGIS</a
            >
          </p>
          <p>Geoscience Centre Göttingen</p>
          <p>Geochemistry and Isotope Geology</p>
          <p>Goldschmidtstr. 1</p>
          <p>D-37077 Göttingen</p>
          <p>
            Email:
            <a
              href="mailto:digis-info@uni-goettingen.de"
              class="hover:border-b-primary border-transparent border-b-2"
              >digis-info@uni-goettingen.de</a
            >
          </p>
          <p>
            <a
              href="https://twitter.com/DIGISgeo"
              target="_blank"
              class="border-b-2 border-transparent hover:border-primary"
              >Follow @DIGISGeo on
              <Icon
                :name="'line-md:twitter-x'"
                class="mb-1"
                alt="X / Twitter"
              ></Icon
            ></a>
          </p>
        </div>
      </div>
    </BaseContainer>
    <SmallFooter></SmallFooter>
  </footer>
</template>
<script setup lang="ts"></script>
