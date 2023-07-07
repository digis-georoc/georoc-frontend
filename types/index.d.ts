declare global {

  interface Filter {
    name: string,
    value: any
  }

  interface MapSample {
    SampleID: number,
    Latitude: number,
    Longitude: number
  }
  interface MapSampleQueryResponse {
    Data: MapSample[],
    NumItems: number
  }
  interface ResponseRef<T> {
    data: T
  }
}
