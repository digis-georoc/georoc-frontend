<script setup lang="ts">
import domtoimage from 'dom-to-image'
import JSZip from "jszip"
import {queryToText} from "~/utils/query-to-text";

interface DownloadFile {
  name: string
  content: Blob | string
}

const dialogVisible = ref(false)
const hasCsv = ref(false)
const hasXlsx = ref(false)
const page = ref(1)

function openDialog() {
  dialogVisible.value = true
  page.value = 1
}

function createMetaFileContent() {
  let content = 'GEOROC 2.0 Download Metadata: \n\n'
  content += 'This file contains metadata for the downloaded content from GEOROC website (www.georoc.eu).\n\n'
  content += `Shareble URL: ${window.location.href}\n\n`
  content += queryToText()

  return content
}
async function download() {
  const imageContent = domtoimage.toBlob(
    document.getElementById('map')?.parentElement
  )
  const metaFileContent = createMetaFileContent()
  const date = new Date()
  const fileNamePrefix = `GEOROC_database_data_download_${date.toISOString()}`
  generateZip(`${fileNamePrefix}.zip`, [{
    name: `${fileNamePrefix}_map.png`,
    content: imageContent
  }, {
    name: `${fileNamePrefix}_metadata.txt`,
    content: metaFileContent
  }])

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
</script>

<template>
  <BaseButton
    :text="$t('download_data')"
    @click="openDialog"
    icon="solar:download-minimalistic-linear"
    class="shadow-lg whitespace-nowrap"
  />
  <BaseDialog
    v-model="dialogVisible"
    :title="$t('download_data')"
    class="w-1/2"
  >
    <div v-if="page === 1" class="flex flex-col mb-2 w-[33vw] space-y-2">
      <p>{{ $t('queryPage.download_data_info_1') }}:</p>
      <div class="flex space-x-4">
        <BaseCheckbox v-model="hasCsv" label="CSV" id="format-csv"></BaseCheckbox>
        <BaseCheckbox v-model="hasXlsx" label="XLSX" id="format-xlsx"></BaseCheckbox>
      </div>
      <h3 class="font-bold border-t pt-2">{{ $t('Contents Summary') }}:</h3>
      <ul class="list-disc pl-4">
        <li v-if="hasCsv">
          a CSV file with the sample data, the regarding metadata, a time stamp
        </li>
        <li v-if="hasXlsx">
          a XLSX file with two worksheets - the sample data in the first and the regarding metadata, a time stamp in the second worksheet
        </li>
        <li>metadata text file with:
          <ul class="ml-2 list-[circle]">
            <li>your filter settings</li>
            <li>the URL to recall or share your settings</li>
            <li>bounding box coordinates of your map section</li>
            <li>information about how to cite these data</li>
          </ul>
        </li>
        <li>an image file with the map section as presented</li>
      </ul>
      <p>{{ $t('queryPage.download_data_info_2') }}</p>
      <BaseButton
        :text="$t('next')"
        @click="page = 2"
        class="ml-auto"
      />
    </div>
    <div v-if="page === 2" class="flex flex-col mb-2 w-[33vw] space-y-2">
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
            to="https://creativecommons.org/licenses/by-sa/4.0/"
            class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
          >CC BY-SA 4.0</NuxtLink>
        </p>
      </div>
      <div class="flex justify-end space-x-4 mt-2">
        <BaseButton
          :text="$t('precompiledFilePage.agree_button')"
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
