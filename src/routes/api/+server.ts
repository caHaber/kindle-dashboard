   import { promises as fs } from 'fs';
   import path from 'path';

   export const GET = async () => {
       const csvPath = path.resolve('src/lib/data/test.csv');
       const csvData = await fs.readFile(csvPath, 'utf-8');
       return new Response(csvData, {
           headers: { 'Content-Type': 'text/csv' }
       });
   };
