import type { TreeNode } from "primevue/tree";
import { getCleanChildKey } from '~/composables/tree'

const maps = {
  [QueryKey.Polygon]: (): string => {
    return ''
  },
  [QueryKey.RockClass]: (): string => {
    return ''
  },
  [QueryKey.Chemistry]: (query: string): string => {
    const chemistryStore = useChemistryStore()
    let text = '\nChemistry:\n'
    text += '------------------\n'
    if (!query) return ''
    text += query
      .split('),(')
      .map(item => item.replaceAll(/\)|\(+/g, ''))
      .map(tupel => {
        const [ type, element, min, max ] = tupel.split(',')
        return {
          type: { value: type, label: chemistryStore.getNodeLabel(type) },
          element: { value: element, label: chemistryStore.getNodeLabel(element) },
          min: !!(min) ? parseFloat(min) : null,
          max: !!(max) ? parseFloat(max) : null,
        }
      })
      .reduce((acc, cur) => {
        // Iterate over tuples and reduce them to a nested structure with element types as parents
        // and elements as children.
        // Child keys need to be generated (parent + delimiter + child)
        // because there can be same elements for multiple element types.
        // When applying the filter query, we calculate it back to the original key (see toQuery).

        const index = acc.findIndex(node => node.key === cur.type.value)
        const child = { key: generateChildKey(cur.type.value, cur.element.value), label: cur.element.label, data: { min: cur.min, max: cur.max } }
        if (index === -1) acc.push({ key: cur.type.value, label: cur.type.label, children: <TreeNode[]>[child] })
        else acc[index].children?.push(child)

        return acc
      }, <TreeNode[]>[])
      .reduce((acc, cur) => {
        const type = cur.label

        acc += `${type}:\n`
        acc += cur.children?.reduce((acc, { label, min, max }) => {
          const minMax = `${min ?  min : '' } ${max ? max : ''}`

          acc += `${label} - ${minMax}\n`
          return acc
        }, '')
        acc += `\n`
        return acc
      }, '\n')

    return text
  },
  [QueryKey.HostMaterial]: (): string => {
    return ''
  },
  [QueryKey.InclusionMaterial]: (): string => {
    return ''
  },
  [QueryKey.InclusionType]: (): string => {
    return ''
  },
  [QueryKey.RockType]: (query: string): string => {
    const rockTypeStore = useRockTypeStore()

    let text = '\nRock Type:\n'
    text += '------------------\n'
    function fromSimpleQuery(query: string): string[] {
      query = query.replace('IN:', '')
      return  query.split(',')
    }

    const selectedRockTypesValues = fromSimpleQuery(query ?? '')

    text += selectedRockTypesValues.reduce((acc, cur) => {
      const node = rockTypeStore.nodes.find(({ key }) => key === cur)
      if (!node) return acc

      acc += `${node.label}\n`
      return acc
    }, '')

    return text
  },
}

function getMaterialLabel(value: string) {
  if (value === MaterialKeys.WRGL) return 'Whole Rock & Glass'
  if (value === MaterialKeys.INC) return 'Inclusion'
  if (value === MaterialKeys.MIN) return 'Mineral'
}

function getBoundingBoxString(bbox: BboxQueryFilter | null) {
  const cornersMap = ['SW', 'SE', 'NE', 'NW']
  return bbox?.value.map((corner, i) => `${cornersMap[i]}: ${corner.join(', ')}`).join('  -  ')
}

export function queryToText() {
  const queryStore = useQueryStore()

  const activeQuery = queryStore.filters.active

  let text = 'Filter Settings:\n'
  text += '------------------------------------------------\n\n'
  text += `Bounding Box: ${getBoundingBoxString(queryStore.filters.bbox)}\n\n`

  text += `Material: ${getMaterialLabel(queryStore.filters.material?.value)}\n`

  text += activeQuery.reduce((acc, cur) => {
    const mappingFunc = maps[cur.name]
    if (!mappingFunc) return acc

    acc += mappingFunc(cur.value)

    return acc
  }, '')

  return text
}
