import { createError, H3Error, H3Event } from "h3";
import { FetchResponse } from "ofetch";

const { apiToken, apiBaseUrl } = useRuntimeConfig()

export default defineEventHandler<Promise<SampleFullData | H3Error | undefined>>(async (event: H3Event) => {
    const id = getRouterParam(event, 'id')
    try {
        const response: FetchResponse<SampleFullData> = await $fetch.raw(`${apiBaseUrl}/queries/fulldata/${id}`, {
            method: 'GET',
            headers: {
                'DIGIS-API-ACCESSKEY': apiToken,
            },
            timeout: 5000
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
