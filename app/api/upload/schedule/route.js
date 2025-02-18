import { NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import initSql from "@/lib/db";

const tableName = "schedules";

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

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }
        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        // Read the Excel file and convert it to JSON
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON
        // console.log({ workbook, sheetName, sheet, jsonData });
        console.log(jsonData);

        // Extract column names (keys from the first object)
        const columnNames = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
        const sanitizedColumns = columnNames.map((col) =>
            `\`${col.replace(/[^a-zA-Z0-9_]/g, "")}\` VARCHAR(255)`
        ).join(", ");

        // console.log(columnNames);
        // console.log(sanitizedColumns);

        // Drop the table if it exists
        // await db.query(`DROP TABLE IF EXISTS ${tableName}`);

        // Create the new table
        // const createTableQuery = `
        //     CREATE TABLE \`${tableName}\` (
        //         ${sanitizedColumns}
        //     )
        // `;
        // await db.query(createTableQuery);
        // Prepare the data for insertion
        // const values = jsonData.map(row => {
        //     return columnNames.map(col => {
        //         // Handle null/undefined values and sanitize each value
        //         return row[col] ? `'${row[col].replace(/'/g, "''")}'` : 'NULL';
        //     }).join(", ");
        // }).join("),(");
        // console.log(values);

        // Insert Excel data into database
        for (const row of jsonData) {
            // console.log(row);

            const query = `INSERT INTO ${tableName} (id,name,course,semester) VALUES (?, ?, ?, ?)`;
            // const values = [id, name, course, semester]; // Convert Data into an Array (to avoid any risk of SQL injection)

            // const data = await db.query(query, values);
            // console.log(data);
        }
        return NextResponse.json({
            message: "Schedule uploaded successfully",
            // filepath: file.name,
            // data: jsonData,
        });
    }
    catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
