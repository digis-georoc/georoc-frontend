<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

definePageMeta({
  layout: 'query',
})

onMounted(() => {
  const map = L.map('map', {
    wheelDebounceTime: 100
  }).setView([51.505, -0.09], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  // L.DomEvent.on(map.getContainer(), 'wheel', (e)=>{
  //   var zoomBefore = map.getZoom();
  //   setTimeout(()=>{
  //     console.log('Zoom delta', zoomBefore - map.getZoom())
  //   }, 200);
  // });
})

</script>
<template>
  <div class="flex h-full w-full">
    <div class="flex w-1/4 bg-white border-r">

    </div>
    <div class="flex w-3/4 h-full">
      <div id="map" class="h-full w-full"></div>
    </div>
  </div>

</template>
