import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mime from "mime";

export async function GET(req, { params }) {
    try {
        const { filename } = params; // Get the filename from the URL
        const directoryPath = path.join(process.cwd(), "uploads/academic_files");
        const filePath = path.join(directoryPath, filename);

        // if (!fs.existsSync(filePath)) {
        //   return NextResponse.json({ error: "File not found" }, { status: 404 });
        // }

        // const fileMimeType = mime.getType(filePath) || "application/octet-stream";
        return NextResponse.json({ success: "request get" })
        // return new NextResponse(fs.createReadStream(filePath), {
        //   headers: {
        //     "Content-Type": fileMimeType,
        //     "Content-Disposition": `attachment; filename="${filename}"`,
        //   },
        // });
    } catch (error) {
        return NextResponse.json({ error: "Failed to download file", details: error.message }, { status: 500 });
    }
}
