import fs from 'fs'
import path from 'path'
import { DuckDBInstance } from '@duckdb/node-api';


function getFilesRecursive(directoryPath, ext) {
    let files = [];

    // Read all files and directories in the current directory
    const items = fs.readdirSync(directoryPath, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directoryPath, item.name);

        if (item.isDirectory()) {
            // If the item is a directory, recurse into it
            files = files.concat(getFilesRecursive(fullPath, ext));
        } else if (item.isFile() && path.extname(item.name).toLowerCase() === ext) {
            // If the item is a .csv file, add it to the list
            files.push(fullPath);
        }
    }

    return files;
}


// Configuration
const config = {
    databasePath: './duck_kindle_audible.db',
    csvDir: './kindle_data',
    jsonDir: './kindle_data',
};


// Function to load CSV files into the database
async function loadCSVFiles(db) {

    // const db = await instance.connect();
    const csvFiles = getFilesRecursive('./data', '.csv');

    for (const filePath of csvFiles) {
        // const filePath = path.join(config.csvDir, file);
        const tableName = path.basename(filePath, path.extname(filePath)).replaceAll('-', '_').replaceAll(' ', '_').replaceAll('.', '_');

        console.log(`Loading CSV file: ${filePath} into table: ${tableName}`);

        try {
            await db.run(`CREATE TABLE IF NOT EXISTS ${tableName} AS SELECT * FROM read_csv_auto('${filePath}')`);
            console.log(`Loaded CSV file into table: ${tableName}`);
        } catch (err) {
            console.error(`Failed to load CSV file: ${filePath}`, err);
        }
    }
}

// Function to load JSON files into the database
async function loadJSONFiles(db) {
    const jsonFiles = getFilesRecursive('./kindle_data', '.json');

    // const db = await instance.connect();

    for (const filePath of jsonFiles) {
        // const filePath = path.join(config.csvDir, file);
        const tableName = path.basename(filePath, path.extname(filePath));

        console.log(`Loading JSON file: ${filePath} into table: ${tableName}`);

        try {
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Ensure data is an array
            if (!Array.isArray(jsonData)) {
                throw new Error('JSON file does not contain an array of objects.');
            }

            const columns = Object.keys(jsonData[0]);
            const columnDefinitions = columns.map(col => `"${col}" TEXT`).join(', ');

            await db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`);

            for (const row of jsonData) {
                const values = columns.map(col => `'${row[col]?.toString().replace(/'/g, "''") || ''}'`).join(', ');
                await db.run(`INSERT INTO ${tableName} VALUES (${values})`);
            }

            console.log(`Loaded JSON file into table: ${tableName}`);
        } catch (err) {
            console.error(`Failed to load JSON file: ${filePath}`, err);
        }
    }
}

// Main function to orchestrate the loading process
async function main() {
    const instance = await DuckDBInstance.create(config.databasePath);
    const db = await instance.connect();

    try {
        console.log('Starting the data loading process...');

        await loadCSVFiles(db);
        // await loadJSONFiles(db)
        // console.log(await (await db.run('SELECT * FROM readingsessions;')).getRows())

        console.log('Data loading process completed.');
    } catch (err) {
        console.error('Error during the data loading process:', err);
    }
}

main();
