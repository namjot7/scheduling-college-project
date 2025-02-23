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

        jsonData.forEach(row => {
            Object.keys(row).forEach(key => {
                // Convert only if column name contains "date" or "time"
                if (typeof row[key] === "number" && /(date)/i.test(key)) {
                    row[key] = new Date((row[key] - 25569) * 86400000).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
                }
                else if (typeof row[key] === "number" && /(time)/i.test(key)) {
                    let timestamp = new Date((row[key] - 25569) * 86400000).toISOString().split("T")[1];
                    // console.log(timestamp.split(':').slice(0, 2).join(':'));
                    row[key] = timestamp.split(':').slice(0, 2).join(':'); // 08:30
                }
            });
        });
        // console.log(jsonData);

        // Drop the table if it exists
        await db.query(`DROP TABLE IF EXISTS ${tableName}`);

        // Create the new table

        // Prepare data for insertion
        let columns = Object.keys(jsonData[0]);
        // console.log(columns);

        // let modifiedcolumns = columns.map(col => {
        //     return `${col.replace(/[\s.&]/g, '_').toLowerCase()}`; // g means replacement occues globally => \s: space,
        // });
        // console.log({ modifiedcolumns });

        // const columnDefinitions = columns.map(col => {
        //     const columnName = col.replace(/[\s.&]/g, '_').toLowerCase();

        //     // Define specific column types based on common column names
        //     if (columnName.includes('date')) {
        //         return `${columnName} DATE`;  // Stores dates properly
        //     }
        //     else if (columnName.includes('time')) {
        //         return `${columnName} TIME`;  // Stores time correctly
        //     }
        //     else if (columnName.includes('datetime')) {
        //         return `${columnName} DATETIME`; // Stores both date & time
        //     }
        //     else {
        //         return `${columnName} TEXT`;  // Default to TEXT for other columns
        //     }
        // }).join(", ");
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
        return NextResponse.json({ success: true, columns });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
