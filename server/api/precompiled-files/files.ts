import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

export default defineEventHandler<PrecompiledFiles | undefined>(
  async ({ node }: H3Event) => {
    const params = new URLSearchParams(node.req.url?.split('?')[1])
    const paramsObj = Object.fromEntries(params.entries())
    const data = (<DataverseOKResponse>(
      await fetchData(
        `datasets/:persistentId/versions/${paramsObj['version']}?persistentId=${paramsObj['protocol']}:${paramsObj['authority']}/${paramsObj['id']}`,
      )
    ))['data']
    const citation = data['metadataBlocks']['citation']
    const rawFiles = data['files']

    const authors = []
    const authorData = citation['fields'][1]['value']
    for (let i = 0; i < authorData.length; i++) {
      authors.push(authorData[i]['authorName']['value'])
    }

    const files = []
    for (let i = 0; i < rawFiles.length; i++) {
      let dataFile = rawFiles[i]['dataFile']
      files.push({
        id: dataFile['id'],
        contentType: dataFile['contentType'],
        label: rawFiles[i]['label'],
        persistentId: dataFile['persistentId'],
        filesize: dataFile['filesize'],
        persistentUrl: dataFile['pidURL'],
      })
    }
    //calling the api with a version does not provide a dataset persistentId anymore, workaround:
    const fileUrl: string = files[0]['persistentUrl']
    const persistentUrl: string = fileUrl.substring(0, fileUrl.lastIndexOf('/'))

    const precomp: PrecompiledFiles = {
      title: citation['fields'][0]['value'],
      authors: authors,
      persistentUrl: persistentUrl,
      description:
        citation['fields'][3]['value'][0]['dsDescriptionValue']['value'],
      publicationDate: data['publicationDate'],
      subject: citation['fields'][4]['value'][0],
      datasetPersistentId: data['datasetPersistentId'],
      productionDate: citation['fields'][5]['value'],
      version: {
        major: data['versionNumber'],
        minor: data['versionMinorNumber'],
      },
      license: {
        name: data['license']['name'],
        uri: data['license']['uri'],
      },
      files: files,
    }
    return precomp
  },
)
