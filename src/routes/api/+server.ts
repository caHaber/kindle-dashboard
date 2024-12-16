// src/routes/api/+server.js
import { query } from "$lib/server/database";
import { json } from "@sveltejs/kit";

const GET_TOTAL_READING_AND_PAGE_FLIPS = {
    query: `
    SELECT "Product Name",
        "series-product-name",
        sum(total_reading_millis),
        sum(number_of_page_flips)
    FROM Kindle_Devices_ReadingSession
        JOIN BookRelation ON Kindle_Devices_ReadingSession.ASIN = BookRelation.ASIN
        JOIN Kindle_SagaSeriesInfra_CollectionRightsDatastore ON Kindle_Devices_ReadingSession.ASIN = Kindle_SagaSeriesInfra_CollectionRightsDatastore."item-ASIN"
    GROUP BY "Product Name",
    "series-product-name"`,
    headers: ['Book', 'Series', 'Total reading ms', '# of page flips']
}

export const POST = async ({ request, cookies }) => {
    console.log('POST')
    const body = await query(GET_TOTAL_READING_AND_PAGE_FLIPS.query);

    return json(({ rows: await body?.getRows(), headers: GET_TOTAL_READING_AND_PAGE_FLIPS.headers }));
};
