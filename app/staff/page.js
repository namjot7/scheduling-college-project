'use client'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'
import StaffCard from '@/components/StaffCard'
import UploadButton from '@/components/UploadButton'

// Sample raw JSON data from the file
// const rawData = [
//     {
//         __EMPTY: 'WEEK',
//         __EMPTY_1: 'Team',
//         'Mirvish - Winter 2025 Onsite Schedule': 'MON',
//         __EMPTY_2: 'TUE',
//         __EMPTY_3: 'WED',
//         __EMPTY_4: 'THU',
//         __EMPTY_5: 'FRI',
//     },
//     {
//         __EMPTY: 1,
//         'Mirvish - Winter 2025 Onsite Schedule': 45663,
//         __EMPTY_2: 45664,
//         __EMPTY_3: 45665,
//         __EMPTY_4: 45666,
//         __EMPTY_5: 45667,
//     },
//     {
//         __EMPTY_1: 'Academics',
//         'Mirvish - Winter 2025 Onsite Schedule': 'Parth',
//         __EMPTY_2: 'Shakeeni',
//         __EMPTY_3: 'Shakeeni',
//         __EMPTY_4: 'Hania',
//         __EMPTY_5: 'Parth',
//     },
//     {
//         'Mirvish - Winter 2025 Onsite Schedule': 'Camille',
//         __EMPTY_2: 'Hania',
//         __EMPTY_3: 'Jasdeep',
//         __EMPTY_4: 'Nima',
//         __EMPTY_5: 'Danielle',
//     },
//     // more rows...
// ];
const Staff = () => {

    // // Helper function to clean and format the data
    // const cleanScheduleData = (rawData) => {

    //     const headers = rawData[0]; // First row is headers
    //     const weekData = rawData[1]; // Second row contains week info
    //     console.log({ headers, weekData });
    //     // console.log(weekData);

    //     const dates = {
    //         monday: convertDate(weekData["Mirvish - Winter 2025 Onsite Schedule"]),
    //         tuesday: convertDate(weekData.__EMPTY_2),
    //         wednesday: convertDate(weekData.__EMPTY_3),
    //         thursday: convertDate(weekData.__EMPTY_4),
    //         friday: convertDate(weekData.__EMPTY_5),
    //     };
    //     // console.log(dates);

    //     const days = ['MON', 'TUE', 'WED', 'THU', 'FRI']; // Days of the week
    //     const teams = [];

    //     // Loop through rows and clean up data (except header and dates)
    //     rawData.map(row => {
    //         console.log(row);
    //         // Extract the team from the __EMPTY_1 column
    //         const team = row.__EMPTY_1; // || row.__EMPTY Sometimes it is in __EMPTY_1, sometimes __EMPTY
    //         console.log({ team });

    //         if (team) {
    //             days.forEach((day, index) => {
    //                 console.log(row[headers[day]]);

    //                 const staffMember = row[headers[day]]; // Get staff member for each day
    //                 // console.log({ staffMember });

    //                 if (staffMember) {
    //                     teams.push({
    //                         week: weekData.__EMPTY, // week number from the second row
    //                         team: team,
    //                         day: day,
    //                         staff_member: staffMember,
    //                     });
    //                 }
    //             });
    //         }
    //     })
    //     // const row = rawData[i];


    //     // return teams;
    // };
    // Helper function to convert Excel serial date number to a JavaScript Date object
    // const convertDate = (excelDate) => {
    //     const startDate = new Date(1900, 0, 1); // January 1, 1900
    //     const millisecondsInADay = 86400000; // 24 * 60 * 60 * 1000

    //     // Adjust for Excel's incorrect leap year handling (it treats 1900 as a leap year)
    //     const excelLeapYearCorrection = 2;

    //     // Convert the serial date number to a JavaScript Date object
    //     return new Date(startDate.getTime() + (excelDate - excelLeapYearCorrection) * millisecondsInADay);
    // };

    // Use the function to clean the data
    const formattedSchedule = cleanScheduleData(rawData);
    // console.log(formattedSchedule);


    const [schedule, setSchedule] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    // useEffect(() => {
    //     fetch("/api/upload/staff")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setSchedule(data)
    //             setScheduleData(data); // 2nd way
    //         });
    // }, []);
    // const getSchedule = () => {
    //     console.log('get staff schedule');

    // }
    return (
        <Layout>
            <Section title={"On-site staff schedule"}>
                <h2 className="h2">Mirvish Winter 2025 Schedule</h2>
                <div className="flex-center mt-10 rounded-md">
                    <iframe width="1080" height="720" frameborder="1" src="https://guscanada-my.sharepoint.com/personal/namjot_singh3599_nctorontostudents_ca/_layouts/15/Doc.aspx?sourcedoc={ac48f838-ce47-47c1-9ee2-7f1c6b836f36}&action=embedview&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&waccluster=GCA1&edaebp="></iframe>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-5">
                    {/* <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard /> */}

                </div>
                <UploadButton apiEndPoint={"staff"} getData={getSchedule} />

                {/* <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Staff Schedule</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Week</th>
                                <th className="border p-2">Team</th>
                                <th className="border p-2">Day</th>
                                <th className="border p-2">Name</th>
                            </tr>
                        </thead>
                        <tbody>

                            {schedule?.length && schedule.map((row) => (
                                <tr key={row.id} className="text-center">
                                    <td className="border p-2">{row.week}</td>
                                    <td className="border p-2">{row.team}</td>
                                    <td className="border p-2">{row.day}</td>
                                    <td className="border p-2">{row.name}</td>
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

            </Section>
        </Layout>
    )
}

export default Staff