// import { DuckDBInstance } from '@duckdb/node-api';
import genericPool from 'generic-pool'
import { MOTHERDUCK_TOKEN } from '$env/static/private'
import duckdb from 'duckdb-async'


const pool = genericPool.createPool(
    {
        create: async () => {

            let _query: Promise<(query: string) => any>

            const db = await duckdb.Database.create('md:kindle-data', {
                'motherduck_token': MOTHERDUCK_TOKEN,
            })

            // _query = import("duckdb-async")
            //     .then(duckdb => duckdb.Database)
            //     .then(Database => Database.create('md:kindle-data', {
            //         'motherduck_token': MOTHERDUCK_TOKEN,
            //     }))
            //     .then((db: any) => ((query: string) => db.all(`SET home_directory='/tmp'; ${query}`)))
            //     .catch(async error => {
            //         console.log("duckdb init error:", error)
            //         //@ts-expect-error error
            //         let duckdb = await import("duckdb-lambda-x86");
            //         let Database: any = await duckdb.Database;
            //         const db = new Database('md:kindle-data', {
            //             'motherduck_token': MOTHERDUCK_TOKEN,
            //         })
            //         const connection = db.connect()
            //         return (query: string) => {
            //             return new Promise((resolve, reject) => {
            //                 connection.all(`SET home_directory='/tmp'; ${query}`, (err: any, res: any) => {
            //                     if (err) reject(err);
            //                     resolve(res);
            //                 })
            //             })
            //         }
            //     })

            // const instance = await DuckDBInstance.create('src/lib/server/data/duck_kindle_audible.db');
            // const db = await instance.connect();
            return db;
        },
        destroy: async (con) => {
            // await con.close();
        },
    },
    {
        min: 2, // Minimum number of connections in the pool
        max: 10, // Maximum number of connections in the pool
    }
);

BigInt.prototype.toJSON = function () { return Number(this) }

export async function query(sql: string) {
    const db = await pool.acquire();
    try {
        const result = await db.all(sql);
        return result;
    } catch (e) {
        console.log(e)
    } finally {
        pool.release(db);
    }
}