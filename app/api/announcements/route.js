import initSql from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const db = await initSql()

        const query = `Select * FROM nct_scheduling_hub.announcements`;
        const data = await db.query(query);

        return NextResponse.json({ data });
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}

