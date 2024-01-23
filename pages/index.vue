<template>
  <div>
    <section :class="['relative h-[80vh]', backgroundImage.overlay]">
      <div
        class="absolute top-0 h-[80vh] inset-x-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          :src="backgroundImage.src"
          :alt="backgroundImage.altText"
          :class="['h-full w-full object-cover', backgroundImage.style]"
          aria-hidden="true"
        />
      </div>
      <BaseContainer class="h-full flex items-center">
        <div class="mt-24">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl"
          >
            {{ $t('indexPage.title') }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-200">
            {{ $t('indexPage.paragraph_below_title') }}
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <NuxtLink
              to="/query"
              class="rounded-md bg-primary px-4 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >{{ $t('indexPage.button_1') }}</NuxtLink
            >
            <NuxtLink
              to="/get-started"
              class="text-sm font-semibold leading-6 text-zinc-300"
              >{{ $t('indexPage.button_2') }}
              <span aria-hidden="true">→</span></NuxtLink
            >
          </div>
        </div>
      </BaseContainer>
      <div
        class="bg-black bg-opacity-50 text-white text-right absolute mx-1 bottom-0 right-0"
      >
        {{ backgroundImage.credit }}
      </div>
    </section>
    <section class="py-5">
      <BaseContainer>
        <div
          class="flex flex-wrap md:flex-nowrap w-full text-stone-700 dark:text-zinc-400"
        >
          <div
            class="border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
          >
            <span class="text-2xl">21,370</span>
            <span>{{ $t('indexPage.statistic_1') }}</span>
          </div>
          <div
            class="md:border-r border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
          >
            <span class="text-2xl">640,100</span>
            <span>{{ $t('indexPage.statistic_2') }}</span>
          </div>
          <div
            class="border-r md:border-l md:border-l-0 border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
          >
            <span class="text-2xl">62,402,280</span>
            <span>{{ $t('indexPage.statistic_3') }}</span>
          </div>
          <div
            class="border-stone-300 dark:border-zinc-700 flex flex-col w-1/2 md:w-1/4 text-center p-4"
          >
            <span class="text-2xl">35,166,090</span>
            <span>{{ $t('indexPage.statistic_4') }}</span>
          </div>
        </div>
      </BaseContainer>
    </section>
    <section class="bg-white dark:bg-zinc-800 mb-6">
      <BaseContainer class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto max-w-3xl lg:text-center">
            <h3
              class="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-300 sm:text-4xl"
            >
              {{ $t('indexPage.headline_1') }}
            </h3>
            <p class="mt-6 text-lg leading-8 text-stone-600 dark:text-zinc-400">
              {{ $t('indexPage.paragraph_1') }}
            </p>
          </div>
          <div class="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <dl
              class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16"
            >
              <div
                v-for="feature in features"
                :key="feature.name"
                class="relative pl-16"
              >
                <dt
                  class="text-base font-semibold leading-7 text-gray-900 dark:text-zinc-400"
                >
                  <div
                    class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
                  >
                    <Icon
                      :name="feature.icon"
                      class="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {{ feature.name }}
                </dt>
                <dd
                  class="mt-2 text-base leading-7 text-gray-600 dark:text-zinc-400"
                >
                  {{ feature.description }}
                </dd>
                <NuxtLink
                  ><BaseButton display="link" text="Try it out"
                /></NuxtLink>
              </div>
            </dl>
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
const features = [
  {
    name: 'Database Query',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut ' +
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

const images = [
  {
    src: '/images/Vulcano_1_surviving_witness.jpg',
    altText: 'snowy Parinacota vulcano with green llaretas in the foreground',
    credit: 'Martin Mergili (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/5259/',
    style: 'sm:object-top object-left-top',
    overlay: 'bg-black bg-opacity-[45%]',
  },
  {
    src: '/images/Vulcano_2_karymsky_vulcano.jpg',
    altText: 'strong eruption of the Karymsky vulcano',
    credit: 'Alexander Belousov (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/646/',
    style: '',
    overlay: 'bg-black bg-opacity-[52%]',
  },
  {
    src: '/images/Vulcano_3_double_strombolian.jpg',
    altText: 'closeup of two strombolian explosions',
    credit: 'Jean-Guillaume Feignon (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/12972/',
    style: 'object-left-bottom',
    overlay: 'bg-black bg-opacity-[54%]',
  },
  {
    src: '/images/Granite_1_granite.jpg',
    altText:
      'tropical beach on the Seychelles with granite boulders scattered around',
    credit: 'Sébastien Sollberger (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/1011/',
    style: '',
    overlay: 'bg-black bg-opacity-[53%]',
  },
  {
    src: '/images/Granite_2_majestic_half_dome.jpeg',
    altText:
      'half dome, a batholith in the Yosemite National Park, with pine trees at the base',
    credit: 'Teamrat Ghezzehei (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/14547/',
    style: '',
    overlay: 'bg-black bg-opacity-[58%]',
  },
  {
    src: '/images/Granite_3_view_from_ukko-koli.jpg',
    altText:
      'view from the Ukko-Koli in Finland overlooking the Lake Pielinen below',
    credit: 'Teemu Karlsson (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/17678/',
    style: '',
    overlay: 'bg-black bg-opacity-[60%]',
  },
  {
    src: '/images/WholeRock_1_g2_granite.jpg',
    altText:
      'G-2 granite with a pink color with mineral grains in the colors white (plagioclase), black (mafic) and semi-brown (orthoclase)',
    credit: 'Metwally Hamza (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/17724/',
    style: 'object-left-bottom',
    overlay: 'bg-black sm:bg-opacity-[42%] bg-opacity-[65%]',
  },
  {
    src: '/images/WholeRock_2_volcanic_bomb.jpg',
    altText:
      'a volcanic bomb protuding out of the top of the Brian Head formation in Utah',
    credit: 'Melanie Ray (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/12267/',
    style: 'sm:object-right',
    overlay: 'bg-black bg-opacity-[46%]',
  },
  {
    src: '/images/WholeRock_3_pillow_lava.jpg',
    altText:
      'detail of a cliff formed in Tertiary pillow lava near Oamuru, New Zealand',
    credit: 'Stefan Winkler (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/5052/',
    style: 'object-top',
    overlay: 'bg-black bg-opacity-[45%] sm:bg-opacity-[60%]',
  },
  {
    src: '/images/Mineral_1_Aquamarine.jpg',
    altText: 'cloudy Aquamarine on Muscovite',
    credit: 'Gunnar Ries (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/945/',
    style: 'object-center sm:object-bottom md:object-center',
    overlay: 'bg-black bg-opacity-[50%]',
  },
  {
    src: '/images/Mineral_2_christmas_tree.jpg',
    altText: 'Co-bearing sphalerite that looks like a christmas tree',
    credit: 'Dmitry Tonkacheev (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/4719/',
    style: '',
    overlay: 'bg-black lg:bg-opacity-[45%] bg-opacity-[60%]',
  },
  {
    src: '/images/Mineral_3_thin_section.jpg',
    altText:
      'a colorful thin section that contains a variety of mineral grains',
    credit: 'Metwally Hamza (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/16866/',
    style: 'object-left-top',
    overlay: 'bg-black lg:bg-opacity-[40%] bg-opacity-[59%]',
  },
  {
    src: '/images/Inclusion_1_thin_section.png',
    altText: 'a thin section in pumice extrusive/volcanic igneous rock',
    credit: 'Metwally Hamza (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/16868/',
    style: '',
    overlay: 'bg-black bg-opacity-[63%]',
  },
  {
    src: '/images/Inclusion_2_euhedral_crystal.jpg',
    altText: 'a golden euhedral crystal in dark blue groundmass matter',
    credit: 'Metwally Hamza (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/16865/',
    style: 'object-left-top',
    overlay: 'bg-black bg-opacity-[57%]',
  },
  {
    src: '/images/Inclusion_3_blue_olivine.jpg',
    altText:
      'a Blue Olivine set in a matrix of pyroxene, magnetite and plagioclase',
    credit: 'Bernardo Cesare (distributed via imaggeo.egu.eu)',
    origin: 'https://imaggeo.egu.eu/view/14280/',
    style: 'object-top-right',
    overlay: 'bg-black bg-opacity-[59%]',
  },
]
const randomIdx = ref(0)
const backgroundImage = ref({
  src: '',
  altText: '',
  credit: '',
  origin: '',
  style: '',
  overlay: '',
})
onMounted(() => {
  randomIdx.value = Math.floor(Math.random() * images.length)
  backgroundImage.value = images[randomIdx.value]
})
</script>
