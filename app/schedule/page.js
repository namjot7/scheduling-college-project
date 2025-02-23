'use client'
import { DeleteBtn, EditBtn } from '@/components/design/icons'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import UploadButton from '@/components/UploadButton'
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ScheduleForm from '@/components/ScheduleForm'

const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]); // Separate filtered data
    const [columns, setColumns] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const displayData = filteredSchedule.length > 0 ? filteredSchedule : scheduleInfo;
    const [visibleColumns, setVisibleColumns] = useState({});
    const [selectedEntry, setSelectedEntry] = useState(null);  // Track the ID of the entry being edited 
    const [showForm, setShowForm] = useState(false);

    const getSchedule = async () => {
        const res = await fetch('/api/schedule');
        const result = await res.json();
        // console.log(result);

        const data = result.data[0];
        const columnsData = result.columnsData[0];
        let modCols = columnsData.map(item => item.COLUMN_NAME);
        // console.log(modCols); // Get column_name

        // Initialize visibility for all columns as true
        let initialVisibility = {};
        modCols.forEach(col => initialVisibility[col] = true)
        // console.log(initialVisibility);

        setScheduleInfo(data);
        setColumns(modCols);
        setVisibleColumns(initialVisibility);
    }
    useEffect(() => {
        // console.log({ columns });
    }, [columns])

    const editData = async (id) => {
        setShowForm(true);
        const itemToEdit = scheduleInfo.find(item => item.id === id);
        // console.log(itemToEdit);
        setSelectedEntry(itemToEdit);
    }
    const deleteEntry = async (id) => {
        let confirmDelete = confirm("Are you sure you want to delete this entry? This action cannot be reversed.")
        if (confirmDelete) {
            await fetch(`/api/schedule?id=${id}`, {
                method: 'DELETE',
            });
            getSchedule();
        }
    }

    // Function to Export Data as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(scheduleInfo);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "schedule.xlsx");
    };
    // Handle column visibility toggle
    const toggleColumnVisibility = (col) => {
        setVisibleColumns(prev => ({
            ...prev, [col]: !prev[col]
        }));
    };
    // Search for all fields
    useEffect(() => {
        let lowerSearchTerm = searchTerm.toLowerCase();
        let updatedSchedule = scheduleInfo.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(lowerSearchTerm)
            )
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
                            <button onClick={() => setShowForm(!showForm)} className='btn-primary flex-center'>
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
                        <SheetContent className="overflow-auto p-0" aria-describedby={undefined}>
                            <SheetHeader>
                                <SheetTitle className="px-5 pt-5">Select the columns to display</SheetTitle>
                            </SheetHeader>
                            <div className="mt-5 relative ">
                                {Object.keys(visibleColumns).map(col => (
                                    <div className="flex items-center px-5" key={col}>
                                        <input
                                            checked={visibleColumns[col]}
                                            onChange={() => toggleColumnVisibility(col)}
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
                    <ScheduleForm
                        selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
                        showForm={showForm} setShowForm={setShowForm}
                        getSchedule={getSchedule}
                    />

                    {/* Table */}
                    <div className="overflow-scroll max-w-[70vw] max-h-[80vh]">
                        <table className="table-basic">
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    {columns.map((col, index) => (
                                        visibleColumns[col] && <th key={index}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {displayData.map((item, idx) => (
                                    <tr key={idx} className='relative'>
                                         <td className="flex gap-3">
                                            <EditBtn onClickFunc={() => editData(item.id)} />
                                            <DeleteBtn onClickFunc={() => deleteEntry(item.id)} />
                                        </td>
                                        {columns.map((col, index) =>
                                            visibleColumns[col] && <td key={index}>{item[col]}</td>
                                        )}
                                       
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