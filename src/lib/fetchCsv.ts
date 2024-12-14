import { csv } from "d3";

export async function fetchCsv(file: string) {
    const response = await csv('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: file
    });
    return response
}
