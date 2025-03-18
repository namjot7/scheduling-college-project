import { NextResponse } from "next/server";
import initSql from "@/lib/db";

export async function GET() {
    try {
        const db = await initSql();
        const [requests] = await db.query("SELECT * FROM password_resets WHERE status = 0"); // pending
        // console.log(requests);

        return NextResponse.json(requests);
    }
    catch (error) {
        console.error("Error fetching requests:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
