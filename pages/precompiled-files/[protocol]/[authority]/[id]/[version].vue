<template>
  <PageContainer>
    <div v-if="precompiledPreviewError">
      <PageHead headline="Precompiled Files"></PageHead>
      <BaseError
        :error="precompiledPreviewError"
        :redirect-text="`${t('precompiledFilePage.error_redirect_button')}`"
      ></BaseError>
    </div>
    <div v-else-if="precompiledFilesError">
      <PageHead :headline="`Precompiled Files: ${authority}/${id}`"></PageHead>
      <BaseError
        :error="precompiledFilesError"
        :redirect-text="`${t('precompiledFilePage.error_redirect_button')}`"
      ></BaseError>
    </div>
    <div v-else-if="precompiledFiles">
      <section>
        <BaseFluidContainer>
          <div
            class="flex flex-wrap pt-8 pb-1 first-letter:space-x-4 space-y-2 md:justify-between justify-start items-center"
          >
            <h1 class="text-3xl font-bold">Precompiled Files</h1>
            <NuxtLink
              to="#concept"
              class="hover:underline underline-offset-4 underline-primary p-2 inline-flex items-center justify-center rounded-md"
            >
              <Icon name="fluent:info-24-regular" class="text-base mr-1" />
              {{ $t('precompiledFilePage.headline_1') }}
            </NuxtLink>
          </div>
          <div
            class="sticky top-[4rem] bg-white dark:bg-zinc-800 ring-2 ring-white dark:ring-zinc-800 z-[1009] py-2"
          >
            <div
              class="flex flex-col md:flex-row flex-wrap md:space-x-4 space-y-2 justify-start md:items-center items-start"
            >
              <h2 class="text-xl font-bold">{{ precompiledFiles.title }}</h2>
              <BaseDropdown
                :links="links"
                :buttontext="t('precompiledFilePage.change_button')"
              ></BaseDropdown>
              <button
                class="underline underline-offset-4 text-primary dark:text-primary-100"
                @click="
                  openDialog(
                    {
                      identifier: precompiledFiles.datasetPersistentId,
                      isDataset: true,
                      filetitle: `${precompiledFiles.productionDate}_${precompiledFiles.title}`,
                      version: precompiledFiles.version,
                    },
                    {
                      identifier: precompiledFiles.datasetPersistentId,
                      version: precompiledFiles.version,
                    },
                  )
                "
              >
                {{ $t('precompiledFilePage.download_complete_dataset_button') }}
              </button>
            </div>
          </div>
          <div
            v-if="
              latestVersion?.major !== precompiledFiles.version.major ||
              latestVersion.minor !== precompiledFiles.version.minor
            "
            class="bg-primary-50 dark:bg-zinc-700 rounded-2xl p-3 flex items-center justify-start space-x-4"
          >
            <Icon
              :name="'fluent:info-24-filled'"
              class="h-6 w-6 shrink-0 text-primary"
            ></Icon>
            <i18n-t
              keypath="precompiledFilePage.version_hint"
              tag="p"
              scope="global"
            >
              <template v-slot:current_version>
                {{
                  `${precompiledFiles.version.major}.${precompiledFiles.version.minor}`
                }}
              </template>
              <template v-slot:latest_version>
                {{ `${latestVersion?.major}.${latestVersion?.minor}` }}
              </template>
              <template v-slot:link_latest_version>
                <NuxtLink
                  :to="
                    links.find((link) => {
                      return link.label === precompiledFiles?.title
                    })?.href
                  "
                  class="underline underline-offset-4 text-primary dark:text-primary-100"
                >
                  {{ $t('precompiledFilePage.link_latest_version') }}
                </NuxtLink>
              </template>
              <template v-slot:link_all_versions>
                <NuxtLink
                  :to="precompiledFiles.persistentUrl"
                  class="underline underline-offset-4 text-primary dark:text-primary-100"
                >
                  {{ $t('precompiledFilePage.link_all_versions') }}
                </NuxtLink>
              </template>
            </i18n-t>
          </div>
          <BaseTabs :headers="tabHeaders" class="pt-4">
            <template #[fileslot]>
              <div class="py-4">
                <BaseDataTable
                  ref="datatableRef"
                  :rows="precompiledFiles.files"
                  :columns="columns"
                  link-to-dataset-text="view original"
                  :multiselect="true"
                >
                  <template
                    #[file.label]
                    v-for="file in precompiledFiles.files"
                  >
                    <button
                      class="underline underline-offset-4 text-primary dark:text-primary-100"
                      @click="
                        openDialog(
                          {
                            identifier: file.id,
                            isDataset: false,
                            filetitle: file.label,
                          },
                          {
                            identifier: precompiledFiles.datasetPersistentId,
                            version: precompiledFiles.version,
                          },
                        )
                      "
                    >
                      {{ file.label }}
                    </button>
                  </template>
                  <template #selectEventButton="{ selected, allSelected }">
                    <BaseButton
                      @click="
                        openDialog(
                          {
                            identifier: selected.map(
                              (element: any) => element.id,
                            ),
                            isDataset: false,
                            filetitle: allSelected
                              ? `${precompiledFiles.productionDate}_${precompiledFiles.title}`
                              : selected.length == 1
                                ? selected[0].label
                                : `${precompiledFiles.productionDate}_${precompiledFiles.title}_SELECTION`,
                          },
                          {
                            identifier: precompiledFiles.datasetPersistentId,
                            version: precompiledFiles.version,
                          },
                        )
                      "
                      :text="t('precompiledFilePage.download_selection_button')"
                    ></BaseButton>
                  </template>
                </BaseDataTable>
              </div>
            </template>
            <template #[metaslot]>
              <div class="py-4 overflow-x-auto">
                <table class="table-auto">
                  <tbody>
                    <tr
                      v-for="entry in metaData"
                      class="border-8 border-transparent"
                    >
                      <td
                        class="min-w-[11rem] align-top font-semibold border-r-4 border-transparent"
                      >
                        {{ entry.subtitle }}:
                      </td>
                      <td class="align-top">
                        <a
                          v-if="entry.isLink"
                          :href="entry.data"
                          target="_blank"
                          class="hover:border-b-primary border-transparent border-b-2"
                          >{{ entry.data }}</a
                        ><span v-else>{{ entry.data }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </BaseTabs>
        </BaseFluidContainer>
      </section>
      <PrecompiledFilesConcept />
    </div>
  </PageContainer>
  <BaseDialog
    :closable="true"
    :title="t('precompiledFilePage.license_header')"
    v-model="isOpen"
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
          :to="precompiledFiles?.license.uri"
          class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
          >{{ precompiledFiles?.license.name }}</NuxtLink
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

  <BaseDialog
    :closable="true"
    :title="`${downloadError.statusCode}: ${t('oh_no_something_went_wrong')}`"
    v-model="errorIsOpen"
  >
    <p>{{ downloadError.statusMessage }}</p>
  </BaseDialog>

  <BaseLoadingIndicator v-model="isLoading"></BaseLoadingIndicator>
</template>
<script setup lang="ts">
import { FetchError } from 'ofetch'
import JSZip from 'jszip'
const { t } = useI18n()
const route = useRoute()

let precompiledFilePreviewArr: PrecompiledFilePreview[] | undefined
let precompiledPreviewError: FetchError | undefined
try {
  precompiledFilePreviewArr = (<PrecompiledFilePreviews>(
    await getPrecompiledPreview()
  )).preview
} catch (error: any) {
  precompiledPreviewError = error
}

const links: {
  href: string
  label: string
  isCurrent?: boolean
}[] = []

if (precompiledFilePreviewArr) {
  for (let preview of precompiledFilePreviewArr) {
    links.push({
      href: `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}/${preview.version.major}.${preview.version.minor}`,
      label: preview.title,
      isCurrent:
        `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}/${preview.version.major}.${preview.version.minor}` ===
        route.fullPath,
    })
  }
}

const protocol: string = Array.isArray(route.params.protocol)
  ? route.params.protocol[0]
  : route.params.protocol
const authority: string = Array.isArray(route.params.authority)
  ? route.params.authority[0]
  : route.params.authority
const id: string = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id
const version: string = Array.isArray(route.params.version)
  ? route.params.version[0]
  : route.params.version

let precompiledFiles: PrecompiledFiles | undefined
let precompiledFilesError: FetchError | undefined

try {
  precompiledFiles = <PrecompiledFiles>(
    await getPrecompiledFiles(protocol, authority, id, version)
  )
} catch (error: any) {
  precompiledFilesError = error
}

const latestVersion = precompiledFilePreviewArr?.find((preview) => {
  return (
    `${preview.protocol}:${preview.authority}/${preview.identifier}` ===
    precompiledFiles?.datasetPersistentId
  )
})?.version

const tabHeaders = [
  t('precompiledFilePage.tabheader_1'),
  t('precompiledFilePage.tabheader_2'),
]
const fileslot = `${tabHeaders[0]}-slot`
const metaslot = `${tabHeaders[1]}-slot`

const emit = defineEmits(['submit', 'open', 'close'])
const isOpen = ref(false)
const isLoading = ref(false)
const errorIsOpen = ref(false)

const downloadError = { statusCode: 500, statusMessage: '' }

let downloadOptions: DownloadOptions
let metadataDownloadOptions: MetaDataDownloadOptions
const datatableRef = ref()

const columns = [
  {
    field: 'contentType',
    header: t('precompiledFilePage.table_header_1'),
  },
  {
    field: 'label',
    header: t('precompiledFilePage.table_header_2'),
    isSlot: true,
  },
  {
    field: 'filesize',
    header: t('precompiledFilePage.table_header_3'),
  },
  {
    field: 'persistentUrl',
    header: t('precompiledFilePage.table_header_4'),
  },
]

const authorString: string = formatAuthors(precompiledFiles?.authors)

const metaData = [
  {
    subtitle: t('precompiledFilePage.meta_data_1'),
    data: precompiledFiles?.persistentUrl,
    isLink: true,
  },
  {
    subtitle: t('precompiledFilePage.meta_data_2'),
    data: precompiledFiles?.datasetPersistentId,
  },

  {
    subtitle: t('precompiledFilePage.meta_data_3'),
    data: precompiledFiles?.publicationDate,
  },
  {
    subtitle: t('precompiledFilePage.meta_data_4'),
    data: precompiledFiles?.title,
  },
  {
    subtitle:
      precompiledFiles && precompiledFiles?.authors.length > 1
        ? t('precompiledFilePage.meta_data_5_pl')
        : t('precompiledFilePage.meta_data_5_sing'),
    data: authorString,
  },
  {
    subtitle: t('precompiledFilePage.meta_data_6'),
    data: `${precompiledFiles?.version.major}.${precompiledFiles?.version.minor}`,
  },
  {
    subtitle: t('precompiledFilePage.meta_data_7'),
    data: precompiledFiles?.description,
  },
  {
    subtitle: t('precompiledFilePage.meta_data_8'),
    data: precompiledFiles?.subject,
  },
]

async function onSubmit() {
  emit('submit')
  isOpen.value = false
  isLoading.value = true
  if (datatableRef.value != null) {
    datatableRef.value.deselectAll()
  }
  if (downloadOptions.identifier) {
    await download(downloadOptions, metadataDownloadOptions)
  }
  isLoading.value = false
}

function openDialog(
  options: DownloadOptions,
  optionsMeta: MetaDataDownloadOptions,
) {
  emit('open')
  downloadOptions = options
  metadataDownloadOptions = optionsMeta
  isOpen.value = true
}
function closeDialog() {
  emit('close')
  isOpen.value = false
}
function openDownloadErrorDialog(statusCode: number, statusMessage: string) {
  downloadError.statusCode = statusCode
  downloadError.statusMessage = statusMessage
  errorIsOpen.value = true
}
/**
 * Fetches a Dataset or Datafile(s) and the metadata of the compilation from the server, zipps the files and initiates a download by the clients browser.
 * All files will be downloaded as zip files.
 * @param downloadOptions includes { identifier, isDataset, version? } => if isDataset is false, individual file identifier need to be provided as the identifier, else a dataset identifier and a version is required.
 * @param metadataDownloadOptions includes { identifier, version } => dataset identifier and the version of the dataset
 */
async function download(
  downloadOptions: DownloadOptions,
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

/**
 * Formats an Array of authornames as a string where the names are seperated by a comma.
 * @param authors Author-array.
 */
function formatAuthors(authors: string[] | undefined) {
  if (!authors) return ''
  let authorString = ''
  for (let i = 0; i < authors.length; i++) {
    authorString =
      i == 0
        ? authorString.concat(authors[i])
        : authorString.concat(', ', authors[i])
  }
  return authorString
}
</script>
