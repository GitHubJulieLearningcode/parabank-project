import fs from 'fs';
import csv from 'csv-parser';

export async function readCsv(filePath: string) {
  const results: any[] = [];

  return new Promise<any[]>((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results));
  });
}