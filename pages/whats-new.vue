<template>
  <PageContainer>
    <PageHead headline="What's New" />
    <p class="mb-6">
      Since GEOROC has moved from the Max Planck Institute in Mainz and is now curated by the
      <BaseNuxtLink class="text-primary" to="https://digis.geo.uni-goettingen.de" target="_blank" title="Link to DIGIS project website">DIGIS project</BaseNuxtLink>
      (funded by the German Science Foundation since 2021) at the
      <BaseNuxtLink class="text-primary" to="https://www.uni-goettingen.de/en/125309.html" target="_blank" title="Link to Göttingen Geoscience Center (GZG)">Göttingen Geoscience Center (GZG)</BaseNuxtLink>
      at University Göttingen and the
      <BaseNuxtLink class="text-primary" to="https://www.sub.uni-goettingen.de/sub-aktuell/" target="_blank" title="Link to SUB Website">University and State Library (SUB)</BaseNuxtLink>.
    </p>
    <p class="mb-6">So far, the DIGIS project for GEOROC 2.0 has achieved these goals:</p>
    <ul class="list-disc pl-4 space-y-4">
      <li>
        <span class="font-bold">The GEOROC Database</span> has been migrated in 2021 from the Max Planck Institute for Chemistry in Mainz,
        where it was developed and curated for over two decades, to Göttingen University.
      </li>
      <li>
        We updated the look and feel of the <span class="font-bold">old GEOROC website</span>. However, this update is a temporary measure and
        we will be launching an entirely new web interface for GEOROC 2.0 for testing by the end of 2024 and expect
        full functionality by mid 2025.
      </li>
      <li>
        A <span class="font-bold">new data model</span> was developed allowing (re-) connecting the GEOROC database
        to the
        <BaseNuxtLink class="text-primary" to="http://portal.earthchem.org/" target="_blank" title="Link to Earthchem Portal">EarthChem Portal</BaseNuxtLink>.
      </li>
      <li>
        An amended metadata scheme, including trusted and published machine-readable vocabularies is being
        established in compliance with FAIR principles, based on the ODM2 and EarthChem data models.
        DIGIS and EarthChem both participate in the
        <BaseNuxtLink class="text-primary" to="https://onegeochemistry.github.io/" target="_blank" title="Link to OneGeochemistry">OneGeochemistry</BaseNuxtLink>
        initiative aiming to create global standards for geochemical data.
      </li>
      <li>
        API access the database was established (presently in testing).
      </li>
      <li>
        We have set up the
        <BaseNuxtLink class="text-primary" to="https://digis-repo.georoc.eu" target="_blank" title="Link to GEOROC Data Repository">GEOROC Data Repository</BaseNuxtLink>
        at GFZ Data Services to enable data
        contributions from the community. Authors can submit new analytical data as well as data compilations.
      </li>
      <li>
        <span class="font-bold">Precompiled Files</span> are now hosted in this repository, providing a clear format for citation of the exact
        version of data you have downloaded.
      </li>
      <li>
        We have refreshed the <span class="font-bold">Expert Datasets:</span> These are author-provided data compilations available
        through the GEOROC Data Repository.
      </li>
      <li>
        We will be launching an entirely <span class="font-bold">new web interface</span> for GEOROC 2.0 for testing by the end of 2024 and
        expect full functionality by mid 2025.
      </li>
      <li>
        During the second funding phase of the DIGIS project (expected for 2025-2028) the new website will provide
        users with new and exciting tools for data analysis.
      </li>
    </ul>
    <p class="mt-6 mb-8">
      Here you can find further information on the
      <BaseNuxtLink class="text-primary" to="https://digis-repo.georoc.eu" target="_blank" title="Link to GEOROC Data Repository">DIGIS project</BaseNuxtLink>
      and the
      <BaseNuxtLink class="text-primary" to="https://www.uni-goettingen.de/en/people/643410.html" target="_blank" title="Link to DIGIS-Team">DIGIS-Team</BaseNuxtLink>.
    </p>

  </PageContainer>
</template>
<script setup lang="ts">
</script>
