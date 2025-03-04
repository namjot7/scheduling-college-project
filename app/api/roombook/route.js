import initSql from "@/lib/db";
import { NextResponse } from "next/server";

const tableName = "roombook";

export const GET = async (req) => {
    const db = await initSql()

    // Check if table exists using SHOW TABLES
    // const checkTableQuery = `SHOW TABLES LIKE '${tableName}'`;
    // const [tableExists] = await db.query(checkTableQuery);
    // console.log(tableExists);

    // if (tableExists.length === 0) {
    //     return NextResponse.json({ message: "Table does not exist", data: [] });
    // }
    try {

        const query = `Select * FROM ${tableName}`;
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
        const body = await req.json()
        // console.log(body);

        // Ensure database table exists and table structure
        await db.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                department VARCHAR(255) NOT NULL,
                purpose TEXT NOT NULL,
                date DATE NOT NULL,
                startTime TIME NOT NULL,
                endTime TIME NOT NULL,
                capacity INT NOT NULL,
                remarks VARCHAR(255) NOT NULL,
                status INT DEFAULT 2 -- pending 
            )
        `);

        // SQL Query (Using Parameterized Queries to Prevent SQL Injection)
        const query = `
        INSERT INTO ${tableName} (fullName, email, department, purpose, date, startTime, endTime, capacity,remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let values = Object.values(body);
        values = [...values, "", false]
        // console.log(values);

        const data = await db.query(query, values);
        return NextResponse.json({ success: true });
    }
    catch (err) {
        return NextResponse.json({ message: err.message });
    }
}
export const PATCH = async (req) => {
    try {
        const db = await initSql()

        const url = new URL(req.url);  // Get the request URL
        const id = url.searchParams.get('id');  // Get the 'id' query parameter
        const { status } = await req.json();
        console.log(id, status);

        await db.query(
            `UPDATE ${tableName} SET status = ? WHERE id = ?`,
            [status, id]
        );
        return NextResponse.json({ success: true });
    }
    catch (error) {
        return NextResponse.json({ message: err.message });
    }
}
