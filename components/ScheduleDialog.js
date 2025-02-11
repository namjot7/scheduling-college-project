'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ScheduleDialog = ({
    id,
    name: existingName,
    course: existingCourse,
    semester: existingSemester,
    getSchedule,
    showDialog,
    setShowDialog
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
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Add New Data</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Course
                        </Label>
                        <Input value={course} onChange={e => setCourse(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Semester
                        </Label>
                        <Input value={semester} onChange={e => setSemester(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="w-1/3 mx-auto" type="submit" onClick={e => {
                        saveData(e);
                        setShowDialog(false);
                    }}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ScheduleDialog