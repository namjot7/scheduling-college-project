import initSql from "@/lib/db";
import { NextResponse } from "next/server";

const tableName = "schedules";

export const GET = async (req) => {
    try {
        const db = await initSql()

        const query = `SELECT * FROM ${tableName}`;
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

        const { name, course, semester } = await req.json();
        console.log({ name, course, semester });

        const query = `INSERT INTO ${tableName} (name, course, semester) VALUES (?,?,?)`;
        const values = [name, course, semester];
        const data = await db.query(query, values);

        return NextResponse.json(data);
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}
export const PUT = async (req) => {
    try {
        const db = await initSql()

        const { id, name, course, semester } = await req.json();
        console.log({ id, name, course, semester });

        // SQL Query to update the existing record based on the id
        const query = `
            UPDATE ${tableName}
            SET name = ?, course = ?, semester = ?
            WHERE id = ?
        `;
        const values = [name, course, semester, id];
        const result = await db.query(query, values);

        return NextResponse.json({ message: "Updated successfully", result });

    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}
export const DELETE = async (req) => {
    try {
        const db = await initSql()

        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        console.log({ url, id });

        const query = `DELETE FROM ${tableName} WHERE id=?`;
        const data = await db.query(query, [id]); // should be in array format

        return NextResponse.json({ message: "Deleted successfully", data });
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}

