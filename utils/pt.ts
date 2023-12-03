import {PaginatorPassThroughMethodOptions} from "primevue/paginator";
import {DropdownPassThroughMethodOptions} from "primevue/dropdown";

const getPaginatorButton = (options: PaginatorPassThroughMethodOptions) => ({
  class: [
    'rounded-md transition-colors duration-200 min-w-[2.5rem] h-[2.5rem]',
    {
      'hover:bg-primary-50 dark:hover:bg-primary-100 dark:text-white hover:text-black': !options.context.disabled
    }
  ]
})

export const PaginatorPassThroughOptions = {
  root: {
    class: 'flex flex-wrap items-center justify-center space-x-2 text-gray-500 border-t px-4 py-2 dark:text-white/60'
  },
  firstPageButton: getPaginatorButton,
  previousPageButton: getPaginatorButton,
  nextPageButton: getPaginatorButton,
  lastPageButton: getPaginatorButton,
  pages: {
    class: 'space-x-2'
  },
  pageButton: (options : PaginatorPassThroughMethodOptions) => { return {
    class: [
      'rounded-md text-center transition-colors duration-200 min-w-[2.5rem] h-[2.5rem]',
      'focus:ring-2 focus:ring-primary-300 hover:bg-primary-50 dark:hover:bg-primary-100 hover:text-black',
      {
        'dark:text-white': !options.context.active,
        'bg-primary-50 hover:bg-primary-100 dark:bg-primary-300 dark:text-black': options.context.active
      }
    ]
  }},
  rowPerPageDropdown: {
    root: {
      class: ['p-1 inline-flex items-center cursor-pointer rounded-md transition-colors duration-200 border-2',
        'hover:bg-primary-50 hover:border-primary hover:text-black']
    },
    input: {
      class: 'p-1 select-none'
    },
    wrapper: {
      class: 'rounded-md border-2 my-1 bg-white dark:bg-zinc-800'
    },
    item: (options: DropdownPassThroughMethodOptions) => { return {
      class: [
        'flex justify-center p-2 hover:bg-stone-300 hover:bg-opacity-[0.4] dark:hover:text-black cursor-pointer',
        {
          'bg-primary-50 dark:text-black': options.context.selected
        }
      ]
    }}
  }
}
