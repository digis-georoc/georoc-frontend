
const { apiToken, apiBaseUrl } = useRuntimeConfig()

import {createError, H3Error, H3Event, sendStream } from 'h3';
import {FetchResponse} from "ofetch";

export default defineEventHandler<QueryLocationsResponse | H3Error | undefined>(async (event: H3Event) => {
  if (!apiBaseUrl) {
    throw new Error('Missing `runtimeConfig.apiBaseUrl` configuration.');
  }

  const params = new URLSearchParams(event.node.req.url?.split('?')[1])

  try {
    const response: FetchResponse<Blob> = await $fetch.raw(apiBaseUrl + '/download/filtered', {
      query: Object.fromEntries(params.entries()),
      method: 'GET',
      responseType: 'stream',
      headers: {
        'DIGIS-API-ACCESSKEY': apiToken,
      }
    });

    if (!response.body) return

    sendStream(event, response.body)
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
})
