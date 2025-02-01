'use client'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [announcements, setAnnouncements] = useState([]);

    const getAnnouncements = async () => {
        const res = await fetch('/api/announcements');
        const result = await res.json();
        const data = result.data[0];
        // console.log(data);
        setAnnouncements(data);
    }
    useEffect(() => {
        getAnnouncements()

    }, [])
    // useEffect(() => {
    //     console.log(announcements);
    // }, [announcements])

    return (
        <Layout>
            <Section title={'Dashboard'}>
                <div className="">
                    <div>Date: 29 Jan, 2025</div>
                    <div>
                        <p>No. of classes: 45</p>
                        <p>No. of instructors: 45</p>
                    </div>
                </div>
                {/* Annoucements */}
                <div className="">
                    <div className="flex-between">
                        <h2 className="h2">Announcements</h2>
                        <button className="btn-primary">
                            New Announcement
                        </button>
                    </div>
                    <div className="">
                        {announcements?.length > 0 && announcements.map((item, idx) => (
                            <div key={idx} className="bg-gray-600 m-5">
                                <h3 className=''>{item.title}</h3>
                                <p>{item.summary}</p>
                                <span>Posted On:    {item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </Layout>
    )
}

export default Dashboard