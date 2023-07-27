import {QueryLocationsResponseItem} from "../../types";

const { apiToken, apiBaseUrl } = useRuntimeConfig()

import {createError, H3Event} from 'h3';

export default defineEventHandler<any>(async ({ node }: H3Event) => {
  if (!apiBaseUrl) {
    throw new Error('Missing `runtimeConfig.apiBaseUrl` configuration.');
  }

  const params = new URLSearchParams(node.req.url?.split('?')[1])

  try {
    const response = await $fetch.raw(apiBaseUrl + '/geodata/samplesclustered', {
      query: Object.fromEntries(params.entries()),
      method: 'GET',
      headers: {
        'DIGIS-API-ACCESSKEY': apiToken,
      }
    });
    return response._data;
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
})
