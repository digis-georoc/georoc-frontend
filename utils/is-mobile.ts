
const mobileBreakpoint = 1280 // xl
const isMobile = ref(window.innerWidth <= mobileBreakpoint);
window.onresize = () => isMobile.value = window.innerWidth <= mobileBreakpoint

export { isMobile }
