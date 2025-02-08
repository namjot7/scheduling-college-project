import initSql from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const db = await initSql()

        const query = `Select * FROM nct_scheduling_hub.roombook`;
        const data = await db.query(query);

        return NextResponse.json(data);
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}
export const POST = async (req) => {
    try {
        const db = await initSql()
        // const body = await req.json()
        // console.log(body);
        const { fullName, email, department, purpose, room, date, time } = await req.json();
        console.log({ fullName, email, department, purpose, room, date, time });

        // Ensure database table exists and table structure
        await db.query(`
            CREATE TABLE IF NOT EXISTS nct_scheduling_hub.roombook (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                department VARCHAR(255) NOT NULL,
                purpose TEXT NOT NULL,
                room VARCHAR(50) NOT NULL,
                date DATE NOT NULL,
                approved BOOLEAN DEFAULT FALSE,
                time TIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // SQL Query (Using Parameterized Queries to Prevent SQL Injection)
        const query = `
        INSERT INTO nct_scheduling_hub.roombook (full_name, email, department, purpose, room, date, time,approved)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
        const values = [fullName, email, department, purpose, room, date, time, false];
        console.log(values);

        const data = await db.query(query, values);

        return NextResponse.json({ success: true });
    }
    catch (err) {
        return NextResponse.json({ message: err.message });
    }
}