import {createError, H3Error, H3Event} from "h3";
import {FetchResponse} from "ofetch";

const { apiExpertToken, apiExpertUrl } = useRuntimeConfig()

export default defineEventHandler<ExpertDatasetResponse | H3Error | undefined>(async ({ node }: H3Event) => {
  try {
  //get the collection of datasets to fetch
  const collectionData = (await fetchData('dataverses/digis/contents'))["data"];
  const datasetIDs = [];
  const datasets = [];
  //get the dataset ids
  for (let i = 0; i < collectionData.length; i++){
    if (collectionData[i]["title"].startsWith('Compilations ')){
      let id = collectionData[i]["id"];
      let dataverseEntrys = (await fetchData(`dataverses/${id}/contents`))["data"]
      for(let entry of dataverseEntrys){
        datasetIDs.push(entry["id"]);
      }
    }
  }
  //get the datasets
  for (let i = 0; i < datasetIDs.length; i++){
    let id = datasetIDs[i];
    datasets.push((await fetchData(`datasets/${id}`))["data"]);
  }
  const rows : ExpertDatasetRow[] = [];
  for (let dataset of datasets){
    rows.push({
      authors: formatAuthors(dataset["latestVersion"]["metadataBlocks"]["citation"]["fields"][1]["value"]),
      title: dataset["latestVersion"]["metadataBlocks"]["citation"]["fields"][0]["value"],
      versionNr: dataset["latestVersion"]["versionNumber"] + "." + dataset["latestVersion"]["versionMinorNumber"],
      productionDate: parseInt(dataset["latestVersion"]["productionDate"].split("-")[0]),
      persistentUrl: dataset["persistentUrl"],
    })
  }
  return {datasets: rows}
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
})

async function fetchData(path: string): Promise<any | H3Error> {
  try{
    const response: FetchResponse<any> = await $fetch.raw(apiExpertUrl + path, {
      method: 'GET',
      headers: {
        'X-Dataverse-Key': apiExpertToken,
      }
    });
    return response._data
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
}
function formatAuthors(authorList: any) : string {
  function getLastName(fullname: string) : string {
    return fullname.split(",")[0]
  }
  if (authorList.length <= 0){
    return "";
  }
  if (authorList.length == 1){
    return authorList[0]["authorName"]["value"];
  }
  if (authorList.length == 2){
    return getLastName(authorList[0]["authorName"]["value"]) + " & " + getLastName(authorList[1]["authorName"]["value"]);
  }
  return getLastName(authorList[0]["authorName"]["value"]) + " et al.";
}
