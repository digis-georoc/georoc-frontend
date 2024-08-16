<template>
  <PageContainer>
    <PageHead headline="Submit Data" />
    <p class="mb-4">There are different ways to contribute data to the GEOROC database and use
      the GEOROC Data Repository during review process:</p>
    <h3 class="font-bold mb-4">1.	Submit your published data for the GEOROC Repository
      and inclusion into the GEOROC Database</h3>
    <p class="mb-4">If your data are not yet included in GEOROC, we invite you to submit data files that accompany
      one of your <span class="underline">past publications</span> as an “Expert Dataset”
      to the
      <BaseNuxtLink class="text-primary" to="https://dataservices.gfz-potsdam.de/portal/?q=digis">DIGIS Data Repository</BaseNuxtLink></p>
    <p class="mb-4">Since GEOROC relies on data published by the community, the most important contribution you can
      make is to follow the FAIR guidelines when publishing your geochemical research data
      (<BaseNuxtLink class="text-primary" to="https://doi.org/10.1038/sdata.2016.18" target="_blank" title="Link to Wilkinson et al., 2016">Wilkinson et al., 2016</BaseNuxtLink>; <BaseNuxtLink class="text-primary" to="https://doi.org/10.1038/s43017-021-00237-w" target="_blank" title="Link to Chamberlain el al. 2021">Chamberlain et al. 2021</BaseNuxtLink>.)</p>
    <p class="mb-4">Please submit your data with the minimum set of metadata using our <span class="font-bold">minimum set of metadata</span>
      using our <BaseNuxtLink class="text-primary" to="https://digis-repo.georoc.eu" target="_blank" title="Link to Metadata Template">template</BaseNuxtLink>.
    </p>
    <p class="mb-4">
      DIGIS curators will evaluate whether the dataset meets the schema of our repository and assures proper metadata content.
    </p>
    <p class="mb-8">
      After acceptance, your datasets will be registered with a DOI and archived in the DIGIS domain repository
      for geochemical data at GFZ Data Services. Further details and data submission templates are available
      in the <BaseNuxtLink class="text-primary" to="https://digis-repo.georoc.eu" target="_blank" title="Link to repository guidelines and policies">repository guidelines and policies</BaseNuxtLink>.
    </p>
    <h3 class="font-bold mb-4">2.	Submit data for DOI-registration during journal submission and review process</h3>
    <p class="mb-4">
      The GEOROC Data Repository provides an easy-to-use DOI-service for geochemical data submission during a manuscript review process with the following steps:
    </p>
    <p class="mb-4 relative pl-5">
      <span class="absolute top-0 left-0">1)</span>
      Download the submission template [Link will be created in the future] and assure that all relevant analytical,
      mineralogical and geological metadata are properly documented, including proper geographic coordinates.
      The metadata are essential following the FAIR guidelines when publishing your research data
      (<BaseNuxtLink class="text-primary" to="https://doi.org/10.1038/sdata.2016.18" target="_blank" title="Link to Wilkinson et al., 2016">Wilkinson et al., 2016</BaseNuxtLink>) and will also be instrumental for later inclusion of your dataset (after journal acceptance) to the GEOROC database.
    </p>
    <p class="mb-4 relative pl-5">
      <span class="absolute top-0 left-0">2)</span>
      Once your data submission is completed and curated by DIGIS/GEOROC staff, the dataset will be DOI-registered at GFZ Data Services (GFZ Potsdam) and a protected DOI will be returned to the authors. This DOI will be time-stamped and via moratorium these data will only be accessible to the authors, editors and reviewers during the manuscript review phase.
    </p>
    <p class="mb-4 relative pl-5">
      <span class="absolute top-0 left-0">3)</span>
      After completion of journal review (and potential intermediate modification of the dataset), and editorial decision and acceptance, the authors will need to notify the DIGIS curators.
      At this point, the moratorium on the dataset will be lifted and the DOI made publicly available at the GEOROC domain specific repository for geochemical data at GFZ Data Services.
    </p>
    <p class="mb-8">
      All accepted submissions of new and reviewed data will then be considered for inclusion in the GEOROC database.
    </p>
  </PageContainer>
</template>
<script setup lang="ts">
</script>
