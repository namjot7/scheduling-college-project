import initSql from "@/lib/db";
import { NextResponse } from "next/server"
import * as XLSX from 'xlsx';

const tableName = "staff_schedule";

// Ensure Next.js does not parse the request body automatically
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    try {
        const db = await initSql();

        const [rows] = await db.query(`SELECT * FROM ${tableName}`);
        return NextResponse.json(rows);
    }
    catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}

export const POST = async (req) => {
    const db = await initSql();
    try {
        const formData = await req.formData();
        // console.log(formData);

        // const deleteQuery = `DROP TABLE IF EXISTS ${tableName}`;
        // await db.query(deleteQuery);

        const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            week INT,
            team VARCHAR(255),
            day VARCHAR(10),
            date DATE, 
            name VARCHAR(255)
        );`;
        await db.query(createTableQuery);

        const file = formData.get("file");
        // console.log(file);

        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        // Read the Excel file and convert it to JSON
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON
        // console.log({ workbook, sheetName, sheet, jsonData });
        console.log(jsonData);

        let data = cleanScheduleData(jsonData)
        // console.log(data);

        if (!Array.isArray(data)) {
            return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
        }

        // Convert JSON into SQL INSERT queries
        // const values = data.flatMap(entry => {
        //     return entry.schedule.map(s => [entry.week, entry.team, s.day, s.name])
        //     // console.log(entry);

        // });

        // const query = `INSERT INTO ${tableName} (week, team, day, date, name) VALUES (?,?,?,?,?)`;
        // await db.query(query, [values]);

        return NextResponse.json({ success: true });
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

function cleanScheduleData(rawData) {
    let organizedData = [];
    let currentWeek = null;

    rawData.forEach(row => {
        // console.log({ row });

        // If the row contains a week number
        if (row.__EMPTY) {
            currentWeek = row.__EMPTY; // Set current week
        }
        // If the row contains a team name
        else if (row.__EMPTY_1) {
            let teamName = row.__EMPTY_1;
            let schedule = [];

            // Map day-wise data
            let days = ["MON", "TUE", "WED", "THU", "FRI"];
            days.forEach((day, index) => {
                let key = `__EMPTY_${index + 1}`; // Column names in your JSON
                if (row[key]) {
                    // console.log(row[key]);

                    schedule.push({ day, name: row[key].trim() });
                }
            });

            // Store data
            organizedData.push({ week: currentWeek, team: teamName, schedule });
        } else {
            // Additional team member under the same week/team
            let lastEntry = organizedData[organizedData.length - 1];
            if (lastEntry) {
                let days = ["MON", "TUE", "WED", "THU", "FRI"];
                days.forEach((day, index) => {
                    let key = `__EMPTY_${index + 1}`;
                    if (row[key]) {
                        lastEntry.schedule.push({ day, name: row[key].trim() });
                    }
                });
            }
        }
    });

    return organizedData;
}
