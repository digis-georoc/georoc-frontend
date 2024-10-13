import {createError, H3Error, H3Event} from "h3";
import { readFileSync } from 'fs';
import { join } from "pathe";


function csvToJSON<T>(csvData: string, separator: string) {
  // Split the CSV data by newlines to get rows
  const rows = csvData.trim().split('\r\n')

  // Extract the headers (first row) and split by comma
  const headers = rows[0].split(separator)

  // Map the remaining rows into objects of type T
  const jsonData: T[] = rows.slice(1).map(row => {
    const values = row.split(separator);

    // Create an object for each row using the headers as keys
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    return obj as T; // Cast the object to type T
  });

  return jsonData;
}

export default defineEventHandler<ChemistryFilterOption[] | H3Error | undefined>(({ node }: H3Event) => {

  try {
    const filePath = join(process.cwd(), 'public/chemistry-filter-options.csv')
    return csvToJSON<ChemistryFilterOption>(readFileSync(filePath, 'utf-8'), ';')
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
})
