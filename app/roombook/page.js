'use client'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'

const RoomBook = () => {
    const [roomRequests, setRoomRequests] = useState([]);

    const [form, setForm] = useState({
        fullName: '' || "namjot",
        email: '' || "namjot@gmail.com",
        department: '' || "academics",
        purpose: '' || "for event",
        date: '' || "2025-11-11",
        startTime: '' || "14:00",
        endTime: '' || "14:00",
        capacity: '' || 25,
    });


    useEffect(() => {
        getRoomRequests()
    }, [])

    const getRoomRequests = async () => {
        const res = await fetch("/api/roombook");
        const data = await res.json()
        setRoomRequests(data[0])
        console.log(data[0]);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target);
        // console.log(name, value);
        setForm(prevData => (
            { ...prevData, [name]: value }
        ));
    };

    const handleForm = async e => {
        e.preventDefault();
        console.log(form);

        const response = await fetch("/api/roombook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
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
        //     setStartTime("");
        //     setEndTime("");
        // } else {
        //     alert("Failed to book the room.");
        // }
    }
    const updateApprovalStatus = async (id, status) => {
        console.log(id, status);

        const response = await fetch(`/api/roombook/?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),  // status can be 0, 1, or 2
        });
        const data = await response.json();
        if (data.success) {
            alert('Status updated successfully');
            getRoomRequests();
        } else {
            alert(`Error: ${data.message}`);
        }
    }

    return (
        <Layout>
            <Section title={"Room Book Request"}>
                <div className="p-6 rounded-lg shadow-lg w-full text-black flex flex-wrap gap-5">

                    {/* User: Room book form */}
                    <form onSubmit={e => handleForm(e)} className='w-full shadow-md lg:w-1/2 px-10 py-5 bg-gray-100'>
                        <h2 className="h2">Book a Room</h2>

                        <label>Full Name</label>
                        <input type='text' name="fullName" value={form.fullName} onChange={e => handleChange(e)} />

                        <label>Contact Email</label>
                        <input type='text' name="email" value={form.email} onChange={e => handleChange(e)} />

                        <label>Department</label>
                        <input type='text' name="department" value={form.department} onChange={e => handleChange(e)} />

                        <label>Capacity Required</label>
                        <input type='number' name="capacity" value={form.capacity} onChange={e => handleChange(e)} />

                        <label>Purpose</label>
                        <textarea className='input' placeholder="Enter purpose of booking" rows={3} name="purpose" value={form.purpose} onChange={e => handleChange(e)} />


                        {/* <label className="block mb-2 font-medium">Select Room</label>
                        <select className='input' value={form.room} onChange={e=>handleChange(e)}/>
                            <option>Room 101</option>
                            <option>Room 102</option>
                            <option>Room 103</option>
                        </select> */}

                        <div className="flex gap-4">
                            <div>
                                <label>Date</label>
                                <input type="date" name='date' value={form.date} onChange={e => handleChange(e)} />
                            </div>
                            <div>
                                <label>Start Time</label>
                                <input type="time" name='startTime' value={form.startTime} onChange={e => handleChange(e)} />
                            </div>
                            <div>
                                <label>End Time</label>
                                <input type="time" name='endTime' value={form.endTime} onChange={e => handleChange(e)} />
                            </div>
                            {/* <div>
                                <label>End startTime</label>
                                <input type="starttime" value={form.starttime} onChange={e=>handleChange(e)}/>value)} />
                            </div> */}
                        </div>

                        <button type="submit" className="btn-primary w-full mt-5">
                            Submit Request
                        </button>
                    </form>

                    {/* Admin: Room book requests */}
                    <div className='w-full'>
                        <h2 className="h2">Requests</h2>
                        <div className="flex gap-4  flex-col">
                            {roomRequests?.length > 0 && roomRequests.map(item => (
                                <div key={item.id} className="bg-white flex-between p-6 rounded-lg shadow-lg mb-4">
                                    <ul>
                                        <li className="h4">User Details</li>
                                        <li>{item.fullName}</li>
                                        <li>{item.email}</li>
                                        <li>{item.department}</li>
                                    </ul>
                                    <ul>
                                        <li className="h4">Booking Details</li>
                                        <li>{item.purpose}</li>
                                        <li>{item.room}</li>
                                        <li>Capacity: {item.capacity}</li>
                                        <li>{item.date.split('T')[0]}</li>
                                        <li>{item.startTime.slice(0, 5)} to {item.endTime.slice(0, 5)}</li>
                                    </ul>
                                    <div className={`flex items-center justify-center px-3 py-1 rounded-md pointer-events-none ${item.status == 1 ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.status === 1
                                            ? "Done"
                                            : item.status === 2
                                                ? "Pending"
                                                : "Rejected"}
                                    </div>
                                    {item.status == 2 && <div className="flex gap-2">
                                        <button className="btn-success" onClick={e => updateApprovalStatus(item.id, 1)}>Approve</button>
                                        <button className="btn-danger" onClick={e => updateApprovalStatus(item.id, 0)}>Reject</button>
                                    </div>}
                                </div>
                            ))
                            }
                        </div >
                    </div >

                    {/* Request status */}
                    <div className="min-h-40 bg-gray-400">
                        dfd
                    </div>
                </div >
            </Section >
        </Layout >
    )
};
export default RoomBook