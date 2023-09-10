import {MineralsResponse, RocktypesResponse} from "../../types";
import {createError, H3Error, H3Event} from "h3";
import {FetchResponse} from "ofetch/dist/node";

const { apiToken, apiBaseUrl } = useRuntimeConfig()

export default defineEventHandler<MineralsResponse | H3Error | undefined>(async ({ node }: H3Event) => {
  const params = new URLSearchParams(node.req.url?.split('?')[1])

  try {
    const response: FetchResponse<MineralsResponse> = await $fetch.raw(apiBaseUrl + '/queries/samples/minerals', {
      method: 'GET',
      query: Object.fromEntries(params.entries()),
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
