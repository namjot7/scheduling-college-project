import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { writeFile } from "fs/promises";
import * as XLSX from 'xlsx';

// Ensure Next.js does not parse the request body automatically
export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req) {
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
        const uploadDir = path.join(process.cwd(), "uploads");

        // Ensure the directory exists
        await fs.mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, file.name);

        // Copy file to the uploads folder
        await fs.writeFile(filepath, buffer); // filepath, image binary data 

        // Read the Excel file and convert it to JSON
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON

        return NextResponse.json({ message: "Schedule uploaded successfully", filepath: file.name });
    }
    catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
