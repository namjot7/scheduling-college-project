'use client'
import AnnounceContent from '@/components/AnnounceContent'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import { useUserRole } from '@/components/UserContext'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [date, setDate] = useState(new Date())
    const { userName, role, email } = useUserRole();

    const [schedule, setSchedule] = useState([]);
    const [columns, setColumns] = useState([]);

    const [count, setCount] = useState({
        totalInstructors: 0,
        totalClasses: 0,
    })
    useEffect(() => {
        console.log(role);
        if (role == 1) getCount()
        else if (role == 2) getSchedule()
    }, [role])

    const getCount = async () => {
        // console.log(role);
        const res = await fetch('/api/infoCount')
        const data = await res.json()
        // console.log(data);
        setCount(data)
    }
    // For instructors only
    const getSchedule = async () => {
        console.log('get shcudle clalled');
        const res = await fetch('/api/schedule/instructor/?email=' + email)
        const result = await res.json();
        const scheduleData = result.data[0];
        const columnsData = result.columns[0];
        let modCols = columnsData.map(item => item.COLUMN_NAME);

        // console.log(result);
        // console.log({ scheduleData, columnsData });
        setSchedule(scheduleData);
        setColumns(modCols);
    }
    return (
        <Layout>
            <Section title={'Dashboard'}>
                <div className='flex justify-center flex-col '>
                    <div className='font-semibold text-lg my-5'>Date: {date.toDateString()}</div>

                    {/* No. of instructors and classes */}
                    {role == 1 && <div className='flex gap-10 mb-5'>
                        <div className="flex-between w-56 rounded-md bg-gray-100 shadow-md px-5 py-4 hover:bg-gray-200 transition">
                            <div>
                                <h3 className='text-xl'>Instructors</h3>
                                <span className='text-2xl font-semibold'>{count.totalInstructors}</span>
                            </div>
                            <img src="./navbar/instructor.svg" width={35} alt="" />
                        </div>
                        <div className="flex-between w-56 rounded-md bg-gray-100 shadow-md px-5 py-4 hover:bg-gray-200 transition">
                            <div>
                                <h3 className='text-xl'>Classes</h3>
                                <span className='text-2xl font-semibold'>{count.totalClasses}</span>
                            </div>
                            <img src="./navbar/classroom.svg" width={35} alt="" />
                        </div>
                    </div>}

                    {/* Table */}
                    {role == 2 &&
                        <div className="overflow-scroll max-w-[70vw] max-h-[80vh]">
                            <h2 className="h2">My Schedule</h2>
                            <table className="table-basic">
                                <thead>
                                    <tr>
                                        {columns.map((col, index) => (
                                            <th key={index}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.map((item, idx) => (
                                        <tr key={idx}>
                                            {columns.map((col, index) =>
                                                <td key={index}>{item[col]}</td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                    <AnnounceContent className='!p-0' userNameVisibility={false} />
                </div>
            </Section>
        </Layout>
    )
}

export default Dashboard