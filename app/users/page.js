// 'use client'

// import Layout from '@/components/design/Layout'
// import UserCard from '@/components/design/UserCard'
// import Section from '@/components/Section'
// import React from 'react'

// const Users = () => {
//     return (
//         <Layout>
//             <Section title={"All Users"}>
//                 <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3">
//                                     Name
//                                 </th>
//                                 <th scope="col" className="px-6 py-3">
//                                     Email
//                                 </th>
//                                 <th scope="col" className="px-6 py-3">
//                                     Role
//                                 </th>
//                                 <th scope="col" className="px-6 py-3">
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <UserCard role={"Admin"} />
//                             <UserCard role={"Observer"} />
//                             <UserCard role={"Instructor"} />
//                             <UserCard role={"Instructor"} />
//                             <UserCard role={"Observer"} />
//                         </tbody>
//                     </table>
//                 </div>

//             </Section>
//         </Layout>
//     )
// }

// export default Users

"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/design/Layout";
import Section from "@/components/Section";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "" });
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [dynamicText, setDynamicText] = useState("Add");

    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await fetch('/api/users');
        const result = await response.json();
        const data = result[0]
        // console.log(data);
        setUsers(data)
    }

    // const filteredUsers = users
    //     .filter(user =>
    //         user.name.toLowerCase().includes(search.toLowerCase()) ||
    //         user.email.toLowerCase().includes(search.toLowerCase())
    //     )
    //     .sort((a, b) => {
    //         const fieldA = a[sortField].toLowerCase();
    //         const fieldB = b[sortField].toLowerCase();
    //         return sortOrder === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    //     });

    const handleSort = (field) => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortField(field);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const editUser = (user) => {
        // console.log(user);
        const userData = {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        }
        setFormData(userData);
        setSelectedUserId(user.id);
        setDynamicText("Update")
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        saveUser()
    };
    const saveUser = async () => {
        const url = selectedUserId ? `/api/users/?id=${selectedUserId}` : "/api/users"
        const method = selectedUserId ? "PUT" : "POST";
        // console.log({ formData, selectedUserId });
        console.log(method, url);

        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok && method == 'POST') {
            alert("Successfully added.")
        }
        else if (res.ok && method == 'PUT') {
            alert("Successfully Updated.")
        }

        getUsers(); // get the updated changes
        resetForm();
    }
    const deleteUser = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }
        const res = await fetch(`/api/users?id=${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert("Deleted successfully");
            getUsers();
        } else {
            alert("Failed to delete");
        }
    };
    const resetForm = () => {
        setFormData({ username: "", email: "", password: "", role: "" });
        setDynamicText("Add");
    }

    return (
        <Layout>
            <Section title="All Users">
                {/* Search button and User form */}
                <div>
                    <div className="mb-5 w-1/3">
                        <input type="text" placeholder="Search Users..."
                            value={search} onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <h3 className="h3">{dynamicText} User</h3>
                    <form onSubmit={e => handleSubmit(e)} className="flex gap-3 h-[36px] mt-3 mb-5">
                        <input type="text" name="username" className=" w-full"
                            value={formData.username} onChange={handleChange} placeholder="Name"
                        />
                        <input type="email" name="email" className=" w-full"
                            value={formData.email} onChange={handleChange} placeholder="Email"
                        />
                        <input type="text" name="password" className=" w-full"
                            value={formData.password} onChange={handleChange} placeholder="Password"
                        />
                        <select name="role" className="input  w-1/2"
                            value={formData.role} onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="1">Admin</option>
                            <option value="2">Instructor</option>
                            <option value="3">Observer</option>
                        </select>
                        <button type="submit" className="btn-primary w-1/2">
                            {dynamicText}
                        </button>
                    </form>
                </div>

                {/* Table */}
                <table className="table-basic ">
                    <thead className="">
                        <tr>
                            <th className="cursor-pointer" onClick={() => handleSort("name")}>Name ⬍</th>
                            <th className="cursor-pointer">Email</th>
                            <th className="cursor-pointer">Passwords</th>
                            <th className="cursor-pointer">Role</th>
                            <th className="px-6 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filteredUsers.map(user => ( */}
                        {users?.length > 0 && users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                                <td className="flex gap-3">
                                    <button onClick={() => editUser(user)}
                                        className="text-blue-600 hover:text-blue-800 font-semibold transition">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteUser(user.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                        {/* ))} */}
                    </tbody>
                </table>
            </Section>
        </Layout>
    );
};

export default Users;