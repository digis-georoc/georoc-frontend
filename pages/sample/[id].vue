<script setup lang="ts">

import { FetchError } from "ofetch";
import { loading } from "@nuxt/ui-templates";

const queryStore = useQueryStore()
const route = useRoute()
const router = useRouter()

const id = parseInt(<string>route.params.id, 10)
const data = ref<SampleFull | null>(null)
const error = ref<FetchError | null>(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    data.value = await $fetch<SampleFull>(`/api/samples/${id}`)
  } catch (e: FetchError | any) {
    error.value = e
  } finally {
    loading.value = false
  }
})

const list = computed(() => queryStore.listResult?.data)
const disablePrevious = ref(false)
const limit = 30

function next (direction: 1 | -1) {
  const nextId = id + direction

  if (nextId < 0) disablePrevious.value = true
  router.push(`/sample/${nextId}`);
}

function back() {
  router.push(`/query`);
}
</script>

<template>
  <div class="flex flex-col bg-white dark:bg-zinc-800 flex-1 pt-8">
    <BaseContainer class="flex flex-col flex-1">
      <template v-if="loading">
        <div class="flex flex-1 justify-center items-center">
          <BaseLoading class="text-[3rem]" opacity="0.2" />
        </div>
      </template>
      <template v-else>
        <template v-if="error">
          <template v-if="error.statusCode === 500">
            <h1 class="text-3xl font-bold">{{ $t('server_error') }}</h1>
            <p class="mt-4">{{ error.statusMessage }}</p>
          </template>
          <template v-if="error.statusCode === 404">
            <h1 class="text-3xl font-bold">{{ $t('not_found') }}</h1>
            <p class="mt-4">{{ error.statusMessage }}</p>
          </template>
        </template>
        <template v-else-if="data">
          <div class="flex space-x-2">
            <BaseButton
                :text="$t('back_to_database_query')"
                display="outline"
                size="small"
                @click="back()"
            />
            <BaseButton
              :text="$t('previous_sample')"
              display="outline"
              size="small"
              icon="material-symbols:arrow-back-ios"
              @click="next(-1)"
            />
            <BaseButton
              :text="$t('next_sample')"
              display="outline"
              size="small"
              icon="material-symbols:arrow-forward-ios"
              icon-position="right"
              @click="next(1)"
            />
          </div>
          <h1 class="text-3xl font-bold mt-4">{{ data.sampleName }}</h1>
        </template>
      </template>
    </BaseContainer>
  </div>
</template>
<style scoped>

</style>
