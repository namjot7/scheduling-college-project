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

const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);  // Track the ID of the entry being edited

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSchedule, setFilteredSchedule] = useState([]); // Separate filtered data

    const displayData = filteredSchedule.length > 0 ? filteredSchedule : scheduleInfo;
    const [showDialog, setShowDialog] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState({
        s_no: true,
        session: true,
        program: true,
        intakeId: true,
        course: true,
        semester: true,
        name: true,
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
        console.log(splitData, data);
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
        console.log(lowerSearchTerm);

        // Search for all fields
        const updatedSchedule = scheduleInfo.filter(item =>
            item.Program.toLowerCase().includes(lowerSearchTerm) ||
            item.Course_Name.toLowerCase().includes(lowerSearchTerm) ||
            item.Semester.toLowerCase().includes(lowerSearchTerm)
        );
        // console.log(updatedSchedule);
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
                        <SheetContent className="overflow-auto p-0">
                            <SheetHeader>
                                <SheetTitle className="px-5 pt-5">Select the columns to display</SheetTitle>
                            </SheetHeader>
                            <div className="mt-5 relative ">
                                {Object.keys(visibleColumns).map(col => (
                                    <div className="flex items-center px-5" key={col}>
                                        <input
                                            checked={visibleColumns[col]}
                                            onChange={() => {
                                                setVisibleColumns(prev => ({
                                                    ...prev, [col]: !prev[col]
                                                }));
                                            }}
                                            type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
                                        <label className="ms-2 text-sm font-medium text-gray-900">{col}</label>
                                    </div>
                                ))}
                            </div>
                            <SheetFooter className={'sticky bottom-1 w-full'}>
                                <SheetClose asChild>
                                    <Button className="w-full" type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    {/* Edit and Add Dialog */}
                    <ScheduleDialog {...selectedEntry}
                        showDialog={showDialog} setShowDialog={setShowDialog}
                        getSchedule={getSchedule}
                    />

                    {/* Table */}
                    <div className="overflow-scroll max-w-[70vw] max-h-[80vh]">
                        <table className="table-basic">
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    {visibleColumns.s_no && <th>S_No</th>}
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
                                </tr>
                            </thead>
                            <tbody>
                                {displayData?.length > 0 && displayData.map((item, idx) => (
                                    <tr key={idx} className=''>
                                        <td className="flex gap-3">
                                            <EditBtn onClickFunc={() => editData(item.id)} />
                                            <DeleteBtn onClickFunc={() => deleteEntry(item.id)} />
                                        </td>
                                        {visibleColumns.s_no && <td>{item.s_no}</td>}
                                        {visibleColumns.session && <td>{item.session}</td>}
                                        {visibleColumns.program && <td>{item.program}</td>}
                                        {visibleColumns.intakeId && <td>{item.intake_id}</td>}
                                        {visibleColumns.semester && <td>{item.semester}</td>}
                                        {visibleColumns.term && <td>{item.term}</td>}
                                        {visibleColumns.group && <td>{item.group_name}</td>}
                                        {visibleColumns.code && <td>{item.code}</td>}
                                        {visibleColumns.course && <td>{item.course_name}</td>}
                                        {visibleColumns.campus && <td>{item.campus}</td>}
                                        {visibleColumns.delivery && <td>{item.delivery}</td>}
                                        {visibleColumns.roomNo && <td>{item.room_no}</td>}
                                        {visibleColumns.credits && <td>{item.credits}</td>}
                                        {visibleColumns.hoursPaid && <td>{item.hours_paid_for_the_class}</td>}
                                        {visibleColumns.hours && <td>{item.hours}</td>}
                                        {visibleColumns.finalEnrolment && <td>{item.enrolment_in_class}</td>}
                                        {visibleColumns.startDate && <td>{item.start_date}</td>}
                                        {visibleColumns.endDate && <td>{item.end_date}</td>}
                                        {visibleColumns.draftSchedule && <td>{item.schedule_draft}</td>}
                                        {visibleColumns.instructor && <td>{item.instructor}</td>}
                                        {visibleColumns.instructorEmail && <td>{item.instructor_email_id}</td>}
                                        {visibleColumns.programManager && <td>{item.program_manager}</td>}
                                        {visibleColumns.capacity && <td>{item.capacity}</td>}
                                        {visibleColumns.additionalCapacity && <td>{item.additional_capacity}</td>}
                                        {visibleColumns.campusAddressCode && <td>{item.campus_address_code}</td>}
                                        {visibleColumns.campusAddressCode && <td>{item.remarks}</td>}
                                        {visibleColumns.credentialsAndQualifications && <td>{item.credentails___qulaifications}</td>}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <UploadButton apiEndPoint={"schedule"} getData={getSchedule} />
                </div>
            </Section>
        </Layout>
    )
}

export default Schedules