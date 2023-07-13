<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { theme } from '#tailwind-config'

import L, { Polygon } from "leaflet"
import FreeDraw, { MarkerEvent } from "leaflet-freedraw"

import 'leaflet.markercluster/dist/leaflet.markercluster-src'
import { QueryLocationsResponse } from "~/types";

const queryStore = useQueryStore()
let map: any = null
let freeDraw: FreeDraw

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

function addControlLayer() {
  if (!map) return
  L.control.layers({
    'Streets': layers[0],
    'Topographic': layers[1],
    'Satellite': layers[2]
  }, {}, {position: 'topleft'}).addTo(map);
}

function createMarker(latitude: number, longitude: number) {
  return L.marker(
    [latitude, longitude],
    { icon: L.divIcon(
        { className: 'marker-icon bg-primary border-2 border-primary-300 rounded-full' }
      )
    }
  )
}

let polygon: Polygon

const markersGroup = L.markerClusterGroup()

const mapSamples = computed(() => queryStore.result)

watch(() => mapSamples.value, (value: QueryLocationsResponse | null) => {
  if (!value) return
  markersGroup.clearLayers()

  if (!value.data) return

  value.data.forEach(
    ({ latitude, longitude }) => markersGroup.addLayer(createMarker(latitude, longitude))
  )
})

onMounted(() => {
  map = L.map('map', {
    wheelDebounceTime: 100,
    zoomSnap: 0.5,
    layers
  }).setView([19.74, -155.05], 2.5)

  addControlLayer()

  freeDraw = new FreeDraw({ mode: FreeDraw.NONE, strokeWidth:2 })
  map.addLayer(freeDraw)

  map.addLayer(markersGroup)

  freeDraw.on("markers",(event: MarkerEvent) => {
    if(event.eventType == 'create') {
      var latLngs: [number, number][] = event.latLngs[0].map(({lat, lng}) => [lng, lat])
      queryStore.setFilter({ name: 'polygon', value: latLngs})
      freeDraw.clear()

      polygon = L.polygon(latLngs.map(latLng => {
        const [lng, lat] = latLng
        return [lat, lng]
      }), {color: theme.colors.primary}).addTo(map)

      queryStore.stopDrawingOnMap()
    }
  })
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

.marker-icon {
  width: 16px;
  height: 16px;
}

.leaflet-top {
  top: 16px;
}

.leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
  border-color: theme('colors.zinc.400');
}

.leaflet-control-layers label:not(:last-child) {
  cursor: pointer;
  margin-bottom: 0.25rem;
}

.leaflet-control-layers-selector {
  appearance: none;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 1px solid;
  cursor: pointer;

  &:checked {
    border-color: theme('colors.primary');
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: theme('colors.primary');
    }
  }
}

.dark {
  .leaflet-bar a, .leaflet-control-layers {
    background: theme('colors.zinc.800');
    color: theme('colors.zinc.300');
    border-color: theme('colors.zinc.300');
  }

  .leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
    border-color: theme('colors.zinc.600');
  }

  .leaflet-control-layers-selector {
    background: theme('colors.zinc.800');
    border-color: theme('colors.zinc.600');
    &:checked {
      border-color: theme('colors.primary');
    }

  }
}
</style>
