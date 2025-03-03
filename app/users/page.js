// import UserCard from '@/components/design/UserCard'
// import Layout from '@/components/Layout'
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

import React, { useState } from "react";
import Layout from "@/components/design/Layout";
import Section from "@/components/Section";

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Observer" },
        { id: 3, name: "Alice Brown", email: "alice@example.com", role: "Instructor" },
        { id: 4, name: "Bob Johnson", email: "bob@example.com", role: "Instructor" },
        { id: 5, name: "Charlie White", email: "charlie@example.com", role: "Observer" }
    ]);

    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", role: "" });
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const fieldA = a[sortField].toLowerCase();
            const fieldB = b[sortField].toLowerCase();
            return sortOrder === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        });

    const handleSort = (field) => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortField(field);
    };

    const handleEdit = (user) => {
        setEditMode(user.id);
        setFormData({ name: user.name, email: user.email, role: user.role });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, ...formData } : user));
        setEditMode(null);
        setMessage("✅ User updated successfully.");
        setTimeout(() => setMessage(""), 3000);
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        setUsers(users.filter(user => user.id !== id));
        setMessage("❌ User deleted successfully.");
        setTimeout(() => setMessage(""), 3000);
    };

    const handleAddUser = () => {
        if (!formData.name.trim()) {
            setMessage("❌ Name cannot be empty.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setMessage("❌ Invalid email format.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        if (!formData.role) {
            setMessage("❌ Please select a role.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const newUser = {
            id: Date.now(), // Ensures uniqueness
            name: formData.name,
            email: formData.email,
            role: formData.role,
        };
        setUsers([...users, newUser]);
        setFormData({ name: "", email: "", role: "" });
        setMessage("✅ New user added successfully.");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <Layout>
            <Section title="User Management">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    {message && <div className="mb-4 p-3 text-white font-semibold rounded-lg bg-green-500 dark:bg-green-700">{message}</div>}

                    <div className="mb-4 flex space-x-4">
                        <input
                            type="text"
                            placeholder="Search Users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 rounded w-1/4"
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border p-2 rounded w-1/4"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border p-2 rounded w-1/4"
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border p-2 rounded w-1/4"
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Observer">Observer</option>
                            <option value="Instructor">Instructor</option>
                        </select>
                        <button
                            onClick={handleAddUser}
                            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                        >
                            Add User
                        </button>
                    </div>

                    <table className="w-full text-sm text-gray-700 dark:text-gray-300 border-collapse">
                        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSort("name")}>Name ⬍</th>
                                <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSort("email")}>Email ⬍</th>
                                <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSort("role")}>Role ⬍</th>
                                <th className="px-6 py-3 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <td className="px-6 py-4 border">{user.name}</td>
                                    <td className="px-6 py-4 border">{user.email}</td>
                                    <td className="px-6 py-4 border">{user.role}</td>
                                    <td className="px-6 py-4 flex justify-center space-x-4 border">
                                        <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800 font-semibold transition">Edit</button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 font-semibold transition">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>
        </Layout>
    );
};

export default Users;