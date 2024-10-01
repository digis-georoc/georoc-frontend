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

const rowCheckbox = (options: ColumnPassThroughMethodOptions) => {
  return {
    root: {
      class: [
        'relative me-2 border-2 rounded w-[22px] h-[22px] transition-colors flex items-center justify-center',
        {
          'bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary': !options.context.checked,
          'bg-primary border-primary dark:border-primary text-white hover:bg-primary-700': options.context.checked,
        }
      ]
    },
    input: 'absolute w-full h-full top-0 left-0 opacity-0',
    box: 'flex items-center'
  }
}
</script>

<template>
  <DataTable
    :value="rows"
    :paginator="true"
    :rows="rows.length >= 20 ? 20 : rows.length"
    :rowsPerPageOptions="[5, 10, 15, 20].filter(elem => elem < rows.length).concat(rows.length)"
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
      wrapper: {
        class: 'pb-4'
      },
      table: {
        class: 'w-full',
      },
      headerRow: {
        class: 'border-b dark:border-gray-600',
      },
      bodyRow: {
        class: [
          'text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-400',
          'dark:hover:bg-opacity-[0.2]',
          'hover:bg-opacity-[0.4]',
          'text-base font-normal',
        ],
      },
      paginator: {
        root: {
          class:
            'flex flex-wrap items-center justify-center space-x-2 text-gray-500 border-t dark:border-gray-600 py-4 dark:text-white/60',
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
              'p-1 inline-flex items-center cursor-pointer rounded-md transition-colors duration-200 border-2 dark:border-gray-600',
              'hover:bg-primary-50 dark:hover:bg-gray-700 hover:border-primary hover:text-black dark:hover:text-gray-400',
            ],
          },
          input: {
            class: 'p-1 select-none',
          },
          wrapper: {
            class: 'rounded-md border-2 my-1 bg-white dark:bg-gray-800',
          },
          item: (options: DropdownPassThroughMethodOptions) => {
            return {
              class: [
                'flex justify-center p-2 hover:bg-gray-300 hover:bg-opacity-[0.4] dark:hover:text-black cursor-pointer',
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
      <BaseInput
        v-model="filters['global'].value"
        :placeholder="t('search') + '...'"
        search
        :unstyled="true"
        class="xl:w-1/3 p-1"
      ></BaseInput>
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
        v-if="multiselect && typeof selected !== 'undefined' && selected?.length > 0"
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
        rowCheckbox,
        headerCheckBox: rowCheckbox
      }"
    >
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
            {
              'cursor-pointer': col.field != 'persistentUrl',
            },
          ],
        }),
        headerTitle: {
          class: 'text-left',
        },
        sort: (options: ColumnPassThroughMethodOptions) => ({
          class: [
            'cursor-pointer rounded-md pb-1 px-2 hover:bg-gray-100 transition-colors',
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
