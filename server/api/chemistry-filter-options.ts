import {createError, H3Error, H3Event} from "h3";
import { readFileSync } from 'fs';
import { join } from "pathe";

export default defineEventHandler<ChemistryFilterOption[] | H3Error | undefined>(async ({ node }: H3Event) => {

  try {
    const filePath = join(process.cwd(), 'public/chemistry-filter-options.json')
    const jsonData = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData)

    return data;
  } catch (error: any) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
})
