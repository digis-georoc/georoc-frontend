import { H3Event } from 'h3'
import { fetchData } from '../expertdatasets'

export default defineEventHandler<PrecompiledFiles | undefined>(
  async ({ node }: H3Event) => {
    const params = new URLSearchParams(node.req.url?.split('?')[1])
    const paramsObj = Object.fromEntries(params.entries())
    const data = (<DataverseOKResponse>(
      await fetchData(
        `datasets/:persistentId/?persistentId=${paramsObj['protocol']}:${paramsObj['authority']}/${paramsObj['id']}`,
      )
    ))['data']
    const citation = data['latestVersion']['metadataBlocks']['citation']
    const rawFiles = data['latestVersion']['files']

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
    const precomp: PrecompiledFiles = {
      title: citation['fields'][0]['value'],
      authors: authors,
      persistentUrl: data['persistentUrl'],
      description:
        citation['fields'][3]['value'][0]['dsDescriptionValue']['value'],
      publicationDate: data['publicationDate'],
      subject: citation['fields'][4]['value'][0],
      datasetPersistentId: data['latestVersion']['datasetPersistentId'],
      productionDate: citation['fields'][5]['value'],
      license: {
        name: data['latestVersion']['license']['name'],
        uri: data['latestVersion']['license']['uri'],
      },
      files: files,
    }
    return precomp
  },
)
