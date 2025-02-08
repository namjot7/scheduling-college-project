
## Code for validation in Room request form
````
import { useState } from "react";

const RoomBookingForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [purpose, setPurpose] = useState("");
    const [room, setRoom] = useState("Room 101");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validation function
    const validateForm = () => {
        let newErrors = {};

        if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";
        if (!department.trim()) newErrors.department = "Department is required.";
        if (!purpose.trim()) newErrors.purpose = "Purpose is required.";
        if (!date) newErrors.date = "Date is required.";
        if (!time) newErrors.time = "Time is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        const bookingData = { fullName, email, department, purpose, room, date, time };

        try {
            const response = await fetch("/api/roombook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                alert("Room booked successfully!");
                setFullName("");
                setEmail("");
                setDepartment("");
                setPurpose("");
                setRoom("Room 101");
                setDate("");
                setTime("");
                setErrors({});
            } else {
                alert("Failed to book the room.");
            }
        } catch (error) {
            console.error("Error booking room:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-400 p-6 rounded-lg shadow-lg w-full max-w-md text-black">
            <h2 className="text-xl font-semibold mb-4">Book a Room</h2>
            <form onSubmit={handleForm}>
                <label>Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                <label>Contact Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <label>Department</label>
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input"
                />
                {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}

                <label>Purpose</label>
                <textarea
                    className="input"
                    placeholder="Enter purpose of booking"
                    rows={3}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                ></textarea>
                {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}

                <label className="block mb-2 font-medium">Select Room</label>
                <select
                    className="input"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                >
                    <option>Room 101</option>
                    <option>Room 102</option>
                    <option>Room 103</option>
                </select>

                <div className="flex gap-4">
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    <div>
                        <label>Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="input"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-primary w-full mt-5"
                    disabled={isLoading}
                >
                    {isLoading ? "Booking..." : "Book Now"}
                </button>
            </form>
        </div>
    );
};

export default RoomBookingForm;

````