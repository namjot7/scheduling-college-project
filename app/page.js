"use client"
import Link from "next/link";

export default function Home() {

  return (
    <div className="invert h-screen w-screen flex flex-col gap-6 justify-center items-center bg-gray-100">
      <h1 className="h1">Welcome to NCT Scheduling Hub</h1>
      <Link href="/login" className="btn-primary">
        Login
      </Link>
      <a href='/dashboard' className="btn-primary">Dashboard</a>
      <a href='/schedule' className="btn-primary">Schedule</a>
      <a href='/academicFiles' className="btn-primary">Academic Files (done)</a>
      <a href='/roombook' className="btn-primary">Room Book</a>
    </div>
  );
}
