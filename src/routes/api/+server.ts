   // src/routes/api/+server.js
   import { read } from "$app/server";
   import csv from '$lib/data/test.csv'

   export const GET = async () => {
       return await read(csv).text();
   };
