// src/routes/api/+server.js
import { read } from "$app/server";
import somefile from '$lib/server/data/test.csv?url';

export const POST = async ({ request, cookies }) => {
    // const body = await request.text();
    return read(somefile);
};
