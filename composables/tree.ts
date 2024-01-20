const delimiter = '_/_'

export function generateChildKey(parentKey: string, childKey: string) {
  return parentKey + delimiter + childKey
}
export function getCleanChildKey(key: string) {
  const arr = key.split(delimiter)
  return arr.length > 0 ? arr[arr.length - 1] : key
}
