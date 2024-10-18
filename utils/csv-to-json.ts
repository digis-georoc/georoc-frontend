function csvToJSON<T>(csvData: string, separator: string) {
  // Split the CSV data by newlines to get rows
  const rows = csvData.trim().split('\n')

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

export {
  csvToJSON
}
