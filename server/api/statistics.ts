import { createError, H3Error, H3Event } from 'h3'
import { FetchResponse } from 'ofetch'
const { apiToken, apiBaseUrl } = useRuntimeConfig()

export default defineEventHandler<Statistics | undefined>(
  async ({ node }: H3Event) => {
    try {
      const response: FetchResponse<Statistics> = await $fetch.raw(
        apiBaseUrl + '/queries/statistics',
        {
          method: 'GET',
          headers: {
            'DIGIS-API-ACCESSKEY': apiToken,
          },
        },
      )
      return response._data
    } catch (error: any) {
      throw createError({
        statusCode: error.response?.status ?? error.statusCode ?? undefined,
        statusMessage: error.message ?? error.statusMessage ?? undefined,
        data: error.data ?? undefined,
      })
    }
  },
)
