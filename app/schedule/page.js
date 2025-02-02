'use client'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import { StyledTable } from '@/components/styles/StyledTable'
import React, { useEffect, useState } from 'react'
// const reader = require('xlsx')

const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState([]); // files array

    // const file = reader.readFile('../details.xlsx')

    const getSchedule = async () => {
        const res = await fetch('/api/schedule');
        const result = await res.json();
        const data = result.data[0];
        const splitData = data.slice(0, 4); // just for testing
        // console.log(splitData);
        setScheduleInfo(splitData);
    }

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Handle file upload
    const uploadSchedule = async () => {
        if (!selectedFile) {
            console.log("no file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);

        // ${uploadType} dynamic componenet
        const response = await fetch(`/api/upload/schedule`, {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        const filepath = result.filepath;

        setFiles(prev => [...prev, filepath]);
        console.log({ result, files, });
    };

    useEffect(() => {
        getSchedule()
    }, [])
    return (
        <Layout>
            <Section title={"Schedules"}>
                <div className="">
                    <h2 className="h2">Winter 2025</h2>

                    <div className="overflow-auto max-w-[70vw] max-h-[70vh]">
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

                    {/* File upload */}
                    <input type="file" name="" id=""
                        onChange={e => handleFileChange(e)}
                    />
                    <button className="btn-primary mt-5" onClick={() => uploadSchedule()}>
                        Upload
                    </button>
                </div>
            </Section>
        </Layout>
    )
}

export default Schedules