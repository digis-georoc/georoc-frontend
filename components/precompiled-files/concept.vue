<template>
  <div class="pt-4 pb-6 space-y-4 snap-y">
    <h2 id="concept" class="text-xl py-4 font-bold snap-end scroll-m-20">
      {{ $t('precompiledFilePage.headline_1') }}
    </h2>
    <p class="font-medium">{{ $t('precompiledFilePage.paragraph_1') }}</p>
    <h2 class="mt-4 text-xl py-4 font-bold snap-end scroll-m-20">
      {{ $t('precompiledFilePage.headline_2') }}
    </h2>
    <p class="font-medium">{{ $t('precompiledFilePage.paragraph_2') }}</p>
    <h3 class="text-lg font-semibold">
      {{ $t('precompiledFilePage.subheadline_1') }}:
    </h3>
    <ul class="list-disc list-inside ml-6">
      <li>{{ $t('precompiledFilePage.bullet_point_1') }}</li>
    </ul>

    <h3 class="text-lg font-semibold">
      {{ $t('precompiledFilePage.subheadline_2') }}:
    </h3>
    <ol class="list-decimal list-inside ml-6">
      <li>{{ $t('precompiledFilePage.bullet_point_2') }}</li>
      <li>{{ $t('precompiledFilePage.bullet_point_3') }}</li>
    </ol>

    <h3 class="text-lg font-semibold">
      {{ $t('precompiledFilePage.subheadline_3') }}:
    </h3>
    <ul class="list-disc list-inside ml-6">
      <li>{{ $t('precompiledFilePage.bullet_point_4') }}</li>
    </ul>

    <br />
    <h3 class="text-lg font-semibold">
      {{ $t('precompiledFilePage.subheadline_4') }}:
    </h3>

    <h4 class="font-medium">
      {{ $t('precompiledFilePage.subsubheadline_1') }}:
    </h4>
    <ul class="list-disc list-inside ml-6">
      <li>{{ $t('precompiledFilePage.xrf') }}</li>
      <li>{{ $t('precompiledFilePage.wet') }}</li>
      <li>{{ $t('precompiledFilePage.emp') }}</li>
      <li>{{ $t('precompiledFilePage.aes') }}</li>
      <li>{{ $t('precompiledFilePage.aas') }}</li>
      <li>{{ $t('precompiledFilePage.others') }}</li>
    </ul>

    <h4 class="font-medium">
      {{ $t('precompiledFilePage.subsubheadline_2') }}:
    </h4>
    <ul class="list-disc list-inside ml-6">
      <li>{{ $t('precompiledFilePage.tims') }}</li>
      <li>{{ $t('precompiledFilePage.icpms') }}</li>
      <li>{{ $t('precompiledFilePage.aes') }}</li>
      <li>{{ $t('precompiledFilePage.ssms') }}</li>
      <li>{{ $t('precompiledFilePage.inaa') }}</li>
      <li>{{ $t('precompiledFilePage.xrf') }}</li>
      <li>{{ $t('precompiledFilePage.others') }}</li>
    </ul>

    <h4 class="font-medium">
      {{ $t('precompiledFilePage.subsubheadline_3') }}:
    </h4>
    <ul class="list-disc list-inside ml-6">
      <li>{{ $t('precompiledFilePage.tims') }}</li>
      <li>{{ $t('precompiledFilePage.icpms') }}</li>
      <li>{{ $t('precompiledFilePage.ssms') }}</li>
      <li>{{ $t('precompiledFilePage.xrf') }}</li>
      <li>{{ $t('precompiledFilePage.aes') }}</li>
      <li>{{ $t('precompiledFilePage.inaa') }}</li>
      <li>{{ $t('precompiledFilePage.aas') }}</li>
      <li>{{ $t('precompiledFilePage.sims') }}</li>
      <li>{{ $t('precompiledFilePage.wet') }}</li>
      <li>{{ $t('precompiledFilePage.others') }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
</script>
