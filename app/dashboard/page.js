'use client'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Dashboard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const getAnnouncements = async () => {
        const res = await fetch('/api/announcements');
        const result = await res.json();
        const data = result.data[0];
        // console.log(data);
        setAnnouncements(data);
    }
    const createAnnouncement = async (e) => {
        e.preventDefault();
        // if (!title.trim() || !description.trim()) return;
        const date = new Date().toISOString().split('T')[0];
        const announcementData = {
            title, description, date
        }
        // console.log(announcementData);

        const res = await fetch('/api/announcements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(announcementData),
        });
        const result = await res.json();
        console.log(result);

        // Reset form
        // setTitle("");
        // setDescription("");
    };

    const showAnnco = async () => {

        // if (res.ok) {
        //     console.log('Announcement created:', result);
        //     // Optionally refresh the list of announcements
        //     getAnnouncements();
        // } else {
        //     console.error('Error creating announcement:', result.message);
        // }
    }
    const deleteAnnouncement = async (id) => {
        try {
            const res = await fetch(`/api/announcements/${id}`, {
                method: 'DELETE',
            });

            const result = await res.json();
            if (res.ok) {
                console.log('Announcement deleted:', result);
                // Optionally refresh the list of announcements
                getAnnouncements();
            } else {
                console.error('Error deleting announcement:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

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
                {/* New annoucmente form */}
                <form action="/api/announcements" method="post" onSubmit={e => createAnnouncement(e)}
                    className='bg-gray-900 text-black p-5' >
                    <h3 className="h3">Create new announcement</h3>
                    <input type="text" placeholder="Title" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea rows="3" placeholder="Description" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button type="submit" className="w-full btn-primary">
                        Submit
                    </button>


                </form>

                {/* Annoucements */}
                <div className="">
                    <div className="flex-between">
                        <h2 className="h2">Announcements</h2>
                        <button className="btn-primary" onClick={() => createAnnouncement()}>
                            New Announcement
                        </button>
                    </div>
                    <div className="">
                        {announcements?.length > 0 && announcements.map((item, idx) => (
                            <div key={idx} className="flex-between bg-gray-600 m-5">
                                <div className="">
                                    <h3 className=''>{item.title}</h3>
                                    <p>{item.summary}</p>
                                </div>
                                <div className="">
                                    <span>Posted On: {item.date}</span>
                                    <button className='btn-primary'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </Layout>
    )
}

export default Dashboard