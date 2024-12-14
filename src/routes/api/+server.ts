   // src/routes/api/+server.js
   import { readFileSync } from 'fs';
   import { parse } from 'csv-parse/sync';

   export const GET = async () => {
       const csvFile = readFileSync('./path/to/your/file.csv', 'utf8');
       const records = parse(csvFile, { columns: true });

       return new Response(JSON.stringify(records));
   };