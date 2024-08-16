<template>
  <PageContainer>
    <BaseFluidContainer>
      <PageHead headline="How To Cite"></PageHead>
    </BaseFluidContainer>
    <BaseFluidContainer class="sm:pb-12 pb-8">
      <p class="mb-6">
        GEOROC compiles data from published, peer-reviewed literature.
        GEOROC database curation and IT development is the focus of the
        <BaseNuxtLink class="text-primary" to="https://digis.geo.uni-goettingen.de" target="_blank" title="Link to DIGIS project website">DIGIS project</BaseNuxtLink>
        funded by the German Science Foundation (DFG) at the
        <BaseNuxtLink class="text-primary" to="https://www.uni-goettingen.de/en/125309.html" target="_blank" title="Link to Göttingen Geoscience Center (GZG)">Göttingen Geoscience Center (GZG)</BaseNuxtLink>
        of the Georg August University of Göttingen and the
        <BaseNuxtLink class="text-primary" to="https://www.sub.uni-goettingen.de/en/news/" target="_blank" title="Link to SUB Website">State and University Library (SUB) at Göttingen</BaseNuxtLink>.
        GEOROC data are provided free of charge and we ask that you use our data products for scientific and educational purposes only.
        When intending to use GEOROC data products for commercial purposes we request that users contact GEOROC/DIGIS staff at
        <BaseNuxtLink class="text-primary" to="mailto:digis-info@uni-goettingen.de">digis-info[at]uni-goettingen.de</BaseNuxtLink>
        for conditions and permission.
      </p>
      <p class="mb-6">
        Use of data compilations downloaded from GEOROC is only permitted under the regulations of the
        Creative Commons Attribution-ShareAlike 4.0 International
        (<BaseNuxtLink class="text-primary" to="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" title="Link to License Website">CC BY-SA 4.0</BaseNuxtLink>):
      </p>
      <ul class="list-disc pl-8 mb-4">
        <li>You are free to copy, remix, transform and redistribute the data in any medium and format.</li>
        <li>
          However, in doing so, you <span class="underline font-bold">must</span> give appropriate credit to GEOROC as
          well as to the original data sources.
          This includes proper referencing in a publication’s list of cited references (see below).
        </li>
        <li>
          If you remix, transform, or build upon the material, you <span class="underline font-bold">must</span> distribute your contributions under the same license as the original.
        </li>
      </ul>
      <p class="mb-8">
        Data provided through the GEOROC Data Repository are covered by separate licensing requirements as stipulated by the provider of the dataset(s).
      </p>
      <h2 class="font-bold text-lg mb-6">Please follow these guidelines for how to cite GEOROC data.</h2>
      <h3 class="font-bold mb-2">Data Download from Database Query</h3>
      <p class="mb-6">
        To cite the GEOROC database, please reference its URL in text and in figure captions: <span class="underline">https://georoc.eu/</span>.
        Please <span class="font-bold">cite the specific download by giving the date and, if possible, parameters of the query.</span>
        A summary of the query criteria may be viewed on the download page.
      </p>
      <h3 class="font-bold mb-2">Example for manuscript text and figures:</h3>
      <p class="mb-6">
        "Data were downloaded from the GEOROC database (https://georoc.eu/) on 1 March 2022, using the following parameters: geological setting = Continental Flood Basalt: Etendeka Province and rock name = basalt."
      </p>
      <p class="mb-6">
        You should also <span class="font-bold">cite the original references that contribute to the downloaded dataset.</span>
        These references are included in every GEOROC download.
        For large datasets, we strongly encourage creating a secondary bibliography which is accepted as a supplementary
        material file by many journals. This type of citation helps ensure that appropriate credit
        is given to the scientists who originally generated the data.
      </p>
      <h3 class="font-bold mb-2">Example for citation in text and reference lists in scientific publications:</h3>
      <p class="mb-6">
        Sarbas B, Nohl U (2008) The GEOROC database as part of a growing geoinformatics network. In: Brady, SR, Sinha AK, Gundersen LC (eds): Geoinformatics 2008 - Data to Knowledge, Proceedings: U.S. Geological Survey Scientific Investigations, Report 2008–5172, pp. 42/43 (2008).
      </p>
      <p class="mb-6">
        You may also cite:<br>
        Klöcking M, Sturm A, Sarbas B, Kallas L, Möller-McNett S, Lehnert K, Elger K, Horstmann W, Kurzawe D, Willbold M, Wörner G (2024) GEOROC 2.0: a Globally Connected Geochemical Database to Facilitate Interdisciplinary, Data-Driven Research. MinWien2023, Vienna, Austria, 17–21 September 2023.
      </p>
      <h3 class="font-bold mb-2">Citing Precompiled Files and Expert Datasets from the GEOROC Data Repository</h3>
      <p class="font-bold mb-2">
        Example: Cite the dataset with its dataset DOI as a standard reference of your publication. The citation should include the following elements:
      </p>
      <ul class="list-disc pl-8"><li>Creator(s) (Publication Year): Title. Publisher. Identifier. Version.</li></ul>
      <p>and</p>
      <ul class="list-disc pl-8 mb-6">
        <li>
          DIGIS Team, 2021, "GEOROC Compilation: Rock Types", https://doi.org/10.25625/2JETOA, Goettingen Research Online / Data, V1.
        </li>
      </ul>
      <p>
        You may also cite specific files within a dataset, for example:<br>
        DIGIS Team, 2021, "2021-11-2JETOA_ADAKITE.csv", GEOROC Compilation: Rock Types, https://doi.org/10.25625/2JETOA/AWTDMI, Goettingen Research Online / Data, V1.
      </p>
    </BaseFluidContainer>
  </PageContainer>
</template>
<script setup lang="ts">
</script>
