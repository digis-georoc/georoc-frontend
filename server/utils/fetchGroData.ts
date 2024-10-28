import { FetchResponse } from 'ofetch'
import { createError } from 'h3'

const { apiGroDataUrl } = useRuntimeConfig()

export async function fetchData(
  path: string,
): Promise<DataverseOKResponse | Blob | string | undefined> {
  try {
    const response: FetchResponse<DataverseOKResponse | Blob | string> =
      await $fetch.raw(apiGroDataUrl + path, {
        method: 'GET',
      })
    return response._data
  } catch (error: any) {
    //Dataverse errors during fetching are visible in full in the error message
    throw createError({
      statusMessage: error.message,
      statusCode: error.statusCode,
    })
  }
}