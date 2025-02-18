'use client'
import { DeleteBtn, EditBtn } from '@/components/design/icons'
import Layout from '@/components/Layout'
import ScheduleDialog from '@/components/ScheduleDialog'
import Section from '@/components/Section'
import UploadButton from '@/components/UploadButton'
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx"
    ;
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sampleScheduleData } from '@/public/testData'

const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);  // Track the ID of the entry being edited

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSchedule, setFilteredSchedule] = useState([]); // Separate filtered data

    // const displayData = filteredSchedule.length > 0 ? filteredSchedule : scheduleInfo;
    const displayData = filteredSchedule.length > 0 ? filteredSchedule : sampleScheduleData;
    const [showDialog, setShowDialog] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        course: true,
        semester: true,
        session: true,
        program: true,
        intakeId: true,
        term: true,
        group: true,
        code: true,
        campus: true,
        delivery: true,
        roomNo: true,
        credits: true,
        hoursPaid: true,
        hours: true,
        finalEnrolment: true,
        startDate: true,
        endDate: true,
        draftSchedule: true,
        instructor: true,
        instructorEmail: true,
        programManager: true,
        capacity: true,
        additionalCapacity: true,
        campusAddressCode: true,
        remarks: true,
        credentialsAndQualifications: true,
    });

    const getSchedule = async () => {
        const res = await fetch('/api/schedule');
        const result = await res.json();
        const data = result[0];
        const splitData = data?.slice(0, 22); // just for testing
        // console.log(splitData, data);
        //  scheduleInfo.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
        setScheduleInfo(splitData);
    }

    const editData = async (id) => {
        setShowDialog(true);
        const itemToEdit = scheduleInfo.find(item => item.id === id);
        console.log(itemToEdit);
        setSelectedEntry(itemToEdit);
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
            <Section title={"Master Schedule"}>
                <div>
                    {/* Heading and Schedule dropdown */}
                    <div className="flex-between mb-2">
                        <h2 className="h2">Winter 2025</h2>
                        <div>
                            <select className='input'>
                                <option>Spring 2025</option>
                                <option>Winter 2025</option>
                                <option>Fall 2024</option>
                            </select>
                        </div>
                    </div>
                    {/* Search and Download Excel & Add Entry buttons */}
                    <div className="flex-between mb-5">
                        <div className="relative">
                            <img className='absolute top-2 left-2' src="./svg/search.svg" alt="" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-10 rounded-md "
                            />
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={() => setShowDialog(true)} className='btn-primary flex-center'>
                                <img src="./svg/plus.svg" alt="" />
                                Add Entry
                            </button>
                            <button className="btn-primary flex" onClick={() => downloadExcel()}>
                                <img src="./svg/download.svg" alt="download icon" />
                                Excel
                            </button>
                        </div>
                    </div>

                    {/* Column Visibility Toggle Controls */}
                    {/* Extract all the keys from the object and create an array of them => ['id', 'name', 'course', 'semester']*/}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="btn-primary flex-center gap-1">
                                <img src="./svg/eye.svg" alt="" />
                                Hide/Unhide
                            </button>
                        </SheetTrigger>
                        <SheetContent className="overflow-auto">
                            <SheetHeader>
                                <SheetTitle>Select the columns to display</SheetTitle>
                            </SheetHeader>
                            <div className="mt-5">
                                {Object.keys(visibleColumns).map(col => (
                                    <div className="flex items-center" key={col}>
                                        <input
                                            checked={visibleColumns[col]}
                                            onChange={() => {
                                                setVisibleColumns(prev => ({
                                                    ...prev, [col]: !prev[col]
                                                }));
                                            }}
                                            type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{col}</label>
                                    </div>
                                ))}
                            </div>
                            <SheetFooter className={'sticky bottom-3 left-1/2 -translate-x-1/2 w-2/3'}>
                                <SheetClose asChild>
                                    <Button className="w-full mt-5" type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    <ScheduleDialog {...selectedEntry}
                        showDialog={showDialog} setShowDialog={setShowDialog}
                        getSchedule={getSchedule}
                    />

                    {/* Real table */}
                    <div className="overflow-scroll max-w-[70vw] max-h-[80vh]">
                        <table className="table-basic">
                            <thead>
                                <tr>
                                    {visibleColumns.id && <th>S_No</th>}
                                    {visibleColumns.session && <th>Session</th>}
                                    {visibleColumns.program && <th>Program</th>}
                                    {visibleColumns.intakeId && <th>Intake Id</th>}
                                    {visibleColumns.semester && <th>Semester</th>}
                                    {visibleColumns.term && <th>Term</th>}
                                    {visibleColumns.group && <th>Group</th>}
                                    {visibleColumns.code && <th>Code</th>}
                                    {visibleColumns.course && <th>Course_Name</th>}
                                    {visibleColumns.campus && <th>Campus</th>}
                                    {visibleColumns.delivery && <th>Delivery</th>}
                                    {visibleColumns.roomNo && <th>Room No.</th>}
                                    {visibleColumns.credits && <th>Credits</th>}
                                    {visibleColumns.hoursPaid && <th>Hours Paid</th>}
                                    {visibleColumns.hours && <th>Hours</th>}
                                    {visibleColumns.finalEnrolment && <th>Final Enrolment</th>}
                                    {visibleColumns.startDate && <th>Start Date</th>}
                                    {visibleColumns.endDate && <th>End Date</th>}
                                    {visibleColumns.draftSchedule && <th>Draft Schedule</th>}
                                    {visibleColumns.instructor && <th>Instructor</th>}
                                    {visibleColumns.instructorEmail && <th>Instructor Email</th>}
                                    {visibleColumns.programManager && <th>Program Manager</th>}
                                    {visibleColumns.capacity && <th>Capacity</th>}
                                    {visibleColumns.additionalCapacity && <th>Additional Capacity</th>}
                                    {visibleColumns.campusAddressCode && <th>Campus Address Code</th>}
                                    {visibleColumns.remarks && <th>Remarks</th>}
                                    {visibleColumns.credentialsAndQualifications && <th>Credentials & Qualifications</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData?.length > 0 && displayData.map((item, idx) => (
                                    <tr key={idx}>
                                        {visibleColumns.id && <td>{item.S_No}</td>}
                                        {visibleColumns.session && <td>{item.Session}</td>}
                                        {visibleColumns.program && <td>{item.Program}</td>}
                                        {visibleColumns.intakeId && <td>{item.Intake_id}</td>}
                                        {visibleColumns.semester && <td>{item.Semester}</td>}
                                        {visibleColumns.term && <td>{item.Term}</td>}
                                        {visibleColumns.group && <td>{item.Group}</td>}
                                        {visibleColumns.code && <td>{item.Code}</td>}
                                        {visibleColumns.course && <td>{item.Course_Name}</td>}
                                        {visibleColumns.campus && <td>{item.Campus}</td>}
                                        {visibleColumns.delivery && <td>{item.Delivery}</td>}
                                        {visibleColumns.roomNo && <td>{item.Room_No}</td>}
                                        {visibleColumns.credits && <td>{item.Credits}</td>}
                                        {visibleColumns.hoursPaid && <td>{item.Hours_Paid_for_the_class}</td>}
                                        {visibleColumns.hours && <td>{item.Hours}</td>}
                                        {visibleColumns.finalEnrolment && <td>{item.Enrolment_in_Class}</td>}
                                        {visibleColumns.startDate && <td>{item.Start_date}</td>}
                                        {visibleColumns.endDate && <td>{item.End_Date}</td>}
                                        {visibleColumns.draftSchedule && <td>{item.Schedule_Draft}</td>}
                                        {visibleColumns.instructor && <td>{item.Instructor}</td>}
                                        {visibleColumns.instructorEmail && <td>{item.Instructor_Email_ID}</td>}
                                        {visibleColumns.programManager && <td>{item.Program_Manager}</td>}
                                        {visibleColumns.capacity && <td>{item.Capacity}</td>}
                                        {visibleColumns.additionalCapacity && <td>{item.Additional_Capacity}</td>}
                                        {visibleColumns.campusAddressCode && <td>{item.Campus_Address_Code}</td>}
                                        {visibleColumns.credentialsAndQualifications && <td>{item.Credentails_and_Qulaifications}</td>}
                                        <td className="flex gap-3">
                                            <EditBtn onClickFunc={() => editData(item.id)} />
                                            <DeleteBtn onClickFunc={() => deleteEntry(item.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Test table */}
                    {/* <div className="overflow-auto max-w-[70vw] max-h-[80vh]">
                        <table className='table-basic'>
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
                                            <EditBtn onClickFunc={() => editData(item.id)} />
                                            <DeleteBtn onClickFunc={() => deleteEntry(item.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}

                    <UploadButton apiEndPoint={"schedule"} getData={getSchedule} />
                </div>
            </Section>
        </Layout>
    )
}

export default Schedules