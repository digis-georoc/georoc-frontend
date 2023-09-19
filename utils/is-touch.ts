function checkTouchDevice() {
  console.log('ontouchstart' in window, navigator.maxTouchPoints)
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
}

const isTouchDevice = ref(checkTouchDevice())

export { isTouchDevice }
