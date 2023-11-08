import {createError, H3Error, H3Event} from "h3";
import {FetchResponse} from "ofetch/dist/node";
import {HostMaterialsResponse} from "../../types";

const { apiToken, apiBaseUrl } = useRuntimeConfig()

export default defineEventHandler<HostMaterialsResponse | H3Error | undefined>(async ({ node }: H3Event) => {
  const params = new URLSearchParams(node.req.url?.split('?')[1])

  try {
    const response: FetchResponse<HostMaterialsResponse> = await $fetch.raw(apiBaseUrl + '/queries/samples/hostmaterials', {
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
