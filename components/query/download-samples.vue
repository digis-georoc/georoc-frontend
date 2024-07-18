<script setup lang="ts">
import domtoimage from 'dom-to-image'
import JSZip from "jszip"
import {queryToText} from "~/utils/query-to-text";

interface DownloadFile {
  name: string
  content: Blob | string
  binary?: boolean
}

const queryStore = useQueryStore()
const materialFilterValue = computed(() => queryStore.getFilter(QueryKey.Material)?.value ?? null)

const dialogVisible = ref(false)
const hasCsv = ref(false)
const hasXlsx = ref(false)
const page = ref(1)

const isLoading = ref(false)
const downloadReady = ref(false)

function openDialog() {
  dialogVisible.value = true
  page.value = 1
  downloadReady.value = false
  hasCsv.value = false
  hasXlsx.value = false
}

function createMetaFileContent(dateString: string) {
  let content = 'GEOROC 2.0 Download Metadata: \n'
  content += '==============================================================\n\n'
  content += 'This file contains metadata for the downloaded content from GEOROC website (www.georoc.eu).\n\n'
  content += `Download Time: ${dateString}\n`
  content += `Shareble URL: ${window.location.href}\n\n`
  content += `Amount Samples: ${queryStore.listResult?.totalCount} \n\n`
  content += queryToText()

  return content
}
async function download() {
  isLoading.value = true

  const downloadDatetime = getDownloadDatetime(new Date())

  const imageContent = domtoimage.toBlob(
    document.getElementById('map')?.parentElement
  )
  const metaFileContent = createMetaFileContent(downloadDatetime)
  const fileNamePrefix = getFilePrefix(downloadDatetime)

  let csvContent = null
  if (hasCsv.value) {
    csvContent = await downloadFilteredCsv(queryStore.createUrlParams())
  }

  let xlsxContent = null
  if (hasXlsx.value) {
    xlsxContent = await downloadFilteredXlsx(queryStore.createUrlParams())
  }

  generateZip(`${fileNamePrefix}.zip`, [
      {
        name: `${fileNamePrefix}_map.png`,
        content: imageContent
      }, {
        name: `${fileNamePrefix}_metadata.txt`,
        content: metaFileContent
      },
        ...(xlsxContent ? [{
        name: `${fileNamePrefix}_data.xlsx`,
        content: xlsxContent,
      }] : []),
    ...(csvContent ? [{
      name: `${fileNamePrefix}_data.csv`,
      content: csvContent,
    }] : [])
    ]
  )

  isLoading.value = false
  downloadReady.value = true

  setTimeout(() => dialogVisible.value = false, 3000)
}

async function generateZip(name: string, files: DownloadFile[]) {
  const zip = new JSZip()

  files.forEach(({ name, content }) => {
    zip.file(name, content)
  })

  const zipFile: Blob = <Blob>await zip.generateAsync({ type: 'blob' })


  const link = document.createElement('a')
  const url = URL.createObjectURL(zipFile)

  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function getFilePrefix(dateString: string) {
  return 'GEOROC_database_data_download_' + dateString

}

function getDownloadDatetime(date: Date) {
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const secs = date.getSeconds()

  return `${year}-${month}-${day}_${hours}${minutes}${secs}`
}

</script>

<template>
  <BaseButton
    :text="$t('download_data')"
    @click="openDialog"
    :disabled="materialFilterValue === null"
    icon="solar:download-minimalistic-linear"
    class="shadow-lg whitespace-nowrap rounded-l-none"
  />
  <BaseDialog
    v-model="dialogVisible"
    :title="$t('download_data')"
  >
    <div v-if="page === 1" class="flex flex-col mb-2 w-[50vw] space-y-3">
      <p>{{ $t('queryPage.download_data_info_1') }}:</p>
      <div class="flex space-x-4">
        <BaseCheckbox v-model="hasCsv" label="CSV" id="format-csv" class="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 pr-8 rounded"></BaseCheckbox>
        <BaseCheckbox v-model="hasXlsx" label="XLSX" id="format-xlsx" class="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 pr-8 rounded"></BaseCheckbox>
      </div>
      <h3 class="font-semibold border-t pt-4">{{ $t('Contents Summary') }}:</h3>
      <p>The data will be downloaded as zip file. It contains:</p>
      <ul class="list-disc pl-4">
        <li v-if="hasCsv">
          a csv file with the sample data
        </li>
        <li v-if="hasXlsx">
          a xlsx file with the sample data
        </li>
        <li>a txt file with the regarding metadata:
          <ul class="ml-4 list-[circle]">
            <li>a time stamp of the download</li>
            <li>your filter settings</li>
            <li>number of found samples</li>
            <li>the URL to recall or share your settings</li>
            <li>the coordinates of your map section</li>
            <li>information about how to cite these data</li>
            <li>references</li>
            <li>an image file with the map section as presented</li>
          </ul>
        </li>
        <li>an image file with the map section as presented</li>
      </ul>
      <p>{{ $t('queryPage.download_data_info_2') }}</p>
      <BaseButton
        :text="$t('next')"
        :disabled="!hasCsv && !hasXlsx"
        icon="solar:arrow-right-outline"
        icon-position="right"
        @click="page = 2"
        class="ml-auto"
      />
    </div>
    <div v-if="page === 2" class="flex flex-col mb-2 w-[50vw] space-y-2">
      <div v-if="downloadReady" class="py-12 flex justify-center items-center space-x-2">
        <Icon name="ic:round-check" class="text-5xl text-lime-500 dark:text-lime-600"/>
        <span class="text-zinc-600 dark:text-zinc-400">{{ $t('queryPage.download_is_ready')}}</span>
      </div>
      <div v-else class="space-y-2 px-1">
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
            to="https://creativecommons.org/licenses/by-sa/4.0/"
            class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
          >CC BY-SA 4.0</NuxtLink>
        </p>
      </div>
      <div v-if="!downloadReady" class="flex justify-end space-x-4 mt-2">
        <BaseButton
          :icon="isLoading ? 'line-md:loading-loop' : 'solar:download-minimalistic-linear'"
          :text="isLoading ? $t('queryPage.preparing_download') : $t('precompiledFilePage.agree_button')"
          @click="download"
        ></BaseButton>
        <BaseButton
          display="outline"
          :text="$t('precompiledFilePage.cancel_button')"
          @click="dialogVisible = false"
        ></BaseButton>
      </div>
    </div>
  </BaseDialog>
</template>
