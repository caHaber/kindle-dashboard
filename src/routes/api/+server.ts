   // src/routes/api/+server.js
   import { read } from "$app/server";
   import somefile from './test.csv';

   export const GET = async () => {
       return await read(somefile).text();
   };
