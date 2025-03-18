'use client'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'
import StaffCard from '@/components/StaffCard'
import UploadButton from '@/components/UploadButton'



const Staff = () => {
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
                <UploadButton apiEndPoint={"staff"} getData={getSchedule} />

                {/* <div className="mt-5 overflow-y-auto max-h-[80vh]">
                    <table className="w-full border-collapse border border-gray-400 mt-10">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="border p-2">Week</th>
                                <th className="border p-2">Team</th>
                                <th className="border p-2">Day</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule?.length && schedule.map(item => (
                                <tr key={item.id} className="">
                                    <td className="border p-2">{item.week}</td>
                                    <td className="border p-2">{item.team}</td>
                                    <td className="border p-2">{item.day}</td>
                                    <td className="border p-2">{item.name}</td>
                                    <td className="border p-2">
                                        {new Date(item.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short", // "long" for full name
                                            day: "2-digit"
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}

                {/* {scheduleData.map((week, index) => (
                    <div key={index} weekData={week} className="p-4 shadow-md w-full mb-4">
                        <h2 className="text-xl font-bold mb-2">Week {weekData.week}</h2>
                        {weekData.teams.map((team, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">{team.teamName}</h3>
                                <div className="grid grid-cols-6 gap-2 border p-2 bg-gray-50">
                                    <span className="font-bold">Day</span>
                                    {team.schedule.map((entry, i) => (
                                        <span key={i}>{entry.day}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-6 gap-2 border p-2">
                                    <span className="font-bold">Name</span>
                                    {team.schedule.map((entry, i) => (
                                        <span key={i}>{entry.name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))} */}

                <div className=" p-4">
                    {Object.entries(scheduleByWeek).map(([week, schedules]) => (
                        <div key={week} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Date: {week}</h2>
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="border p-2">Team</th>
                                        <th className="border p-2">Day</th>
                                        <th className="border p-2">Date</th>
                                        <th className="border p-2">Names</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map(schedule => (
                                        <tr key={schedule.id} className="">
                                            <td className="border p-2">{schedule.team}</td>
                                            <td className="border p-2">{schedule.day}</td>
                                            <td className="border p-2">
                                                {new Date(schedule.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "2-digit"
                                                })}
                                            </td>
                                            <td className="border p-2">{schedule.name}</td>
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