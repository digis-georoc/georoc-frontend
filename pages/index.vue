<template>
  <div>
    <section class="relative h-[80vh]">
      <div class="absolute top-0 h-[80vh] inset-x-0 -z-10 overflow-hidden" aria-hidden="true">
        <img src="/images/4_GEOROC.png" alt="Hot Volcano" class="h-full w-full object-cover">
      </div>
      <BaseContainer class="h-full flex items-center">
        <div class="mt-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">The GEOROC Database</h1>
          <p class="mt-6 text-lg leading-8 text-gray-200">Geochemistry of Rocks of the Oceans and Continents</p>
          <div class="mt-10 flex items-center gap-x-6">
            <a href="#" class="rounded-md bg-primary px-4 py-2.5 text-base font-semibold text-white shadow-sm
            hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600">Start Exploring</a>
            <a href="#" class="text-sm font-semibold leading-6 text-zinc-300">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </BaseContainer>
    </section>
    <section class="py-5">
      <BaseContainer>
        <div class="flex w-full text-stone-700 dark:text-zinc-400">
          <div class="border-l border-r border-stone-300 dark:border-zinc-700 flex flex-col flex-1 text-center p-4">
            <span class="text-2xl">21,370</span>
            <span>papers</span>
          </div>
          <div class="border-r border-stone-300 dark:border-zinc-700 flex flex-col flex-1 text-center p-4">
            <span class="text-2xl">640,100</span>
            <span>samples</span>
          </div>
          <div class="border-r border-stone-300 dark:border-zinc-700 flex flex-col flex-1 text-center p-4">
            <span class="text-2xl">62,402,280</span>
            <span>analyzes</span>
          </div>
          <div class="border-r border-stone-300 dark:border-zinc-700 flex flex-col flex-1 text-center p-4">
            <span class="text-2xl">35,166,090</span>
            <span>single data values</span>
          </div>
        </div>
      </BaseContainer>
    </section>
    <section class="bg-white dark:bg-zinc-800 mb-6">
      <BaseContainer class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto max-w-3xl lg:text-center">
            <h3 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-300 sm:text-4xl">
              Compiled from published, peer-reviewed literature
            </h3>
            <p class="mt-6 text-lg leading-8 text-stone-600 dark:text-zinc-400">
              A comprehensive collection of published analyses of igneous and metamorphic rocks and minerals.
              It contains major and trace element concentrations, radiogenic and nonradiogenic isotope ratios as well as
              analytical ages for whole rocks, glasses, minerals and inclusions.
            </p>
          </div>
          <div class="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div v-for="feature in features" :key="feature.name" class="relative pl-16">
                <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-zinc-400">
                  <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Icon :name="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {{ feature.name }}
                </dt>
                <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-zinc-400">{{ feature.description }}</dd>
                <NuxtLink><BaseButton display="link" text="Try it out"/></NuxtLink>
              </div>
            </dl>
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
<script setup lang="ts">

const features = [
  {
    name: 'Database Query',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut ' +
        'labore et dolore magna aliquyam erat, sed diam voluptua.',
    icon: 'heroicons:magnifying-glass',
  },
  {
    name: 'Precompiled Files',
    description:
        'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: 'octicon:package',
  },
  {
    name: 'Expert Datasets',
    description:
        'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: 'tabler:school',
  },
]
</script>
