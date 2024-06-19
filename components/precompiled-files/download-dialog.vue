<script setup lang="ts">
import { FetchError } from 'ofetch'
import JSZip from 'jszip'

const { t } = useI18n()

const props = defineProps<{
  options: DownloadOptions
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void
  (event: 'submit'): void
}>()

const isLoading = ref(false)
const errorIsOpen = ref(false)

const downloadError = { statusCode: 500, statusMessage: '' }

function openDownloadErrorDialog(statusCode: number, statusMessage: string) {
  downloadError.statusCode = statusCode
  downloadError.statusMessage = statusMessage
  errorIsOpen.value = true
}

function closeDialog() {
  emit('update:modelValue', false)
}

async function onSubmit() {
  closeDialog()
  emit('submit')
  isLoading.value = true
  if (props.options.dataOptions.identifier) {
    await download(props.options.dataOptions, props.options.metadataOptions)
  }
  isLoading.value = false
}
/**
 * Fetches a Dataset or Datafile(s) and the metadata of the compilation from the server, zipps the files and initiates a download by the clients browser.
 * All files will be downloaded as zip files.
 * @param downloadOptions includes { identifier, isDataset, version? } => if isDataset is false, individual file identifier need to be provided as the identifier, else a dataset identifier and a version is required.
 * @param metadataDownloadOptions includes { identifier, version } => dataset identifier and the version of the dataset
 */
async function download(
  downloadOptions: DataDownloadOptions,
  metadataDownloadOptions: MetaDataDownloadOptions,
) {
  let response: Blob | undefined
  let metadataResponse: string | undefined
  let responseError: FetchError | undefined
  try {
    if (downloadOptions.isDataset) {
      response = <Blob>(
        await getPrecompiledDatasetZip(
          downloadOptions.identifier,
          `${downloadOptions.version.major}.${downloadOptions.version.minor}`,
        )
      )
      metadataResponse = <string>(
        await getPrecompiledMetadataFile(
          metadataDownloadOptions.identifier,
          `${metadataDownloadOptions.version.major}.${metadataDownloadOptions.version.minor}`,
        )
      )
    } else {
      response = <Blob>await getPrecompiledZip(downloadOptions.identifier)
      metadataResponse = <string>(
        await getPrecompiledMetadataFile(
          metadataDownloadOptions.identifier,
          `${metadataDownloadOptions.version.major}.${metadataDownloadOptions.version.minor}`,
          downloadOptions.identifier,
        )
      )
    }
  } catch (error: any) {
    responseError = error
  }
  if (responseError) {
    openDownloadErrorDialog(
      responseError.statusCode ?? 500,
      responseError.statusMessage ?? '',
    )
    return
  }
  if (response && metadataResponse) {
    const zip = new JSZip()
    await zip.loadAsync(new Blob([response], { type: response.type }))
    zip.file('COMPILATION_METADATA.json', metadataResponse)
    const file: Blob = <Blob>await zip.generateAsync({ type: 'blob' })

    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = downloadOptions.filetitle.split('.')[0]
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}
</script>
<template>
  <BaseDialog
    :closable="true"
    :title="t('precompiledFilePage.license_header')"
    :modelValue="modelValue"
    @update:model-value="closeDialog"
  >
    <div class="space-y-2 px-1">
      <p class="">
        {{ $t('precompiledFilePage.license_paragraph_1') }}
        {{ $t('precompiledFilePage.license_paragraph_2') }}
      </p>
      <h2 class="font-bold">
        {{ $t('precompiledFilePage.license_subheader') }}
      </h2>
      <i18n-t
        keypath="precompiledFilePage.license_paragraph_3"
        tag="p"
        scope="global"
      >
        <template v-slot:license_link_1>
          <NuxtLink
            to="https://dataverse.org/best-practices/dataverse-community-norms"
            class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
          >
            {{ $t('precompiledFilePage.license_link_1') }}</NuxtLink
          >
        </template>
        <template v-slot:license_link_2>
          <NuxtLink
            to="/how-to-cite"
            class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
            >{{ $t('precompiledFilePage.license_link_2') }}</NuxtLink
          >
        </template>
      </i18n-t>
      <p>
        <NuxtLink
          :to="options.license.uri"
          class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
          >{{ options.license.name }}</NuxtLink
        >
      </p>
    </div>
    <div class="flex justify-end space-x-4 mt-2">
      <BaseButton
        :text="`${t('precompiledFilePage.agree_button')}`"
        @click="onSubmit"
      ></BaseButton>
      <BaseButton
        :text="`${t('precompiledFilePage.cancel_button')}`"
        @click="closeDialog"
      ></BaseButton>
    </div>
  </BaseDialog>
  <PrecompiledFilesErrorDialog
    :download-error="downloadError"
    v-model="errorIsOpen"
  ></PrecompiledFilesErrorDialog>
  <BaseLoadingIndicator v-model="isLoading"></BaseLoadingIndicator>
</template>
