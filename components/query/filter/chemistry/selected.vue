<script setup lang="ts">
import type {TreeNode} from "primevue/tree";
import { getCleanChildKey } from "~/composables/tree";

const chemistryStore = useChemistryStore()
const queryStore = useQueryStore()

const emit = defineEmits<{
  update: [item: TreeNode[]]
}>()

const _items = ref<TreeNode[]>([])
const collapseState = ref<boolean[]>([])
const maxVisibleItems = 5

watch(() => chemistryStore.selected, (value) =>  {
  _items.value = value
    .sort(sortAlphabetically)
    .map((item) => {
      item.children = item.children?.sort(sortAlphabetically)
      return item
    })

  if ( value.length > collapseState.value.length) {
    collapseState.value = [
      ...collapseState.value,
      ...new Array(value.length - collapseState.value.length).fill(true)
    ]
  }
})

onMounted(() => {
  collapseState.value = new Array(chemistryStore.selected.length).fill(true)
})

function sortAlphabetically(a: TreeNode, b: TreeNode) {
  if (a.label < b.label) return -1
  if (a.label > b.label) return 1
  return 0
}

function onUpdate(data: { min: number, max: number }, itemIndex: number, childIndex: number) {
  if (itemIndex < 0) return
  if (!Array.isArray(_items.value[itemIndex].children)) return
  if (childIndex < 0) return
  const oldData = _items.value[itemIndex].children[childIndex].data
  _items.value[itemIndex].children[childIndex].data = {...oldData, ...data}

  chemistryStore.selected = [..._items.value]
  useFilter()
}

function remove(itemIndex: number, childIndex: number) {
  _items.value[itemIndex].children?.splice(childIndex, 1)
  if (_items.value[itemIndex].children?.length === 0) {
    _items.value.splice(itemIndex, 1)
    collapseState.value.splice(itemIndex, 1)
  }
  chemistryStore.selected = [..._items.value]
  useFilter()
}

function isExpandable(itemsAmount: number) {
  return itemsAmount > maxVisibleItems
}

function useFilter() {
  const value = toQuery(chemistryStore.selected)

  if (value === '') {
    queryStore.unsetFilter(QueryKey.Chemistry)
  } else {
    queryStore.setPanelFilter({
      name: QueryKey.Chemistry,
      value
    })
  }
}

function toQuery(selected: TreeNode[]) {
  return selected
      .reduce((acc, cur) => {
        const children = cur.children ?? []
        const tuples = children.map(({ data, key: childKey = '' }) => `(${cur.key},${getCleanChildKey(childKey)},${data.min ?? ''},${data.max ?? ''})`)
        return [...acc, ...tuples]
      }, <string[]>[])
      .join(',')
}
</script>

<template>
  <template v-if="_items.length > 0">
    <p class="text-sm text-gray-400 italic mb-4" v-html="$t('queryPage.filter_chemistry_units_message')"></p>
    <div class="flex flex-1 flex-col mb-2" v-for="(item, i) in _items" :key="item.key">
      <h3 class="font-semibold mb-2">{{ item.label }}:</h3>
      <div class="ps-4">
        <div
          class="flex flex-col overflow-y-clip relative"
          :class="{
            'scroll-gradient max-h-[250px]': isExpandable(item.children?.length ?? 0) && collapseState[i],
            'max-h-auto': isExpandable(item.children?.length ?? 0) && !collapseState[i]
          }"
        >
          <div class="flex text-sm border-b dark:border-gray-600 pb-1">
            <div class="w-3/12 pl-2 flex-shrink-0">
              <h4>{{ $t('element') }}</h4>
            </div>
            <div class="w-3/12 pl-2">
              <h4>{{ $t('min') }}</h4>
            </div>
            <div class="w-3/12 pl-2">
              <h4>{{ $t('max') }}</h4>
            </div>
            <div class="pl-2 w-2/12">
              <h4>{{ $t('unit') }}</h4>
            </div>
            <div class="w-1/12">
            </div>
          </div>
          <div class="rounded">
            <div class="flex flex-1 text-gray-500 dark:text-gray-400 py-1.5 pr-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700" v-for="(child, j) in item.children">
              <div class="w-3/12 flex-shrink-0 flex items-center pl-2 pr-2 py-1 border-r dark:border-gray-600" :title="child.label">
                <span class="overflow-x-auto xl:truncate" v-html="child.data?.structuredLabel ?? child.label"></span>
              </div>
              <div class="w-3/12 flex items-center px-2 py-1 border-r dark:border-gray-600">
                <BaseInput
                  v-if="child.data?.unit !== 'As in the database'"
                  type="number"
                  placeholder=""
                  size="sm"
                  :model-value="child.data?.min"
                  @update:modelValue="onUpdate({ min: $event, max: child.data.max }, i, j)"
                />
                <span v-else>-</span>
              </div>
              <div class="w-3/12 flex items-center px-2 py-1 border-r dark:border-gray-600">
                <BaseInput
                  v-if="child.data?.unit !== 'As in the database'"
                  type="number"
                  placeholder=""
                  size="sm"
                  :model-value="child.data?.max"
                  @update:modelValue="onUpdate({ min: child.data.min, max: $event }, i, j)"
                />
                <span v-else>-</span>
              </div>
              <div class="w-2/12 flex items-center justify-center text-gray-500 dark:text-gray-400 font-light pl-2 py-1">
                <span v-if="child.data.unit !== 'As in the database'">{{ child.data.unit }}</span>
                <span v-else :title="child.data.unit">
                  <Icon name="material-symbols:lock-outline" class="text-gray-300 dark:text-gray-500" />
                </span>
              </div>
              <div class="w-1/12 flex items-center justify-end">
                <BaseButton icon="ic:close" display="flat" class="text-primary" size="small" @click="remove(i, j)"/>
              </div>
            </div>
          </div>
        </div>
        <BaseButton
          v-if="isExpandable(item.children?.length ?? 0)"
          :text="$t(collapseState[i] ? 'show_all' : 'show_less')"
          size="small"
          display="flat"
          color="neutral"
          class="w-full relative z-10"
          @click="collapseState[i] = !collapseState[i]"
        />
      </div>
    </div>
  </template>
</template>

<style scoped>
.scroll-gradient::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25px;
  background: linear-gradient(rgba(255, 255, 255, 0.001), white); /* transparent keyword is broken in Safari */
  left: 0;
  pointer-events: none;

  .dark & {
    background: linear-gradient(rgba(0, 0, 0, 0.001), theme('colors.gray.800')); /* transparent keyword is broken in Safari */
  }
}
</style>
