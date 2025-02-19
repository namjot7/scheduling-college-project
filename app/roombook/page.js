'use client'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'

const RoomBook = () => {
    const [roomRequests, setRoomRequests] = useState([]);

    const [fullName, setFullName] = useState("" || "namjot");
    const [email, setEmail] = useState("" || "namjot@gmail.com");
    const [department, setDepartment] = useState("" || "acadmeics");
    const [purpose, setPurpose] = useState("" || "for event");
    const [room, setRoom] = useState("" || "Room 101");
    const [date, setDate] = useState("" || "2025-11-11");
    const [time, setTime] = useState("" || "14:00");
    const [capacity, setCapacity] = useState(0 || 25);
    const [remarks, setRemarks] = useState("" || "Need the room Urgent for next week event.");

    const [toggle, setToggle] = useState(false)

    const getRoomRequests = async () => {
        const res = await fetch("/api/roombook");
        const data = await res.json()
        setRoomRequests(data[0])
        console.log(data[0]);
    }
    useEffect(() => {
        getRoomRequests()
    }, [])

    const handleForm = async e => {
        e.preventDefault();

        const bookingData = {
            fullName, email, department, purpose, room, date, time,
        };
        // console.log(bookingData);

        const response = await fetch("/api/roombook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        });
        // const data = await response.json()
        // console.log(data);
        getRoomRequests()

        // if (response.ok) {
        //     alert("Room booked successfully!");
        //     // Reset form after successful submission
        //     setFullName("");
        //     setEmail("");
        //     setDepartment("");
        //     setPurpose("");
        //     setRoom("Room 101");
        //     setDate("");
        //     setTime("");
        // } else {
        //     alert("Failed to book the room.");
        // }
    }
    return (
        <Layout>
            <Section title={"Room Book Request"}>
                <div className="p-6 rounded-lg shadow-lg w-full text-black flex gap-5">
                    <button className='btn-default absolute top-10 right-10' onClick={() => setToggle(!toggle)}>hide</button>

                    {/* User: Room book form */}
                    <form onSubmit={e => handleForm(e)} className={`${toggle ? 'hidden' : 'block'}  w-full shadow-md lg:w-1/2 px-10 py-5 bg-gray-100`}>
                        <h2 className="h2">Book a Room (Not admin)</h2>

                        <label>Full Name</label>
                        <input type='text' value={fullName} onChange={e => setFullName(e.target.value)} />

                        <label>Contact Email</label>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                        <label>Department</label>
                        <input type='text' value={department} onChange={e => setDepartment(e.target.value)} />

                        <label>Capacity Required</label>
                        <input type='text' value={capacity} onChange={e => setCapacity(e.target.value)} />

                        <label>Purpose</label>
                        <textarea className='input' placeholder="Enter purpose of booking" rows={3} value={purpose} onChange={e => setPurpose(e.target.value)}></textarea>

                        {/* <label className="block mb-2 font-medium">Select Room</label>
                        <select className='input' value={room} onChange={e => setRoom(e.target.value)}>
                            <option>Room 101</option>
                            <option>Room 102</option>
                            <option>Room 103</option>
                        </select> */}

                        <div className="flex gap-4">
                            <div>
                                <label>Date</label>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                            </div>
                            <div>
                                <label>Start Time</label>
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                            </div>
                            {/* <div>
                                <label>End Time</label>
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                            </div> */}
                        </div>

                        <label>Comment (Optional)</label>
                        <textarea className='input' placeholder="Enter purpose of booking" rows={3} value={remarks} onChange={e => setRemarks(e.target.value)}></textarea>

                        <button type="submit" className="btn-primary w-full mt-5">
                            Submit Request
                        </button>
                    </form>

                    {/* Admin: Room book requests */}
                    <div className={`${toggle ? 'block' : 'hidden'} w-full`}>
                        <h2 className="h2">Requests (Admin)</h2>
                        <div className="flex gap-4  flex-col">
                            {roomRequests?.length > 0 && roomRequests.map(item => (
                                <div key={item.id} className="bg-white flex-between p-6 rounded-lg shadow-lg mb-4">
                                    <ul>
                                        <li className="h4">User Details</li>
                                        <li>{item.full_name}</li>
                                        <li>{item.email}</li>
                                        <li>{item.department}</li>
                                    </ul>
                                    <ul>
                                        <li className="h4">Booking Details</li>
                                        <li>{item.purpose}</li>
                                        <li>{item.room}</li>
                                        <li>{item.date.split('T')[0]}</li>
                                        <li>{item.time}</li>
                                    </ul>
                                    <div className={`flex items-center justify-center px-3 py-1 rounded-md pointer-events-none ${item.approved == 1 ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.approved == 1 ? "Approved" : "Pending"}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="bg-green-500 px-4 py-2 rounded-md text-white">Approve</button>
                                        <button className="btn-danger">Reject</button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
        </Layout >
    )
}

export default RoomBook