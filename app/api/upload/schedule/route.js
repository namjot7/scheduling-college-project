import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { writeFile } from "fs/promises";
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

        // Current working directroy (CWD) join with "uploads"
        // const uploadDir = path.join(process.cwd(), "uploads");

        // Ensure the directory exists
        // await fs.mkdir(uploadDir, { recursive: true });
        // const filepath = path.join(uploadDir, file.name);

        // Copy file to the uploads folder
        // await fs.writeFile(filepath, buffer); // filepath, image binary data 

        // Read the Excel file and convert it to JSON
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON
        // console.log({ workbook, sheetName, sheet, jsonData });
        console.log(jsonData);

        // Ensure database table exists
        // AUTO_INCREMENT  PRIMARY KEY
        await db.query(`
        CREATE TABLE IF NOT EXISTS nct_scheduling_hub.schedules2 (
          id INT,
          name VARCHAR(255),
          course VARCHAR(255),
          semester VARCHAR(255)
        )
        `);
        // Insert Excel data into database
        for (const row of jsonData) {
            console.log(row);
            const { id, name, semester, course } = row;

            const query = `INSERT INTO nct_scheduling_hub.schedules2 (id,name,semester,course) VALUES (?, ?, ?, ?)`;
            const values = [id, name, semester, course]; // Convert Data into an Array (to avoid any risk of SQL injection)

            await db.query(query, values);

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
