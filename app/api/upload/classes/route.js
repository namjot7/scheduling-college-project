import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log("Classroom file received:", file.name);

        return NextResponse.json({ message: "Classroom uploaded successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
