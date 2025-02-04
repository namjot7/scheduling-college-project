'use client'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import { StyledTable } from '@/components/styles/StyledTable'
import UploadButton from '@/components/UploadButton'
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";

const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState([]);
    // const [files, setFiles] = useState([]); // files array
    const [name, setName] = useState("")
    const [course, setCourse] = useState("")
    const [semester, setSemester] = useState("")


    const getSchedule = async () => {
        const res = await fetch('/api/schedule');
        const result = await res.json();
        const data = result.data[0];
        const splitData = data.slice(0, 15); // just for testing
        // console.log(splitData);
        setScheduleInfo(splitData);
    }

    const addData = async () => {
        await fetch(`/api/upload/schedule`, {
            method: "POST",
            body: formData,
        });
    }
    // Function to Export Data as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(scheduleInfo);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "schedule.xlsx");
    };
    useEffect(() => {
        getSchedule()
    }, [])
    return (
        <Layout>
            <Section title={"Schedules"}>
                <div className="">
                    <h2 className="h2">Winter 2025</h2>

                    {/* Download Excel */}
                    <button className="btn-primary" onClick={() => downloadExcel()}>
                        Download Excel
                    </button>
                    <button className="btn-primary" onClick={() => addData()}>
                        Add data
                    </button>

                    {/* Real table */}
                    <div className="overflow-auto hidden max-w-[70vw] max-h-[70vh]">
                        <StyledTable>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Session</th>
                                    <th>Program</th>
                                    <th>Intake Id</th>
                                    <th>Semester</th>
                                    <th>Term</th>
                                    <th>Group</th>
                                    <th>Code</th>
                                    <th>Course</th>
                                    <th>Campus</th>
                                    <th>Delivery</th>
                                    <th>Room No.</th>
                                    <th>Credits</th>
                                    <th>Hours Paid</th>
                                    <th>Hours</th>
                                    <th>Final Enrolment</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Days</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Draft Time</th>
                                    <th>Draft Schedule</th>
                                    <th>Instructor</th>
                                    <th>Instructor Email</th>
                                    <th>Program Manager</th>
                                    <th>Capacity</th>
                                    <th>Additional Capacity</th>
                                    <th>Campus Address</th>
                                    <th>Campus Address Code</th>
                                    <th>Remarks</th>
                                    <th>Credentials & Qualifications</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleInfo?.length > 0 && scheduleInfo.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.id}</td>
                                        <td>{item.session}</td>
                                        <td>{item.program}</td>
                                        <td>{item.intake_id}</td>
                                        <td>{item.semester}</td>
                                        <td>{item.term}</td>
                                        <td>{item.group}</td>
                                        <td>{item.code}</td>
                                        <td>{item.course}</td>
                                        <td>{item.campus}</td>
                                        <td>{item.delivery}</td>
                                        <td>{item.room_no}</td>
                                        <td>{item.credits}</td>
                                        <td>{item.hours_paid}</td>
                                        <td>{item.hours}</td>
                                        <td>{item.final_enrolment}</td>
                                        <td>{item.start_date}</td>
                                        <td>{item.end_date}</td>
                                        <td>{item.days}</td>
                                        <td>{item.start_time}</td>
                                        <td>{item.end_time}</td>
                                        <td>{item.draft_time}</td>
                                        <td>{item.draft_schedule}</td>
                                        <td>{item.instructor}</td>
                                        <td>{item.instructor_email}</td>
                                        <td>{item.program_manager}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.additional_capacity}</td>
                                        <td>{item.campus_address}</td>
                                        <td>{item.campus_address_code}</td>
                                        <td>{item.remarks}</td>
                                        <td>{item.credentials_qualifications}</td>
                                        <td>Edit Delete</td>
                                    </tr>
                                ))}

                            </tbody>
                        </StyledTable>
                    </div>
                    {/* Test table */}
                    <div className="overflow-auto max-w-[70vw] max-h-[70vh]">
                        <StyledTable>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Semester</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleInfo?.length > 0 && scheduleInfo.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.course}</td>
                                        <td>{item.semester}</td>
                                        <td>
                                            <button className="btn-primary" onClick={() => editData()}>
                                                Edit
                                            </button>
                                            <button className="btn-primary" onClick={() => deleteData()}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </StyledTable>
                    </div>

                    <UploadButton fileType={"schedule"} />

                    <form className="" method="UPDATE">
                        <h3 className="h3">Add New Data</h3>
                        <input
                            className='block mb-3 px-3 py-1 text-black'
                            type="text" placeholder='Name'
                            value={name} onChange={e => setName(e.target.value)}
                        />
                        <input
                            className='block mb-3 px-3 py-1 text-black'
                            type="text" placeholder='Course'
                            value={course} onChange={e => setCourse(e.target.value)}
                        />
                        <input
                            className='block mb-3 px-3 py-1 text-black'
                            type="text" placeholder='Semester'
                            value={semester} onChange={e => setSemester(e.target.value)}
                        />
                        <button className="btn-primary" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </Section>
        </Layout>
    )
}

export default Schedules