<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L, {GeoJSON, LatLng, LatLngBounds} from "leaflet"
import {theme} from "#tailwind-config";

const props = defineProps<{
  lng: string | null,
  lat: string | null
}>()

const initialZoomLevel = 2
let map: any = null

const layers = [
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }),
  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Participants, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }),
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Participants, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }),
]

onMounted(() => {

  if (!props.lat || !props.lng) return

  map = L.map('map', {
    wheelDebounceTime: 100,
    zoomSnap: 0.5,
    zoomControl: false,
    layers
  }).setView([parseFloat(props.lat), parseFloat(props.lng)], initialZoomLevel)

  createPointMarker([parseFloat(props.lat), parseFloat(props.lng)]).addTo(map)
})

function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}

function createPointMarker(latlng: LatLng) {
  let icon = L.icon({
    iconUrl: useAsset('images/marker.png'),
    shadowUrl: useAsset('images/marker-shadow.png'),
    iconSize:     [25, 34], // width and height of the image in pixels
    shadowSize:   [35, 20], // width, height of optional shadow image
    iconAnchor:   [12, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 20],  // anchor point of the shadow. should be offset
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })

  return L.marker(latlng, { icon })
}

</script>

<template>
  <div id="map" class="h-[300px]"></div>
</template>

<style scoped>

</style>
