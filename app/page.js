"use client"
import Layout from "@/components/Layout";
import { useSession } from 'next-auth/react';
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="h-screen w-screen flex flex-col gap-6 justify-center items-center bg-gray-100">
      <Calendar className="h-16 w-16 text-indigo-600" />
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
