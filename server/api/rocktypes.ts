import {QueryLocationsResponse, RocktypesResponse} from "../../types";
import {createError, H3Error, H3Event} from "h3";
import {FetchResponse} from "ofetch";
const { apiToken, apiBaseUrl } = useRuntimeConfig()

export default defineEventHandler<RocktypesResponse | H3Error | undefined>(async ({ node }: H3Event) => {
  try {
    const response: FetchResponse<RocktypesResponse> = await $fetch.raw(apiBaseUrl + '/queries/samples/rocktypes', {
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