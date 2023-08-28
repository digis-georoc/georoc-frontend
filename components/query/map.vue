<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { theme } from '#tailwind-config'

import L, {LatLng, LatLngBounds} from "leaflet"
import FreeDraw, { MarkerEvent } from "leaflet-freedraw"

import 'leaflet.markercluster/dist/leaflet.markercluster-src'
import { QueryLocationsResponse } from "~/types";
import {Feature, Polygon, Position} from "geojson";

const queryStore = useQueryStore()
const initialZoomLevel = 2
let map: any = null
let freeDraw: FreeDraw
const cachedClustersBounds = ref<LatLngBounds | null>(null)
const currentMapBounds = ref<LatLngBounds | null>(null)
const outOfBoundsSW = ref(false)
const outOfBoundsNE = ref(false)

const mouseLat = ref(0)
const mouseLng = ref(0)

let cachedZoomLevel = initialZoomLevel

function latLngToLngLat(latlng: LatLng) {
  return [latlng.lng, latlng.lat];
}

function lnglatToLatLng([lng, lat]: Position): LatLng {
  return new LatLng(lat, lng)
}

function isOutOfBounds(srcBounds: LatLngBounds | null, targetBounds: LatLngBounds | null) {
  if (!srcBounds || !targetBounds) return false
  return !targetBounds.contains(srcBounds)
}

function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}

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

function getLatLngBoundsFromBbox(bbox: Feature<Polygon>): LatLngBounds {
  if (!bbox.geometry.coordinates) {
    return map.getBounds();
  }
  const [sw, se, ne, nw] = bbox.geometry.coordinates[0]

  return new L.LatLngBounds(lnglatToLatLng(sw), lnglatToLatLng(ne))
}

function addControlLayer() {
  if (!map) return
  L.control.layers({
    'Streets': layers[0],
    'Topographic': layers[1],
    'Satellite': layers[2]
  }, {}, {position: 'topleft'}).addTo(map);
}

function createMarker(feature: Feature, latlng: LatLng) {
  // let icon = L.icon({
  //   iconUrl: useAsset('images/marker.png'),
  //   shadowUrl: useAsset('images/marker-shadow.png'),
  //   iconSize:     [25, 34], // width and height of the image in pixels
  //   shadowSize:   [35, 20], // width, height of optional shadow image
  //   iconAnchor:   [12, 34], // point of the icon which will correspond to marker's location
  //   shadowAnchor: [12, 20],  // anchor point of the shadow. should be offset
  //   popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  // })

  const iconWidth = 50
  const iconColor = theme.colors.stone['200']
  const text = feature.properties?.clusterSize

  const icon = L.divIcon({
    html: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="${iconWidth}"
        width="${iconWidth}"
        viewBox="0 0 120 120"
        fill="${iconColor}"
        stroke="${theme.colors.stone['400']}
      >
        <g fill="${iconColor}">
          <circle cx="60" cy="60" r="60" fill-opacity="0.20" />
          <circle cx="60" cy="60" r="54" fill-opacity="0" />
          <circle cx="60" cy="60" r="48" fill-opacity="0" />
          <circle cx="60" cy="60" r="42"  fill-opacity="0" />
          <circle cx="60" cy="60" r="54" />
        </g>
        <text
          x="60" y="60"
          text-anchor="middle"
          alignment-baseline="central"
          fill="black"
          font-size="24"
          >
          ${text}
        </text>
      </svg>
    `,

    className: "",
    iconSize: [iconWidth, iconWidth],
    iconAnchor: [iconWidth/2, iconWidth/2],
  });
  return L.marker(latlng, { icon })
}

function setBboxFilter() {
  const bounds = map.getBounds()
  queryStore.setFilter({
    name: 'bbox',
    value: [
      latLngToLngLat(bounds.getSouthWest()),
      latLngToLngLat(bounds.getSouthEast()),
      latLngToLngLat(bounds.getNorthEast()),
      latLngToLngLat(bounds.getNorthWest()),
    ]
  })
}

let polygon: Polygon

const markersGroup = L.featureGroup()

const mapSamples = computed(() => queryStore.result)

watch(() => mapSamples.value, (value: QueryLocationsResponse | null) => {
  if (!value) return
  markersGroup.clearLayers()

  let layerOptions = {
    pointToLayer: createMarker
  }

  // Add cluster markers
  markersGroup.addLayer(
    L.geoJSON(
      value.clusters
        .filter(({ centroid }) => centroid.geometry.coordinates !== null)
        .map(({ centroid }) => centroid),
      layerOptions
    )
  )

  // Add bounds polygon per cluster
  markersGroup.addLayer(
    L.geoJSON(
        value.clusters
          .filter(({ centroid, convexHull }) => centroid.geometry.coordinates !== null && convexHull.geometry.type === 'Polygon')
          .map(({ convexHull }) => convexHull)
    )
  )

  cachedClustersBounds.value = getLatLngBoundsFromBbox(value.bbox)
})

onMounted(() => {
  map = L.map('map', {
    wheelDebounceTime: 100,
    zoomSnap: 0.5,
    layers
  }).setView([0, 0], initialZoomLevel)

  addControlLayer()

  freeDraw = new FreeDraw({ mode: FreeDraw.NONE, strokeWidth:2 })
  map.addLayer(freeDraw)

  map.addLayer(markersGroup)

  setBboxFilter()

  map.on('moveend', () => {
    currentMapBounds.value = map.getBounds()
    const currentZoomLevel = map.getZoom()
    const isPan = cachedZoomLevel === currentZoomLevel

    if (isPan && !isOutOfBounds(currentMapBounds.value, cachedClustersBounds.value)) return

    setBboxFilter()

    cachedZoomLevel = currentZoomLevel
  });

  map.addEventListener('mousemove', (event) => {
    mouseLat.value = Math.round(event.latlng.lat * 100000) / 100000;
    mouseLng.value = Math.round(event.latlng.lng * 100000) / 100000;
});

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
  <div class="fixed z-[9999] top-[60px] right-0 bg-white p-2 text-sm">
    <h2 class="mb-2 font-bold">Debug:</h2>
    <div class="">Last Bbox from API: {{cachedClustersBounds}}</div>
    <div class="">Current Bbox: {{currentMapBounds}}</div>
    <div>Out of bounds SW: {{ outOfBoundsSW }}</div>
    <div>Out of bounds NE: {{ outOfBoundsNE }}</div>
  </div>
  <div class="absolute z-[1000] bottom-0 left-0 bg-white p-1 text-xs">
    <span>Latitude:</span><span>{{ mouseLat }}</span>&nbsp;
    <span>Longitude:</span><span>{{ mouseLng }}</span>
  </div>
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

.marker-cluster span {
  color: theme('colors.zinc.800');
}
</style>
