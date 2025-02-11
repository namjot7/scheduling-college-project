import { NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import initSql from "@/lib/db";

// Ensure Next.js does not parse the request body automatically
export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req) {
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

        // Drop the table if it exists
        await db.query(`DROP TABLE IF EXISTS nct_scheduling_hub.schedules2`);

        // Create the new table
        await db.query(`
            CREATE TABLE nct_scheduling_hub.schedules2 (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                course VARCHAR(255),
                semester VARCHAR(255)
            )
        `);
        // Insert Excel data into database
        for (const row of jsonData) {
            console.log(row);
            const { id, name, semester, course } = row;

            const query = 'INSERT INTO nct_scheduling_hub.schedules2 (id,name,course,semester) VALUES (?, ?, ?, ?)';
            const values = [id, name, course, semester]; // Convert Data into an Array (to avoid any risk of SQL injection)

            const data = await db.query(query, values);
            // console.log(data);
        }
        return NextResponse.json({
            message: "Schedule uploaded successfully",
            filepath: file.name,
            data: jsonData,
        });
    }
    catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
