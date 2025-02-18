"use client"
import Link from "next/link";

export default function Home() {

  return (
    <div className="z-10 relative h-screen  w-screen flex flex-col gap-6 justify-center items-center bg-gray-100 text-white">
      
      <div className="-z-10 absolute top-0 left-0 blur-[2.5px] h-full w-full">
        <img className="h-full w-full" src="./homebg.jpeg" alt="Niagara College Toronto Mirvish campus" />
      </div>

      <h1 className="h1 !text-5xl">Welcome to NCT Scheduling Hub</h1>
      <Link href="/login" className="btn-primary">
        Login
      </Link>
      {/* <a href='/dashboard' className="btn-primary">Dashboard</a>
      <a href='/instructors' className="btn-primary">instructors</a>
      <a href='/roombook' className="btn-primary">Room Book</a> */}
    </div>
  );
}
