<template>
  <PageContainer>
    <BaseFluidContainer>
      <PageHead :headline="$t('howToCitePage.headline_1')"></PageHead>
    </BaseFluidContainer>
    <BaseFluidContainer class="space-y-8 sm:pb-12 pb-8">
      <div class="space-y-4">
        <p>{{ $t('howToCitePage.paragraph_1') }}</p>
        <i18n-t keypath="howToCitePage.paragraph_2" tag="p" scope="global">
          <template v-slot:link>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              class="hover:border-b-primary border-transparent border-b-2"
            >
              {{ $t('howToCitePage.link_text_1') }}
            </a>
          </template>
        </i18n-t>
        <ul class="list-disc list-inside ml-6">
          <li>{{ $t('howToCitePage.list_elem_1') }}</li>
          <i18n-t keypath="howToCitePage.list_elem_2" tag="li" scope="global">
            <template v-slot:must>
              <span class="underline font-bold">{{
                $t('howToCitePage.must')
              }}</span>
            </template>
          </i18n-t>
          <i18n-t keypath="howToCitePage.list_elem_3" tag="li" scope="global">
            <template v-slot:must>
              <span class="underline font-bold">{{
                $t('howToCitePage.must')
              }}</span>
            </template>
          </i18n-t>
        </ul>
        <p>{{ $t('howToCitePage.paragraph_3') }}</p>
        <p>{{ $t('howToCitePage.paragraph_4') }}</p>
      </div>
      <div class="space-y-4">
        <h2 class="text-xl font-bold">
          {{ $t('howToCitePage.subheadline_1') }}
        </h2>
        <i18n-t keypath="howToCitePage.paragraph_5" tag="p" scope="global">
          <template v-slot:link>
            <a
              href="https://georoc.eu/"
              target="_blank"
              class="hover:border-b-primary border-transparent border-b-2"
            >
              https://georoc.eu/</a
            >
          </template>
          <template v-slot:bold_text>
            <span class="font-bold">{{
              $t('howToCitePage.paragraph_5_bold')
            }}</span>
          </template>
        </i18n-t>
        <div>
          <p class="font-bold">{{ $t('howToCitePage.example') }}</p>
          <i18n-t keypath="howToCitePage.paragraph_6" tag="p" scope="global">
            <template v-slot:link>
              <a
                href="https://georoc.eu/"
                target="_blank"
                class="hover:border-b-primary border-transparent border-b-2"
                >https://georoc.eu/</a
              >
            </template>
          </i18n-t>
        </div>
        <i18n-t keypath="howToCitePage.paragraph_7" tag="p" scope="global">
          <template v-slot:bold_text>
            <span class="font-bold">{{
              $t('howToCitePage.paragraph_7_bold')
            }}</span>
          </template>
        </i18n-t>
        <div>
          <p>{{ $t('howToCitePage.paragraph_8') }}</p>
          <i18n-t
            keypath="howToCitePage.example_citation_text_1"
            tag="p"
            scope="global"
          >
            <template v-slot:doi_link>
              <a
                href="https://doi.org/10.1029/1999GC000026"
                target="_blank"
                class="hover:border-b-primary border-transparent border-b-2"
                >{{ $t('howToCitePage.example_citation_text_1_link') }}</a
              >
            </template>
          </i18n-t>
        </div>
      </div>
      <div class="space-y-4">
        <h2 class="text-xl font-bold">
          {{ $t('howToCitePage.subheadline_2') }}
        </h2>
        <p class="font-bold">{{ $t('howToCitePage.paragraph_9') }}</p>
        <ul class="list-disc list-inside ml-6">
          <li>{{ $t('howToCitePage.list_elem_4') }}</li>
        </ul>
        <div>
          <p class="font-bold">{{ $t('howToCitePage.example') }}</p>
          <p>{{ $t('howToCitePage.example_citation_text_2') }}</p>
        </div>
        <div>
          <p>{{ $t('howToCitePage.paragraph_10') }}</p>
          <p>{{ $t('howToCitePage.example_citation_text_3') }}</p>
        </div>
      </div>
    </BaseFluidContainer>
  </PageContainer>
</template>
<script setup lang="ts">
</script>
