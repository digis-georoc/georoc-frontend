<script lang="ts" setup>
import type { TreeNode } from "primevue/tree";
import {storeToRefs} from "pinia";
import HowToFilter from "~/components/how-to-filter.vue";

const queryStore = useQueryStore()
const selectedTemp = ref<TreeNode[]>(<TreeNode[]>[])
const selected = ref<TreeNode[]>(<TreeNode[]>[])

const options = [
  {
    "label": "Oceanic crust",
    "altLabel": "ocean floor, ocean basin, old oceanic spreading center, abyssal hill, fossil ridge, failed rift",
    "key": "OC"
  },
  {
    "label": "Oceanic spreading center",
    "altLabel": "mid oceanic ridges, on- and off-axis spreading centres, triple junction",
    "key": "OSC"
  },
  {
    "label": "Oceanic fracture zone",
    "altLabel": "oceanic fracture zone, transform fault",
    "key": "OFZ"
  },
  {
    "label": "Oceanic island",
    "altLabel": "hot spot track, oceanic hot spot, petite spot",
    "key": "OI"
  },
  {
    "label": "Seamount",
    "altLabel": "seamount",
    "key": "SM"
  },
  {
    "label": "Aseismic ridge",
    "altLabel": "aseismic ridge, submarine ridge",
    "key": "AR"
  },
  {
    "label": "Large igneous province (Oceanic)",
    "altLabel": "ocean basin flood basalt, oceanic plateau",
    "key": "LIP-O"
  },
  {
    "label": "Continental intraplate setting",
    "altLabel": "intraplate volcanics, continental volcanic field, plutonic bodies",
    "key": "CIS"
  },
  {
    "label": "Large igneous province (Continental)",
    "altLabel": "continental flood basalt, large igneous province",
    "key": "LIP-C"
  },
  {
    "label": "Continental rift",
    "altLabel": "continental rift, continental graben zone, incipient rift, rift valley",
    "key": "CR"
  },
  {
    "label": "Continental collision zone",
    "altLabel": "orogenic volcanic and plutonic rocks",
    "key": "CCZ"
  },
  {
    "label": "Subduction zone (Ocean-Ocean)",
    "altLabel": "oceanic subduction zones, volcanic arc, trench",
    "key": "SZ-OO"
  },
  {
    "label": "Subduction zone (Ocean-Continent)",
    "altLabel": "active continental margin, continental arc, trench",
    "key": "SZ-OC"
  },
  {
    "label": "Back arc (Oceanic)",
    "altLabel": "oceanic back arc basin",
    "key": "BA-O"
  },
  {
    "label": "Back arc (Continental)",
    "altLabel": "continental back arc basin",
    "key": "BA-C"
  },
  {
    "label": "Forearc (Oceanic)",
    "altLabel": "oceanic forearc setting",
    "key": "FA-O"
  },
  {
    "label": "Ophiolite",
    "altLabel": "ophiolite complex",
    "key": "OP"
  },
  {
    "label": "Archean greengray belt",
    "altLabel": "-",
    "key": "AGB"
  },
  {
    "label": "Archean TTG/gneiss complex",
    "altLabel": "-",
    "key": "TTG"
  },
  {
    "label": "Paleo subduction zone",
    "altLabel": "-",
    "key": "PSZ"
  },
  {
    "label": "Complex tectonic setting",
    "altLabel": "-",
    "key": "CTS"
  },
  {
    "label": "Unknown",
    "altLabel": "-",
    "key": "UNK"
  }
]

function submit() {
  selected.value = [...selectedTemp.value]
  useFilter()
}

function reset() {
  selectedTemp.value = []
  submit()
}

function remove(index: number) {
  const optionToRemove = selected.value.find((item, i) => i === index)

  if (!optionToRemove) return

  const optionIndex = options.findIndex(({ key }) => key === optionToRemove.key)
  if (optionIndex === -1) return
  options[optionIndex].active = false

  selected.value.splice(index, 1)

  queryStore.setPanelFilter({
    name: QueryKey.GeologicalSettings,
    value: toQuery(selected.value)
  })
}

function useFilter() {
  const value = toQuery(selected.value)

  if (value === '') {
    queryStore.unsetFilter(QueryKey.GeologicalSettings)
  } else {
    queryStore.setPanelFilter({
      name: QueryKey.GeologicalSettings,
      value
    })
  }
}

function toQuery(selected: TreeNode[]) {
  return selected
    .map(node => node.key)
    .join(',')
}

function fromQuery(query: string | null): TreeNode[] {
  if (!query) return []
  return query
    .split(',')
    .map(key => options.find(option => option.key === key))
    .filter(node => node !== undefined)
}

const unsubscribe = queryStore.$onAction(
    ({ name }) => {
      if (name === 'resetAllActiveFilters') {
        selected.value = []
      }
    }
)

onMounted(() => {
  options.forEach(option => {
    option.active = false
  })

  const activeQuery = queryStore.getFilter(QueryKey.GeologicalSettings)?.value
  if (!activeQuery) return
  selected.value = fromQuery(activeQuery)
  useFilter()
})

onBeforeUnmount(() => {
  selected.value = []
  unsubscribe()
})
</script>
<template>
  <div class="relative">
    <QueryFilterBaseContainer
      :title="$t('geological_settings')"
      :dialog-title="$t('please_select_geological_settings')"
      :has-selected="selected.length > 0"
      @submit="submit"
      @reset="reset"
    >
      <template v-slot:selected>
        <QueryFilterBaseSelected :items="selected" @remove="remove"/>
      </template>
      <template v-slot:options>
        <QueryFilterGeologicalSettingsSelect v-model="selectedTemp" :options="options" />
      </template>
    </QueryFilterBaseContainer>
  </div>
</template>
