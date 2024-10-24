<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L, { LatLng, type LatLngExpression } from 'leaflet'
import {theme} from "#tailwind-config";
import { getPointMarkerOptions } from '~/utils/marker'

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

const singleMarkerBgColor = theme.colors.white
const singleMarkerStrokeColor = theme.colors.gray['300']
const singleMarkerTextColor = theme.colors.gray['700']

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

function createPointMarker(latlng: LatLng | LatLngExpression) {
  const icon = L.divIcon(getPointMarkerOptions({
    fillColor: singleMarkerBgColor,
    textColor: singleMarkerTextColor,
    strokeColor: singleMarkerStrokeColor,
    text: '1'
  }))
  return  L.marker(latlng, { icon })
}

</script>

<template>
  <div id="map" class="h-[300px]"></div>
</template>

<style scoped>

</style>
