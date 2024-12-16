import { DuckDBInstance } from '@duckdb/node-api';
import genericPool from 'generic-pool'

const pool = genericPool.createPool(
    {
        create: async () => {
            const instance = await DuckDBInstance.create('src/lib/server/data/duck_kindle_audible.db');
            const db = await instance.connect();
            return db;
        },
        destroy: async (db) => {
            // await db.close();
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
        const result = await db.run(sql);
        return result;
    } catch (e) {
        console.log(e)
    } finally {
        pool.release(db);
    }
}