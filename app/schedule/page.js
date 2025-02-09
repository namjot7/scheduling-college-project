'use client'
import DataForm from '@/components/DataForm'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import { StyledTable } from '@/components/styles/StyledTable'
import UploadButton from '@/components/UploadButton'
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";

const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);  // Track the ID of the entry being edited

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSchedule, setFilteredSchedule] = useState([]); // Separate filtered data

    const displayData = filteredSchedule.length > 0 ? filteredSchedule : scheduleInfo;

    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        course: true,
        semester: true,
    });


    const getSchedule = async () => {
        const res = await fetch('/api/schedule');
        const result = await res.json();
        const data = result[0];
        const splitData = data?.slice(0, 6); // just for testing
        // console.log(splitData, data);
        //  scheduleInfo.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
        setScheduleInfo(splitData);
    }

    const editData = async (id) => {
        const itemToEdit = scheduleInfo.find(item => item.id === id);
        console.log(itemToEdit);
        setSelectedEntry(itemToEdit)
    }
    const deleteEntry = async (id) => {
        await fetch(`/api/schedule?id=${id}`, {
            method: 'DELETE',
        });
        getSchedule()
    }

    // Function to Export Data as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(scheduleInfo);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "schedule.xlsx");
    };
    // Hide/unhide column
    const toggleColumn = (col) => {
        setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
    };

    // For searching
    useEffect(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        // Search for all fields
        const updatedSchedule = scheduleInfo.filter(item =>
            item.name.toLowerCase().includes(lowerSearchTerm) ||
            item.course.toLowerCase().includes(lowerSearchTerm) ||
            item.semester.toLowerCase().includes(lowerSearchTerm)
        );
        setFilteredSchedule(updatedSchedule);
    }, [searchTerm])

    // Load schedules when page is loaded
    useEffect(() => {
        getSchedule()
    }, [])

    return (
        <Layout>
            <Section title={"Schedules"}>
                <div>

                    {/* Heading and Schedule dropdown */}
                    <div className="flex-between">
                        <h2 className="h2">Winter 2025</h2>
                        <div>
                            <select className='input !m-0'>
                                <option>Spring 2025</option>
                                <option>Winter 2025</option>
                                <option>Fall 2024</option>
                            </select>
                        </div>
                    </div>

                    {/* Search & Download Excel & Add Entry buttons */}
                    <div className="flex-between">
                        <div className="relative">
                            <img className='absolute top-6 left-2' src="./svg/search.svg" alt="" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 text-black border-gray-700"
                            />
                        </div>
                        <div>
                            <button className="btn-primary mr-5" onClick={() => downloadExcel()}>
                                Download Excel
                            </button>
                            <button className="btn-primary">
                                Add Entry
                            </button></div>
                    </div>

                    {/* Column Visibility Toggle Controls */}
                    <div className="mb-4">
                        <h3 className="h3 mt-5">Select columns to display</h3>
                        {Object.keys(visibleColumns).map(col => (
                            <label key={col} className="flex">
                                <span>{col}</span>
                                <input
                                    className='w-4 ml-5'
                                    type="checkbox"
                                    checked={visibleColumns[col]}
                                    onChange={() => toggleColumn(col)}
                                />
                            </label>
                        ))}
                    </div>

                    {/* Real table */}
                    {/* <div className="overflow-auto hidden max-w-[70vw] max-h-[70vh]">
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
                    </div> */}

                    {/* Test table */}
                    <div className="overflow-auto max-w-[90vw] max-h-[80vh]">
                        <StyledTable>
                            <thead>
                                <tr>
                                    {visibleColumns.id && <th>Id</th>}
                                    {visibleColumns.name && <th>Name</th>}
                                    {visibleColumns.course && <th>Course</th>}
                                    {visibleColumns.semester && <th>Semester</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData?.length > 0 && displayData.map((item, idx) => (
                                    <tr key={idx}>
                                        {visibleColumns.id && <td>{item.id}</td>}
                                        {visibleColumns.name && <td>{item.name}</td>}
                                        {visibleColumns.course && <td>{item.course}</td>}
                                        {visibleColumns.semester && <td>{item.semester}</td>}
                                        <td className='flex gap-3'>
                                            <button className="btn-primary" onClick={() => editData(item.id)}>
                                                Edit
                                            </button>
                                            <button className="btn-danger" onClick={() => deleteEntry(item.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>


                    </div>
                    <UploadButton setUploadedFiles={setUploadedFiles} apiEndPoint={"schedule"} />
                    <DataForm {...selectedEntry} getSchedule={getSchedule} />
                </div>
            </Section>
        </Layout>
    )
}

export default Schedules