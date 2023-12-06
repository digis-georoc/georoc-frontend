<template>
  <PageContainer>
    <section>
      <div class="flex flex-wrap pt-8 pb-1 first-letter:space-x-4 space-y-2 md:justify-between justify-start items-center">
        <h1 class="text-3xl font-bold">Precompiled Files</h1>
        <NuxtLink to="#concept" class="hover:underline underline-offset-4 underline-primary p-2 inline-flex items-center justify-center rounded-md">
            <Icon name="fluent:info-24-regular" class="text-base mr-1"/>
            {{ $t('precompiledFilePage.headline_1') }}
          </NuxtLink>
      </div>
      <div class="sticky top-[4rem] bg-white dark:bg-zinc-800 z-[1009] py-2 border-b-2">
        <div class="flex flex-wrap space-x-4 space-y-2 md:justify-start justify-start items-center">
          <h2 class="text-xl font-bold">{{ precompiledFiles?.title }}</h2>
          <BaseDropdown :links="links" :buttontext="t('precompiledFilePage.select_button')"></BaseDropdown>
        </div>
      </div>

      <BaseFluidContainer class="mb-6 mt-4 py-4 bg-primary-50 dark:bg-zinc-700 rounded-md">
        <div class="flex space-x-3">
          <Icon :name="'system-uicons:document-stack'" class="w-[10rem] h-[8rem]"></Icon>
          <div class="space-y-5">
            <p class="font-bold">{{ authorString }}</p>
            <p>{{ precompiledFiles?.title }}, <NuxtLink class="border-b-primary hover:border-b-2 text-primary dark:text-primary-100" :to="precompiledFiles?.persistentUrl">{{ precompiledFiles?.persistentUrl }}</NuxtLink></p>
            <p>"{{ precompiledFiles?.description }}"</p>
            <p>
              <button class="underline underline-offset-4 text-primary dark:text-primary-100" @click="openDialog(precompiledFiles?.datasetPersistentId, true, `${precompiledFiles?.productionDate}_${precompiledFiles?.title}`)">Download complete precompiled dataset</button>
            </p>
          </div>
        </div>
      </BaseFluidContainer>
    
      <BaseTabs :headers="tabHeaders">
        <template #[fileslot]>
          <BaseFluidContainer class="py-4">
            <BaseDataTable :rows="precompiledFiles?.files" :columns="columns" link-to-dataset-text="view original">
              <template #[file.label] v-for="file in precompiledFiles?.files">
                <button class="underline underline-offset-4 text-primary dark:text-primary-100" @click="openDialog(file.persistentId, false, file.label)">{{ file.label }}</button>
              </template>
            </BaseDataTable>
          </BaseFluidContainer>
        </template>
        <template #[metaslot]>
          <BaseFluidContainer class="py-4">
            <table class ="table-auto">
              <tbody>
                <tr v-for="entry in metaData" class="border-8 border-transparent">
                  <td class="min-w-[11rem] align-top font-semibold border-r-4 border-transparent">{{ entry.subtitle }}:</td>
                  <td class="align-top">{{ entry.data }}</td>
                </tr>
              </tbody>
            </table>
          </BaseFluidContainer>
        </template>
      </BaseTabs>
    </section>

    <BaseFluidContainer :class="['pt-4 pb-6 space-y-4 snap-y', {'border-t-2': !$slots.default}]">
      <h2 id="concept" class="text-xl py-4 font-bold snap-end scroll-m-20">{{ $t('precompiledFilePage.headline_1') }}</h2>
      <p class="font-medium">{{ $t('precompiledFilePage.paragraph_1') }}</p>
      <h3 class="text-lg font-semibold">{{ $t('precompiledFilePage.subheadline_1') }}:</h3>
      <ul class="list-disc list-inside ml-6">
        <li>{{ $t('precompiledFilePage.bullet_point_1') }}</li>
      </ul>
              
      <h3 class="text-lg font-semibold">{{ $t('precompiledFilePage.subheadline_2') }}:</h3>
      <ol class="list-decimal list-inside ml-6">
        <li>{{ $t('precompiledFilePage.bullet_point_2') }}</li>
        <li>{{ $t('precompiledFilePage.bullet_point_3') }}</li>
      </ol>
              
      <h3 class="text-lg font-semibold">{{ $t('precompiledFilePage.subheadline_3') }}:</h3>
      <ul class="list-disc list-inside ml-6">
        <li>{{ $t('precompiledFilePage.bullet_point_4') }}</li>
      </ul>
              
      <br>
      <h3 class="text-lg font-semibold">{{ $t('precompiledFilePage.subheadline_4') }}:</h3>

      <h4 class="font-medium">{{ $t('precompiledFilePage.subsubheadline_1') }}:</h4>
      <ul class="list-disc list-inside ml-6">
        <li>{{ $t('precompiledFilePage.xrf') }}</li>
        <li>{{ $t('precompiledFilePage.wet') }}</li>
        <li>{{ $t('precompiledFilePage.emp') }}</li>
        <li>{{ $t('precompiledFilePage.aes') }}</li>
        <li>{{ $t('precompiledFilePage.aas') }}</li>
        <li>{{ $t('precompiledFilePage.others') }}</li>
      </ul>

      <h4 class="font-medium">{{ $t('precompiledFilePage.subsubheadline_2') }}:</h4>
      <ul class="list-disc list-inside ml-6">
        <li>{{ $t('precompiledFilePage.tims') }}</li>
        <li>{{ $t('precompiledFilePage.icpms') }}</li>
        <li>{{ $t('precompiledFilePage.aes') }}</li>
        <li>{{ $t('precompiledFilePage.ssms') }}</li>
        <li>{{ $t('precompiledFilePage.inaa') }}</li>
        <li>{{ $t('precompiledFilePage.xrf') }}</li>
        <li>{{ $t('precompiledFilePage.others') }}</li>
      </ul>

      <h4 class="font-medium">{{ $t('precompiledFilePage.subsubheadline_3') }}:</h4>
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
    </BaseFluidContainer>
  </PageContainer>

  <BaseDialog :closable="true" :title="t('precompiledFilePage.license_header')" v-model="isOpen">
    <div class="space-y-2 px-1">
      <p class="">{{ $t('precompiledFilePage.license_paragraph_1') }} {{ $t('precompiledFilePage.license_paragraph_2') }}</p>
      <h2 class="font-bold">{{ $t('precompiledFilePage.license_subheader') }}</h2>
      <p class="">
        {{ $t('precompiledFilePage.license_paragraph_3_1') }} <NuxtLink to="https://dataverse.org/best-practices/dataverse-community-norms" class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100">
        {{ $t('precompiledFilePage.license_paragraph_3_linktext') }}</NuxtLink> 
        {{ $t('precompiledFilePage.license_paragraph_3_2') }}
      </p>
      <p><NuxtLink :to="precompiledFiles?.license.uri" class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100">{{ precompiledFiles?.license.name }}</NuxtLink></p>
    </div>
    <div class="flex justify-end space-x-4 mt-2">
      <BaseButton :text="`${t('precompiledFilePage.agree_button')}`" @click="onSubmit"></BaseButton>
      <BaseButton :text="`${t('precompiledFilePage.cancel_button')}`" @click="closeDialog"></BaseButton>
    </div>
  </BaseDialog>

  <BaseLoadingIndicator v-model="isLoading"></BaseLoadingIndicator>
</template>
<script setup lang="ts">
  const { t } = useI18n();
  const route = useRoute();
  
  const precompiledFilePreviewArr:  PrecompiledFilePreview[] | undefined = (await getPrecompiledPreview())?.preview;
  const links: {
    href: string, 
    label: string, 
    isCurrent?: boolean
    }[] = [];
  
  if(precompiledFilePreviewArr){
    for (let preview of precompiledFilePreviewArr){
      links.push({
        href: `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}`,
        label: preview.title,
        isCurrent: `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}` == route.fullPath
      });
    }
  }


  const protocol: string = Array.isArray(route.params.protocol) ? route.params.protocol[0] : route.params.protocol;
  const authority: string = Array.isArray(route.params.authority) ? route.params.authority[0] : route.params.authority;
  const id: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const precompiledFiles = await getPrecompiledFiles(protocol, authority, id);

  const tabHeaders = [t('precompiledFilePage.tabheader_1'), t('precompiledFilePage.tabheader_2')];
  const fileslot = `${tabHeaders[0]}-slot`
  const metaslot = `${tabHeaders[1]}-slot`

  const emit = defineEmits(['submit', 'open', 'close'])
  const isOpen = ref(false);
  const isLoading = ref(false);

  const downloadOptions = {
    identifier: '',
    isDataset: false,
    filetitle: ''
  };

  const columns = [
    {
      field: "contentType",
      header: t('precompiledFilePage.table_header_1')
    },
    {
      field: "label",
      header: t('precompiledFilePage.table_header_2'),
      isSlot: true
    },
    {
      field: "filesize",
      header: t('precompiledFilePage.table_header_3')
    },
    {
      field: "persistentUrl",
      header: t('precompiledFilePage.table_header_4')
    }
  ];

  const authorString: string = formatAuthors(precompiledFiles?.authors);
    
  const metaData = [
    {
      subtitle: t('precompiledFilePage.meta_data_1'),
      data: precompiledFiles?.datasetPersistentId
    },
    {
      subtitle: t('precompiledFilePage.meta_data_2'),
      data: precompiledFiles?.publicationDate
    },
    {
      subtitle: t('precompiledFilePage.meta_data_3'),
      data: precompiledFiles?.title
    },
    {
      subtitle: (precompiledFiles) && precompiledFiles?.authors.length > 1 ? t('precompiledFilePage.meta_data_4_pl') : t('precompiledFilePage.meta_data_4_sing'),
      data: authorString
    },
    {
      subtitle: t('precompiledFilePage.meta_data_5'),
      data: precompiledFiles?.description
    },
    {
      subtitle: t('precompiledFilePage.meta_data_6'),
      data: precompiledFiles?.subject
    }
  ]

  async function onSubmit() {
    emit('submit');
    isOpen.value = false;
    isLoading.value = true;
    await download(downloadOptions.identifier, downloadOptions.isDataset, downloadOptions.filetitle);
    isLoading.value = false;
  }

  function openDialog(identifier: string | undefined, isDataset: boolean, filetitle: string) {
    emit('open')
    if(identifier) {
      downloadOptions.identifier = identifier;
      downloadOptions.isDataset = isDataset;
      downloadOptions.filetitle = filetitle;
    }
    isOpen.value = true
  }
  function closeDialog() {
    emit('close');
    isOpen.value = false;
  }

  /**
   * Fetches a Dataset or Datafile from the server and initiates a download by the clients browser.
   * Datasets will be downloaded as zip files.
   * @param identifier Identifier of the file or dataset.
   * @param isDataset True, if a dataset should be downloaded.
   * @param filename How the downloaded dataset or file should be named.
   */
  async function download(identifier: string, isDataset: boolean, filename: string){
    const response = (await getPrecompiledFile(identifier, isDataset));
    if (response == null) {
      console.log("Response missing")
      return; //Error handling needed
    }
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([response], {type: response.type}));
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click(); 

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  
  /**
   * Formats an Array of authornames as a string where the names are seperated by a comma.
   * @param authors Author-array.
   */
  function formatAuthors(authors: string[] | undefined){
    if (!authors) return '';
    let authorString = "";
    for (let i = 0; i < authors.length; i++){
      authorString = i == 0 ? authorString.concat(authors[i]) : authorString.concat(", ", authors[i]);
    }
    return authorString;
  }
</script>