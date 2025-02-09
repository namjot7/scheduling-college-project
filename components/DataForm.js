'use client'
import { useEffect, useState } from "react"
import { Button, Modal } from "flowbite-react";
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
    showForm,
    setShowForm
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

    const saveData = async () => {
        // e.preventDefault();

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
        <div>
            {/* className={`${showForm ? 'block' : 'hidden'} bg-gray-50 p-5 form-basic absolute top-[20%] left-0`} */}
            
            <Modal dismissible show={showForm} onClose={() => setShowForm(false)}>
                {/* <form onSubmit={e => saveData(e)} > */}
                    <Modal.Header>Add New Data</Modal.Header>
                    <Modal.Body>
                        <input
                            className='rounded-sm'
                            type="text" placeholder='Name'
                            value={name} onChange={e => setName(e.target.value)}
                        />
                        <input
                            className='rounded-sm'
                            type="text" placeholder='Course'
                            value={course} onChange={e => setCourse(e.target.value)}
                        />
                        <input
                            className='rounded-sm'
                            type="text" placeholder='Semester'
                            value={semester} onChange={e => setSemester(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            color="success"
                            onClick={() => {
                                setShowForm(false)
                                saveData();
                            }}
                            type="submit">
                            Save
                        </Button>
                        <Button color="red"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                {/* </form> */}
            </Modal>
        </div>
    )
}

export default DataForm