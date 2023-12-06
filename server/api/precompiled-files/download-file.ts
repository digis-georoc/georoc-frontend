import {createError, H3Error, H3Event} from "h3";
import { fetchData } from "../expertdatasets";

export default defineEventHandler<Blob | H3Error | undefined>(async ({ node }: H3Event) => {
  try {
    const params = new URLSearchParams(node.req.url?.split('?')[1]);
    const paramsObj = Object.fromEntries(params.entries());
    const datatype = paramsObj["isDataset"] == 'true' ? 'dataset' : 'datafile';
    const data = await fetchData(`access/${datatype}/:persistentId/?persistentId=${paramsObj.identifier}`);
    let blob: Blob;
    if (!(data instanceof Blob)) {
      blob = new Blob([data]);
    }
    else {
      blob = data;
    }
    return blob;
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
});
