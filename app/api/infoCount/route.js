import initSql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const db = await initSql()
    const [rows1] = await db.query("SELECT COUNT(*) AS total FROM classrooms");
    const [rows2] = await db.query("SELECT COUNT(*) AS total FROM instructors");
    // console.log(rows1, rows2);

    return NextResponse.json({
        totalClasses: rows1[0].total,
        totalInstructors: rows2[0].total,
    });
}