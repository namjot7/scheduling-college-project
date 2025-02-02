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
export const POST = async (req) => {
    try {
        const db = await initSql()
        const { title, description, date } = await req.json()
        console.log({ title, description, date });

        // Query with parameterized values (Prevents SQL Injection: attacker can manipulate a query by inserting malicious SQL code through user input )
        const query = `INSERT INTO nct_scheduling_hub.announcements (date, title, summary)
        VALUES (?, ?, ?)`;
        const values = [date, title, description]; // Convert Data into an Array (to avoid any risk of SQL injection)

        const data = await db.query(query, values);

        return NextResponse.json({ message: "Announcement created successfully", data });
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}

