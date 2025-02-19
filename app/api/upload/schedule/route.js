import { NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import initSql from "@/lib/db";

const tableName = "master_schedule";

// Ensure Next.js does not parse the request body automatically
export const config = {
    api: {
        bodyParser: false,
    },
};
export const POST = async (req) => {
    const db = await initSql();
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        // console.log(file);

        // if (!file) {
        //     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        // }
        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        // Read the Excel file and convert it to JSON
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON
        // console.log({ workbook, sheetName, sheet, jsonData });
        // console.log(jsonData);

        // Drop the table if it exists
        await db.query(`DROP TABLE IF EXISTS ${tableName}`);

        // Create the new table

        // Prepare data for insertion
        let columns = Object.keys(jsonData[0]);

        // let modifiedcolumns = columns.map(col => {
        //     return `${col.replace(/[\s.&]/g, '_').toLowerCase()}`; // g means replacement occues globally => \s: space,
        // });
        // console.log({ modifiedcolumns });

        const columnDefinitions = columns.map(col => {
            return `${col.replace(/[\s.&]/g, '_').toLowerCase()} TEXT`; // g means replacement occues globally => \s: space,
        }).join(", ");
        // console.log({ columnDefinitions });

        const createTableQuery = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, ${columnDefinitions});`;
        // console.log({ createTableQuery });

        await db.query(createTableQuery);
        // console.log(`Table ${tableName} created successfully`);

        // Insert Excel data into database
        for (const row of jsonData) {
            // console.log(row);
            const values = columns.map(col => {
                return row[col] !== undefined && row[col] !== null ? `'${row[col].toString().replace(/'/g, "'")}'` : 'NULL';
            }).join(", ");
            // replace single quote with single quote: to prevent SQL Injection
            // console.log({ values });
            const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values})`;
            const data = await db.query(query, values);
            // console.log({ query });
            // console.log(data);
        }
        return NextResponse.json({ success: true });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
