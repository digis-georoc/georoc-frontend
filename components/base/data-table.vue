<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from 'primevue/api'
import type { ColumnPassThroughMethodOptions } from 'primevue/column'
import type { DropdownPassThroughMethodOptions } from 'primevue/dropdown'
import type { PaginatorPassThroughMethodOptions } from 'primevue/paginator'
import type { Nullable } from 'primevue/ts-helpers'

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    rows: any
    columns: {
      field: string
      header: string
      isSlot?: boolean
    }[]
    linkToDatasetText: string
    multiselect?: boolean
  }>(),
  {
    rows: [],
    linkToDatasetText: 'view',
    multiselect: false,
  },
)
defineExpose({
  deselectAll: () => {
    selected.value = []
  },
})
let filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
let selected = ref()
let selectAll = ref<Nullable<boolean>>()
//page buttons for Paginator need the same styling, but passtrough options can only be assigned indidually
const getPaginatorButton = (options: PaginatorPassThroughMethodOptions) => ({
  class: [
    'rounded-md transition-colors duration-200 min-w-[2.5rem] h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-primary-300',
    {
      'hover:bg-primary-50 dark:hover:bg-primary-100 dark:text-white hover:text-black':
        !options.context.disabled,
    },
  ],
})
</script>

<template>
  <DataTable
    :value="rows"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[5, 10, 15, 20]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :currentPageReportTemplate="
      t('showing_first_to_last_of_total_entries', {
        first: '{first}',
        last: '{last}',
        totalRecords: '{totalRecords}',
      })
    "
    :removableSort="true"
    v-model:filters="filters"
    :globalFilterFields="columns.map((col: any) => col.field)"
    v-model:selection="selected"
    v-model:selectAll="selectAll"
    :unstyled="true"
    :pt="{
      root: {
        class: 'flex-1 overflow-auto',
      },
      table: {
        class: 'w-full',
      },
      headerRow: {
        class: 'border-b-2',
      },
      bodyRow: {
        class: [
          'text-stone-800 dark:text-zinc-300 hover:bg-stone-300 dark:hover:bg-stone-400',
          'dark:hover:bg-opacity-[0.2]',
          'hover:bg-opacity-[0.4]',
          'text-base font-normal',
        ],
      },
      paginator: {
        root: {
          class:
            'flex flex-wrap items-center justify-center space-x-2 text-gray-500 border-t-2 py-2 dark:text-white/60',
        },
        start: {
          class: {
            'flex-1':
              multiselect &&
              typeof selected !== 'undefined' &&
              selected.length > 0,
          },
        },
        firstPageButton: getPaginatorButton,
        previousPageButton: getPaginatorButton,
        nextPageButton: getPaginatorButton,
        lastPageButton: getPaginatorButton,
        pages: {
          class: 'space-x-2',
        },
        pageButton: (options: PaginatorPassThroughMethodOptions) => {
          return {
            class: [
              'rounded-md text-center transition-colors duration-200 min-w-[2.5rem] h-[2.5rem]',
              'focus:outline-none focus:ring-2 focus:ring-primary-300 hover:bg-primary-50 dark:hover:bg-primary-100 hover:text-black',
              {
                'dark:text-white': !options.context.active,
                'bg-primary-50 hover:bg-primary-100 dark:bg-primary-300 dark:text-black':
                  options.context.active,
              },
            ],
          }
        },
        rowPerPageDropdown: {
          root: {
            class: [
              'p-1 inline-flex items-center cursor-pointer rounded-md transition-colors duration-200 border-2',
              'hover:bg-primary-50 hover:border-primary hover:text-black',
            ],
          },
          input: {
            class: 'p-1 select-none',
          },
          wrapper: {
            class: 'rounded-md border-2 my-1 bg-white dark:bg-zinc-800',
          },
          item: (options: DropdownPassThroughMethodOptions) => {
            return {
              class: [
                'flex justify-center p-2 hover:bg-stone-300 hover:bg-opacity-[0.4] dark:hover:text-black cursor-pointer',
                {
                  'bg-primary-50 dark:text-black': options.context.selected,
                },
              ],
            }
          },
        },
      },
    }"
  >
    <template #header>
      <Icon :name="'heroicons:magnifying-glass'" class="justify-center" />
      <InputText
        v-model="filters['global'].value"
        :placeholder="t('search')"
        :unstyled="true"
        :pt="{
          root: {
            class:
              'p-1 border-2 border-transparent rounded-md bg-transparent transistion-color duration-200 hover:border-primary',
          },
        }"
      ></InputText>
    </template>
    <template #empty>{{ $t('no_matching_records_found') }}</template>
    <template #paginatorfirstpagelinkicon
      ><Icon
        :name="'prime:angle-double-left'"
        class="min-w-[1.5rem] min-h-[1.5rem]"
    /></template>
    <template #paginatorprevpagelinkicon
      ><Icon :name="'prime:angle-left'" class="min-w-[1.5rem] min-h-[1.5rem]"
    /></template>
    <template #paginatornextpagelinkicon
      ><Icon :name="'prime:angle-right'" class="min-w-[1.5rem] min-h-[1.5rem]"
    /></template>
    <template #paginatorlastpagelinkicon
      ><Icon
        :name="'prime:angle-double-right'"
        class="min-w-[1.5rem] min-h-[1.5rem]"
    /></template>
    <template #paginatorrowsperpagedropdownicon
      ><Icon :name="'prime:angle-down'" class="min-w-[1.5rem] min-h-[1.5rem]"
    /></template>
    <template #paginatorstart>
      <div
        v-if="
          multiselect && typeof selected !== 'undefined' && selected?.length > 0
        "
        class="flex items-start"
      >
        <slot
          :name="'selectEventButton'"
          :selected="selected"
          :allSelected="selected.length == rows.length"
        ></slot>
      </div>
    </template>
    <Column
      :selectionMode="multiselect ? 'multiple' : undefined"
      :unstyled="true"
      :pt="{
        root: {
          class: 'px-1 py-2 align-left',
        },
        headerContent: {
          class: 'flex justify-left items-center space-x-4',
        },
        checkbox: {
          class: 'hover:cursor-pointer',
        },
      }"
    >
      <template #rowcheckboxicon="{ checked }">
        <Icon
          v-if="checked"
          :name="'material-symbols-light:check-box-outline'"
          class="min-w-[1.5rem] min-h-[1.5rem]"
        />
        <Icon
          v-if="!checked"
          :name="'material-symbols-light:check-box-outline-blank'"
          class="min-w-[1.5rem] min-h-[1.5rem]"
        />
      </template>
      <template #headercheckboxicon="{ checked }">
        <Icon
          v-if="checked"
          :name="'material-symbols-light:check-box-outline'"
          class="min-w-[1.5rem] min-h-[1.5rem]"
        />
        <Icon
          v-if="!checked"
          :name="'material-symbols-light:check-box-outline-blank'"
          class="min-w-[1.5rem] min-h-[1.5rem]"
        />
      </template>
    </Column>
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="col.field != 'persistentUrl'"
      :unstyled="true"
      :pt="{
        root: {
          class: 'px-1 py-2',
        },
        headerContent: (options: ColumnPassThroughMethodOptions) => ({
          class: [
            'flex justify-left items-center space-x-4',
            {
              'text-primary-300': options.context.sorted,
            },
          ],
        }),
        headerTitle: {
          class: 'text-left',
        },
        sort: (options: ColumnPassThroughMethodOptions) => ({
          class: [
            'rounded-md border-2 pb-1 px-1 hover:border-primary transition-colors',
            {
              'text-primary': options.context.sorted,
            },
          ],
        }),
      }"
    >
      <template #body="{ data }" v-if="col.field == 'persistentUrl'">
        <NuxtLink
          :to="data.persistentUrl"
          class="border-b-primary hover:border-b-2"
          target="_blank"
          ><Icon :name="'prime:external-link'"></Icon>
          {{ linkToDatasetText }}</NuxtLink
        >
      </template>
      <template #body="{ data }" v-if="col.isSlot">
        <slot :name="`${data[col.field]}`">{{ data[col.field] }}</slot>
      </template>
      <template #sorticon="{ sorted, sortOrder }">
        <Icon :name="'typcn:arrow-unsorted'" v-if="!sorted"></Icon>
        <Icon :name="'typcn:arrow-sorted-down'" v-if="sortOrder == -1"></Icon>
        <Icon :name="'typcn:arrow-sorted-up'" v-if="sortOrder == 1"></Icon>
      </template>
    </Column>
  </DataTable>
</template>
