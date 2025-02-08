'use client'
import { useEffect, useState } from "react"

// position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background: pink;
//     padding: 20px;
//     width: 500px;
//     height: 50vh;
const DataForm = ({
    id,
    name: existingName,
    course: existingCourse,
    semester: existingSemester,
    getSchedule,
}) => {
    const [existingId, setExistingId] = useState("" || id);
    const [name, setName] = useState(existingName || "");
    const [course, setCourse] = useState(existingCourse || "");
    const [semester, setSemester] = useState(existingSemester || "");


    // Loading existing values to the useState variables
    useEffect(() => {
        setExistingId("" || id)
        setName(existingName || "")
        setCourse(existingCourse || "")
        setSemester(existingSemester || "")

        // console.log({ id, existingName, existingCourse, existingSemester });
    }, [existingName, existingCourse, existingSemester])




    const saveData = async (e) => {
        e.preventDefault();

        const newEntry = {
            id: existingId || "",
            name: name,
            course: course,
            semester: semester,
        };
        console.log(newEntry);

        // UPDATE Request
        if (existingId) {
            console.log("Id exists", existingId);
            await fetch("/api/schedule", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            })
            getSchedule()
            return;
        }
        // POST (CREATE) the data if ID does not exist
        const res = await fetch('/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry), // Send the new entry data as JSON
        });
        // const result = await res.json();
        // console.log(result);

        // setScheduleInfo([...prev, newEntry]);
        getSchedule();

        // Clear input fields after submission
        // setName("");
        // setCourse("");
        // setSemester("");
    }
    return (
        <form onSubmit={e => saveData(e)}>
            <h3 className="h3">Add New Data</h3>
            <input
                className='block mb-3 px-3 py-1 text-black'
                type="text" placeholder='Name'
                value={name} onChange={e => setName(e.target.value)}
            />
            <input
                className='block mb-3 px-3 py-1 text-black'
                type="text" placeholder='Course'
                value={course} onChange={e => setCourse(e.target.value)}
            />
            <input
                className='block mb-3 px-3 py-1 text-black'
                type="text" placeholder='Semester'
                value={semester} onChange={e => setSemester(e.target.value)}
            />
            <button className="btn-primary" type="submit">
                Submit
            </button>
        </form>
    )
}

export default DataForm