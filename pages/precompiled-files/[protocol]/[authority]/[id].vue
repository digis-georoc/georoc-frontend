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
    <div v-else>
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
              class="flex flex-wrap space-x-4 space-y-2 md:justify-start justify-start items-center"
            >
              <h2 class="text-xl font-bold">{{ precompiledFiles?.title }}</h2>
              <BaseDropdown
                :links="links"
                :buttontext="t('precompiledFilePage.change_button')"
              ></BaseDropdown>
              <button
                class="underline underline-offset-4 text-primary dark:text-primary-100"
                @click="
                  openDialog({
                    identifier: precompiledFiles?.datasetPersistentId,
                    isDataset: true,
                    filetitle: `${precompiledFiles?.productionDate}_${precompiledFiles?.title}`,
                  })
                "
              >
                {{ $t('precompiledFilePage.download_complete_dataset_button') }}
              </button>
            </div>
          </div>

          <BaseTabs :headers="tabHeaders" class="pt-4">
            <template #[fileslot]>
              <div class="py-4">
                <BaseDataTable
                  :rows="precompiledFiles?.files"
                  :columns="columns"
                  link-to-dataset-text="view original"
                  :multiselect="true"
                >
                  <template
                    #[file.label]
                    v-for="file in precompiledFiles?.files"
                  >
                    <button
                      class="underline underline-offset-4 text-primary dark:text-primary-100"
                      @click="
                        openDialog({
                          identifier: file.persistentId,
                          isDataset: false,
                          filetitle: file.label,
                        })
                      "
                    >
                      {{ file.label }}
                    </button>
                  </template>
                  <template #selectEventButton="{ selected }">
                    <BaseButton
                      @click="
                        openDialog(
                          selected.map(({ persistentId, label }: any) => ({
                            identifier: persistentId,
                            isDataset: false,
                            filetitle: label,
                          })),
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
      <p class="">
        {{ $t('precompiledFilePage.license_paragraph_3_1') }}
        <NuxtLink
          to="https://dataverse.org/best-practices/dataverse-community-norms"
          class="border-b-2 border-gray-400 hover:border-b-primary text-primary dark:text-primary-100"
        >
          {{ $t('precompiledFilePage.license_paragraph_3_linktext') }}</NuxtLink
        >
        {{ $t('precompiledFilePage.license_paragraph_3_2') }}
      </p>
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
      href: `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}`,
      label: preview.title,
      isCurrent:
        `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}` ==
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

let precompiledFiles: PrecompiledFiles | undefined
let precompiledFilesError: FetchError | undefined

try {
  precompiledFiles = <PrecompiledFiles>(
    await getPrecompiledFiles(protocol, authority, id)
  )
} catch (error: any) {
  precompiledFilesError = error
}

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

const downloadOptions: DownloadOptions[] = []

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
    data: precompiledFiles?.description,
  },
  {
    subtitle: t('precompiledFilePage.meta_data_7'),
    data: precompiledFiles?.subject,
  },
]

async function onSubmit() {
  emit('submit')
  isOpen.value = false

  for (let downloadOption of downloadOptions) {
    isLoading.value = true
    if (downloadOption.identifier) {
      await download(
        downloadOption.identifier,
        downloadOption.isDataset,
        downloadOption.filetitle,
      )
    }
    isLoading.value = false
  }
  downloadOptions.splice(0, downloadOptions.length)
}

function openDialog(options: DownloadOptions | DownloadOptions[]) {
  emit('open')
  if (!Array.isArray(options)) {
    options = [options]
  }
  for (let option of options) {
    if (option.identifier) {
      downloadOptions.push(option)
    }
  }
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
 * Fetches a Dataset or Datafile from the server and initiates a download by the clients browser.
 * Datasets will be downloaded as zip files.
 * @param identifier Identifier of the file or dataset.
 * @param isDataset True, if a dataset should be downloaded.
 * @param filename How the downloaded dataset or file should be named.
 */
async function download(
  identifier: string,
  isDataset: boolean,
  filename: string,
) {
  let response: Blob | undefined
  let responseError: FetchError | undefined
  try {
    response = <Blob>await getPrecompiledFile(identifier, isDataset)
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
  if (response) {
    const link = document.createElement('a')
    const url = URL.createObjectURL(
      new Blob([response], { type: response.type }),
    )

    link.href = url
    link.download = filename
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
