import {createError, H3Error, H3Event} from "h3";
import { fetchData } from "../expertdatasets";

export default defineEventHandler<PrecompiledFilePreviews | H3Error | undefined>(async ({ node }: H3Event) => {
    try {
        const datasets = (await fetchData('dataverses/34512/contents'))["data"];
        const previewArr: PrecompiledFilePreview[] = []
        for (let dataset of datasets){
          const { id, protocol, authority, identifier } = dataset;
          const precompiled = (await fetchData(`datasets/${id}/versions/:latest-published/metadata`))["data"];
          const { title } = precompiled;
          previewArr.push({protocol, authority, identifier, title});
        }
        return {preview: previewArr};
    } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
});
