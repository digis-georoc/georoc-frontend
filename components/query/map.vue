<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

import { theme } from '#tailwind-config'

import L, {GeoJSON, LatLng, LatLngBounds} from "leaflet"
import FreeDraw from 'leaflet-freedraw'
import type { MarkerEvent } from 'leaflet-freedraw'
import type { Feature, Polygon, Position } from "geojson";

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
let maxClusterSize = 0
const clusterColors = [theme.colors.lime['200'], theme.colors.amber['200'], theme.colors.orange['300']]

let cachedZoomLevel = initialZoomLevel

const isDebug = ref(window.location.href.includes('?debug'))
const isLoading = ref(false)

let shownCoveragePolygon: GeoJSON | null = null

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

function addControlLayers() {
  if (!map) return
  L.control.layers({
    'Streets': layers[0],
    'Topographic': layers[1],
    'Satellite': layers[2]
  }, {}, {position: 'bottomleft'}).addTo(map);

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);
}

function getClusterColor(size: number): string {
  if (size < maxClusterSize * 0.33) return clusterColors[0]
  else if (size >= maxClusterSize * 0.33 && size <= maxClusterSize * 0.66) return clusterColors[1]
  else if (size > maxClusterSize * 0.66) return clusterColors[2]
  else return theme.colors.stone['200']
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
  const iconColor = getClusterColor(feature.properties?.clusterSize)
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
  const marker = L.marker(latlng, { icon })
  marker.on('mouseover', () => showCoverage(feature.properties?.convexHull, {
    fillColor: iconColor,
    color: iconColor
  }))
  marker.on('mouseout', () => hideCoverage())

  return marker
}

function setBboxFilter() {
  const bounds = map.getBounds()

  const bbox = [
    latLngToLngLat(bounds.getSouthWest()),
    latLngToLngLat(bounds.getSouthEast()),
    latLngToLngLat(bounds.getNorthEast()),
    latLngToLngLat(bounds.getNorthWest()),
  ];

  queryStore.setBboxFilter({
    name: QueryKey.Bbox,
    value: bbox
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

  const clusterFeatures = value.clusters
    .filter(({ centroid }) => centroid.geometry.coordinates !== null)
    .map(({ centroid, convexHull }) => {
      if (!centroid.properties) centroid.properties = {}
      centroid.properties.convexHull = convexHull
      return centroid
    })

  const sizes = clusterFeatures.map(({ properties }) => properties?.clusterSize)

  maxClusterSize = Math.max(...sizes)

  // Add cluster markers
  markersGroup.addLayer(L.geoJSON(clusterFeatures, layerOptions))

  cachedClustersBounds.value = getLatLngBoundsFromBbox(value.bbox)
})

onMounted(() => {
  map = L.map('map', {
    wheelDebounceTime: 100,
    zoomSnap: 0.5,
    zoomControl: false,
    layers
  }).setView([0, 0], initialZoomLevel)

  addControlLayers()

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
      queryStore.setPanelFilter({ name: QueryKey.Polygon, value: latLngs})
      queryStore.execute()
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
    ({ name, args }) => {
      if (name === 'startDrawingOnMap') {
        freeDraw.mode(FreeDraw.CREATE)
      } if (name === 'stopDrawingOnMap') {
        freeDraw.mode(FreeDraw.NONE)
      } else if (name === 'resetPolygonOnMap') {
        polygon.remove()
        freeDraw.mode(FreeDraw.NONE)
      } else if (name === 'loadingQuery') {
        isLoading.value = args[0]
      }
    }
)

function showCoverage(convexHull: Feature, { fillColor, color }) {
  if (shownCoveragePolygon) {
    markersGroup.removeLayer(shownCoveragePolygon);
  }
  const options = {
    style: {
      fillColor,
      color,
      fillOpacity: 0.2
    }
  }
  shownCoveragePolygon = L.geoJSON(convexHull, options)
  markersGroup.addLayer(shownCoveragePolygon)
}

function hideCoverage() {
  if (shownCoveragePolygon) {
    markersGroup.removeLayer(shownCoveragePolygon)
    shownCoveragePolygon = null
  }
}

</script>
<template>
    <div id="map" class="h-full w-full"></div>
    <div
        v-if="isLoading"
        class="absolute z-[999] w-[150px] h-[100px]
    bg-black bg-opacity-50 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    flex flex-col items-center justify-center
    text-white pointer-events-none
    ">
      <BaseLoading class="mb-3 text-[2.5rem]" />
      <span class="opacity-[0.8]">{{ $t('loading') }}...</span>
    </div>
    <div v-if="isDebug" class="fixed z-[9999] top-[60px] right-0 bg-white p-2 text-sm">
      <h2 class="mb-2 font-bold">Debug:</h2>
      <div class="">Last Bbox from API: {{cachedClustersBounds}}</div>
      <div class="">Current Bbox: {{currentMapBounds}}</div>
      <div>Out of bounds SW: {{ outOfBoundsSW }}</div>
      <div>Out of bounds NE: {{ outOfBoundsNE }}</div>
    </div>
    <div v-if="!isMobile" class="absolute z-[1000] bottom-0 left-0 bg-white p-1 text-xs">
      <span>Latitude: </span><span>{{ mouseLat }}</span>&nbsp;
      <span>Longitude: </span><span>{{ mouseLng }}</span>
    </div>
    <div v-if="!isTouchDevice " class="absolute top-[26px] z-[1001] left-[20px]">
      <QueryFilterPolygon />
    </div>
</template>
<style>
.mode-create {
  cursor: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUgMTguMDhWMTloLjkybDkuMDYtOS4wNmwtLjkyLS45MnoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjAuNzEgNy4wNGEuOTk2Ljk5NiAwIDAgMCAwLTEuNDFsLTIuMzQtMi4zNGMtLjItLjItLjQ1LS4yOS0uNzEtLjI5cy0uNTEuMS0uNy4yOWwtMS44MyAxLjgzbDMuNzUgMy43NWwxLjgzLTEuODN6TTMgMTcuMjVWMjFoMy43NUwxNy44MSA5Ljk0bC0zLjc1LTMuNzVMMyAxNy4yNXpNNS45MiAxOUg1di0uOTJsOS4wNi05LjA2bC45Mi45Mkw1LjkyIDE5eiIvPjwvc3ZnPg==) 0 20, auto;
}

.marker-icon {
  width: 16px;
  height: 16px;
}

.leaflet-top {
  top: 16px;
}
.leaflet-control-container {
  .leaflet-control-layers {
    margin-bottom: 32px;
  }

  .leaflet-right {
    .leaflet-control-zoom {
      margin-right: 20px;
    }
  }

  .leaflet-left {
    .leaflet-control {
      margin-left: 20px;
    }
  }
}

.leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
  border-color: theme('colors.stone.400');
  border-width: 1px;
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

.loader {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #FFF;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
