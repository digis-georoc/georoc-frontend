<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { theme } from '#tailwind-config'

import L, { Polygon } from "leaflet"
import FreeDraw from "leaflet-freedraw"

const queryStore = useQueryStore()
let map: any = null
let freeDraw: FreeDraw

let polygon: Polygon

onMounted(() => {
  map = L.map('map', {
    wheelDebounceTime: 100,
    zoomSnap: 0.5
  }).setView([51.505, -0.09], 2.5)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  freeDraw = new FreeDraw({ mode: FreeDraw.NONE, strokeWidth:2 })
  map.addLayer(freeDraw)

  freeDraw.on("markers",(event: any) => {
    if(event.eventType == 'create') {
      var latLngs: { lat: number, lng: number }[] = event.latLngs[0]

      queryStore.activeFilters.push({ name: 'draw', value: latLngs})

      freeDraw.clear()

      polygon = L.polygon(latLngs.map((latLng) => {
        return [latLng.lat,latLng.lng]
      }), {color: theme.colors.primary}).addTo(map)

      queryStore.stopDrawingOnMap();
    }
  })

  // L.DomEvent.on(map.getContainer(), 'wheel', (e)=>{
  //   var zoomBefore = map.getZoom();
  //   setTimeout(()=>{
  //     console.log('Zoom delta', zoomBefore - map.getZoom())
  //   }, 200);
  // });
})

const unsubscribe = queryStore.$onAction(
    ({ name }) => {
      if (name === 'startDrawingOnMap') {
        freeDraw.mode(FreeDraw.CREATE)
      } if (name === 'stopDrawingOnMap') {
        freeDraw.mode(FreeDraw.NONE)
      } else if (name === 'resetPolygonOnMap') {
        polygon.remove()
        freeDraw.mode(FreeDraw.NONE)
      }
    }
)
</script>
<template>
  <div id="map" class="h-full w-full"></div>
</template>
<style>
.mode-create {
  cursor: crosshair;
}
</style>
