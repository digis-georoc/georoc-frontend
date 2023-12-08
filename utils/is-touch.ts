function checkTouchDevice() {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
}

const isTouchDevice = ref(checkTouchDevice())

export { isTouchDevice }
