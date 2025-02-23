import initSql from "@/lib/db";
import { NextResponse } from "next/server";

const tableName = "master_schedule";
const db = await initSql();

export const GET = async (req) => {
    try {
        // const db = await initSql()

        const query = `SELECT * FROM ${tableName}`;
        const data = await db.query(query);

        const getColumnsQuery = `SELECT COLUMN_NAME
                    FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE TABLE_NAME = '${tableName}';`;
        const columnsData = await db.query(getColumnsQuery);

        return NextResponse.json({ data, columnsData });
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}
export const POST = async (req) => {
    try {
        const db = await initSql()

        const body = await req.json();
        // console.log(body);

        // Extract columns and values dynamically
        const columns = Object.keys(body).join(", ");
        const values = Object.values(body);
        const placeholders = values.map(() => "?").join(", ");
        // console.log({ columns, values, placeholders });

        // Insert into MySQL
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        await db.query(query, values)

        return NextResponse.json(data);
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err.message });
    }
}
export const PUT = async (req) => {
    try {
        const db = await initSql()

        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const body = await req.json();

        // Build the SQL update query dynamically based on the form data
        const fields = Object.keys(body);
        const values = Object.values(body);
        const setClause = fields.map(field => `${field} = ?`).join(', '); // Generate SET clause dynamically
        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ${id}`;
        // console.log({ fields, values, setClause, query });

        const result = await db.query(query, values);
        return NextResponse.json({ message: "Updated successfully" });
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

