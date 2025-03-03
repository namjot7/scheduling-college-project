'use client';
import React, { useEffect, useState } from 'react'

const InstructorForm = ({
    selectedEntry: existingEntry,
    setSelectedEntry: setExistingEntry,
    showForm,
    setShowForm,
    getData
}) => {
    const [formData, setFormData] = useState(existingEntry || {
        s_no: "",
        name: "",
        work_email: "",
        alternate_email: "",
        contact_no: "",
        bachelors: "",
        bachelors_specialty: "",
        masters: "",
        masters_specialty: "",
        phd: "",
        phd_specialty: "",
        working_experience: "",
        length_of_total_industry_experience_years: "",
        length_of_total_teaching_experience_years: "",
        programs_taught_1: ""
    });
    // console.log(existingEntry);

    // If existingEntry is passed, update formData
    useEffect(() => {
        if (existingEntry) {
            setInstructorData({
                s_no: existingEntry.s_no || "",
                name: existingEntry.name || "",
                work_email: existingEntry.work_email || "",
                alternate_email: existingEntry.alternate_email || "",
                contact_no: existingEntry.contact_no || "",
                bachelors: existingEntry.bachelors || "",
                bachelors_specialty: existingEntry.bachelors_specialty || "",
                masters: existingEntry.masters || "",
                masters_specialty: existingEntry.masters_specialty || "",
                phd: existingEntry.phd || "",
                phd_specialty: existingEntry.phd_specialty || "",
                working_experience: existingEntry.working_experience || "",
                length_of_total_industry_experience_years: existingEntry.length_of_total_industry_experience_years || "",
                length_of_total_teaching_experience_years: existingEntry.length_of_total_teaching_experience_years || "",
                programs_taught_1: existingEntry.programs_taught_1 || ""
            });
        }
        // console.log({ existingEntry });
    }, [existingEntry]);

    // console.log(formData);


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target);
        // console.log(name, value);

        setFormData((prevData) => {
            // console.log(prevData); // It should log the previous state correctly
            return {
                ...prevData,
                [name]: value,
            };
        });
    };
    const resetForm = () => {
        setExistingEntry(null);
        setFormData({
            s_no: "",
            name: "",
            work_email: "",
            alternate_email: "",
            contact_no: "",
            bachelors: "",
            bachelors_specialty: "",
            masters: "",
            masters_specialty: "",
            phd: "",
            phd_specialty: "",
            working_experience: "",
            length_of_total_industry_experience_years: "",
            length_of_total_teaching_experience_years: "",
            programs_taught_1: ""
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        // console.log(formData);

        try {
            const url = existingEntry ? `/api/instructors/?id=${existingEntry.id}` : "/api/instructors"
            const method = existingEntry ? "PUT" : "POST";

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
            // const result = await res.json();
            // console.log("Success:", result);

            getData(); // get the updated changes
            setShowForm(false); // Reset
            resetForm();

        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className={`${showForm ? 'fixed' : 'hidden'} top-0 left-0 overflow-auto w-screen h-screen flex items-center justify-center z-10`}>
            {/* Overlay Background */}
            <div className="absolute bg-black opacity-50 w-full h-full" onClick={() => setShowForm(false)} />

            {/* Modal form */}
            <div className="relative bg-white rounded-lg overflow-auto h-[80vh] shadow-lg w-full max-w-3xl z-10">
                <h2 className="h2 text-center mt-10">
                    {existingEntry ? 'Edit the data' : 'Add new Data'}
                </h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="grid grid-cols-2 gap-5 py-6 px-10">
                        {Object.keys(formData).map((key) => (
                            <div key={key} className="flex flex-col">
                                <label className="capitalize">{key.replace(/_/g, " ")}</label>
                                <input
                                    type={
                                        key.includes("date") ? "date" :
                                            key.includes("time") ? "time" :
                                                key.includes("email") ? "email" :
                                                    "text"
                                    }
                                    name={key}
                                    value={formData[key]} onChange={e => handleChange(e)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex-between px-10 gap-2 sticky bottom-0 left-0 bg-gray-200  p-5">
                        <button type="button" onClick={() => resetForm()} className="sticky bottom-0 left-0 btn-default">Clear</button>
                        <button type="submit" className="btn-primary ">Submit</button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default InstructorForm;