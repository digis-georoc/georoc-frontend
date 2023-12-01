<script setup lang="ts">
import type {TreeNode} from "primevue/tree";

const store = useChemistryStore()

const props = defineProps<{
  items: TreeNode[]
}>()

const emit = defineEmits<{
  update: [item: TreeNode[]]
}>()

const _items = ref<TreeNode[]>([])
const collapseState = ref<boolean[]>([])

watch(() => store.selected, (value) =>  {
  _items.value = value
  collapseState.value = new Array(value.length).fill(true)
})

function onUpdate(data: { min: number, max: number }, itemIndex: number, childIndex: number) {
  if (itemIndex < 0) return
  if (!Array.isArray(_items.value[itemIndex].children)) return
  if (childIndex < 0) return
  _items.value[itemIndex].children[childIndex].data = data

  store.selected = [..._items.value]
}

function remove(itemIndex: number, childIndex: number) {
  _items.value[itemIndex].children?.splice(childIndex)
  store.selected = [..._items.value]
}

</script>

<template>
  <template v-if="_items.length === 0">
    <div class="text-sm text-stone-400">{{ $t('no_options_selected') }}.</div>
  </template>
  <template v-else>
    <div class="flex flex-1 flex-col mb-2" v-for="(item, i) in _items" :key="item.key">
      <h3 class="font-semibold mb-2">{{ item.label }}:</h3>
      <div class="ps-4" >
        <div class="flex flex-col overflow-hidden relative scroll-gradient" :class="{ 'max-h-[280px]': collapseState[i], 'max-h-auto': !collapseState[i]}">
          <div class="flex text-sm font-semibold mb-2">
            <div class="w-5/12 flex-shrink-0">
              <h4>{{ $t('element') }}</h4>
            </div>
            <div class="w-2/12 mr-3">
              <h4>{{ $t('min') }}</h4>
            </div>
            <div class="w-2/12 mr-3">
              <h4>{{ $t('max') }}</h4>
            </div>
            <div class="w-2/12">
              <h4>{{ $t('unit') }}</h4>
            </div>
            <div class="w-1/12">
            </div>
          </div>
          <div class="flex flex-1 mb-3 text-zinc-500" v-for="(child, j) in item.children">
            <div class="w-5/12 flex-shrink-0 flex items-center">
              {{ child.label }}
            </div>
            <div class="w-2/12 mr-3 flex items-center">
              <BaseInput
                  type="number"
                  placeholder=""
                  size="sm"
                  :model-value="child.data?.min"
                  @update:modelValue="onUpdate({ min: $event, max: child.data.max }, i, j)"
              />
            </div>
            <div class="w-2/12 mr-3 flex items-center">
              <BaseInput
                  type="number"
                  placeholder=""
                  size="sm"
                  :model-value="child.data?.max"
                  @update:modelValue="onUpdate({ min: child.data.min, max: $event }, i, j)"
              />
            </div>
            <div class="w-2/12 flex items-center">
              ppm
            </div>
            <div class="w-1/12 flex items-center justify-end">
              <BaseButton icon="ic:close" display="outline" size="small" @click="remove(i, j)"/>
              <!--          <Icon name="ic:close" @click="remove(i, j)" class="cursor-pointer"/>-->
            </div>
          </div>
        </div>
        <BaseButton
            :text="$t('show_more_less')"
            size="small"
            display="outline"
            class="w-full"
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
}
</style>
