'use client'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'
import StaffCard from '@/components/StaffCard'
import UploadButton from '@/components/UploadButton'
import { useUserRole } from '@/components/UserContext'



const Staff = () => {
    const { role } = useUserRole()
    const [schedule, setSchedule] = useState([]);
    const [scheduleByWeek, setScheduleByWeek] = useState([]);

    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        getSchedule()
    }, []);

    const getSchedule = async () => {
        const res = await fetch("/api/upload/staff")
        const result = await res.json()
        console.log(result);
        setSchedule(result)

        // const groupedByWeek = result.reduce((acc, item) => {
        //     if (!acc[item.week]) {
        //         acc[item.week] = [];
        //     }
        //     acc[item.week].push(item);
        //     return acc;
        // }, {});

        // console.log(groupedByWeek);
        console.log(groupByDate(result));
        let byweek = groupByDate(result)
        setScheduleByWeek(byweek)
    }
    const groupByDay = (schedules) => {
        return schedules.reduce((acc, schedule) => {
            if (!acc[schedule.day]) {
                acc[schedule.day] = [];
            }
            acc[schedule.day].push(schedule);
            return acc;
        }, {});
    };
    // Function to group by date
    const groupByDate = (data) => {
        return data.reduce((acc, item) => {
            const dateKey = item.date.split("T")[0]; // Extract YYYY-MM-DD
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(item);
            return acc;
        }, {});
    };
    return (
        <Layout>
            <Section title={"On-site staff schedule"}>
                {/* iFrame Excel online */}
                {/* <div className="flex-center mt-10 rounded-md">
                    <iframe width="1080" height="720" frameborder="1" src="https://guscanada-my.sharepoint.com/personal/namjot_singh3599_nctorontostudents_ca/_layouts/15/Doc.aspx?sourcedoc={ac48f838-ce47-47c1-9ee2-7f1c6b836f36}&action=embedview&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&waccluster=GCA1&edaebp="></iframe>
                </div> */}

                <div className="mt-10 grid grid-cols-3 gap-5">
                    {/* <StaffCard /> */}

                </div>
                {role == 1 && <UploadButton apiEndPoint={"staff"} getData={getSchedule} />}

                <div className=" p-4">
                    {Object.entries(scheduleByWeek).map(([week, schedules]) => (
                        <div key={week} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Date: {week}</h2>
                            <table className="table-basic">
                                <thead>
                                    <tr className="text-left">
                                        <th>Team</th>
                                        <th>Day</th>
                                        <th>Date</th>
                                        <th>Names</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map(schedule => (
                                        <tr key={schedule.id}>
                                            <td>{schedule.team}</td>
                                            <td>{schedule.day}</td>
                                            <td>
                                                {new Date(schedule.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "2-digit"
                                                })}
                                            </td>
                                            <td>{schedule.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </Section>
        </Layout>
    )
}

export default Staff