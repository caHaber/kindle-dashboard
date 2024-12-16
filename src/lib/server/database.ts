// import { DuckDBInstance } from '@duckdb/node-api';
import genericPool from 'generic-pool'
import { MOTHERDUCK_TOKEN } from '$env/static/private'


const pool = genericPool.createPool(
    {
        create: async () => {

            let _query: Promise<(query: string) => any>

            console.log({ MOTHERDUCK_TOKEN })
            _query = import("duckdb-async")
                .then(duckdb => duckdb.Database)
                .then(Database => Database.create('md:kindle-data', {
                    'motherduck_token': MOTHERDUCK_TOKEN,
                }))
                .then((db: any) => ((query: string) => db.all(query)))
                .catch(async error => {
                    console.log("duckdb init error:", error)
                    //@ts-expect-error error
                    let duckdb = await import("duckdb-lambda-x86");
                    let Database: any = await duckdb.Database;
                    const db = new Database(":memory:")
                    const connection = db.connect()
                    await connection.all(`SET home_directory='/tmp';`, false);
                    return (query: string) => {
                        return new Promise((resolve, reject) => {
                            connection.all(query, (err: any, res: any) => {
                                if (err) reject(err);
                                resolve(res);
                            })
                        })
                    }
                })

            // const instance = await DuckDBInstance.create('src/lib/server/data/duck_kindle_audible.db');
            // const db = await instance.connect();
            return _query;
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
        const result = await db(sql);
        return result;
    } catch (e) {
        console.log(e)
    } finally {
        pool.release(db);
    }
}