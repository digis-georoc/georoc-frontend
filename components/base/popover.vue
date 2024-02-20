<script setup lang="ts">
const props = withDefaults(defineProps<{
  buttonStyles: string,
  buttonTitle: string
}>(), {
  buttonStyles: '',
  buttonTitle: ''
})

const isOpen = ref(false)

const popoverBtn = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)
const offsetLeft = 0
const offsetTop = 10
const contentTop = ref(0)
const contentLeft = ref(0)

const isScrollable = function (ele: HTMLElement | null) {
  // https://phuoc.ng/collection/html-dom/check-if-an-element-is-scrollable/

  if (!ele || !ele.scrollHeight) return false

  // Compare the height to see if the element has scrollable content
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

  // It's not enough because the element's `overflow-y` style can be set as
  // * `hidden`
  // * `hidden !important`
  // In those cases, the scrollbar isn't shown
  const overflowYStyle = window.getComputedStyle(ele).overflowY;
  const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

  return hasScrollableContent && !isOverflowHidden;
};

onMounted(() => {
  let parent = <HTMLElement | null>popoverBtn.value
  let scrollable = false
  while (parent !== null && !scrollable) {
    parent = <HTMLElement>parent.parentNode
    scrollable = isScrollable(parent);
  }

  if (!parent) return
  parent.addEventListener('scroll', () => {
    if (!popoverBtn.value) return
    setContentPosition(popoverBtn.value.getBoundingClientRect())
  })
})

function setContentPosition({ top, left, height }: DOMRect) {
  contentTop.value = top + height / 2 + offsetTop
  contentLeft.value = left + offsetLeft
}

function setOpen(event: Event, value: boolean) {
  isOpen.value = value
  if (!popoverBtn.value) return
  setContentPosition(popoverBtn.value.getBoundingClientRect())
  event.stopPropagation()
  if (value) document.addEventListener('click', handleClickOutside)
  else document.removeEventListener('click', handleClickOutside)
}

const handleClickOutside = (event: MouseEvent) => {
  if (!contentEl.value) return

  if (!contentEl.value.contains((<HTMLElement>event.target).parentNode)) {
    isOpen.value = false
  }
}
</script>
<template>
  <button ref="popoverBtn" :class="[buttonStyles, open ? '' : 'text-opacity-90']" @click="setOpen($event,true)">
    {{ buttonTitle }}
  </button>
  <Teleport to="body">
    <transition
      v-if="isOpen"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        ref="contentEl"
        :style="{top: `${contentTop}px`, left: `${contentLeft}px`}"
        class="fixed z-[9999] mt-3 bg-white dark:bg-zinc-800 rounded-xl border dark:border-zinc-600 py-3 px-4 shadow">
        <slot />
      </div>
    </transition>
  </Teleport>
</template>
