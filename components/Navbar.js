/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


export const Logo = () => {
    return (
        <div className="flex gap-3 items-center pl-5">
            <img src="./nctLogo.png" width={200} alt="aa" />
        </div>
    );
};

const Navbar = () => {
    // console.log(usePathname()); // works

    // Classes for dynamic navbar
    const inactiveLink = `text-gray-600 flex gap-1 py-2 px-2.5 rounded-l-lg  
                text-center hover:text-black md:hover:scale-105 ml-6`;
    const activeLink = inactiveLink + " hover:text-black bg-white font-semibold";

    return (
        <aside className="sticky top-0 left-0 w-1/3 lg:w-1/5 bg-slate-400 text-white h-screen transition-all py-5">
            {/* Logo */}
            <div className="flex gap-3 items-center pl-5">
                <img src="./nctLogo.png" width={200} alt="aa" />
            </div>

            <nav className="flex flex-col gap-2">
                <div className="mt-5 py-5 border-t-2 border-b-2 border-gray-500">
                    <Link href={"/dashboard"} className={usePathname() == "/dashboard" ? activeLink : inactiveLink}>
                        <img src="./navbar/dashboard.svg" width={25} height={25} alt="" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href={"/schedule"} className={usePathname() == "/schedule" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Master Schedule</span>
                    </Link>
                    <Link href={"/classes"} className={usePathname() == "/classes" ? activeLink : inactiveLink} >
                        <img src="./navbar/laptop.svg" width={25} height={25} alt="" />
                        <span>Classrooms</span>
                    </Link>
                    <Link href={"/programs"} className={usePathname() == "/programs" ? activeLink : inactiveLink} >
                        <img src="./navbar/book.svg" width={25} height={25} alt="" />
                        <span>Programs</span>
                    </Link>
                </div>

                <div>
                    <Link href={"/staff"} className={usePathname() == "/staff" ? activeLink : inactiveLink} >
                        <img src="./navbar/group.svg" width={25} height={25} alt="" />
                        <span>Staff</span>
                    </Link>
                    <Link href={"/roombook"} className={usePathname() == "/roombook" ? activeLink : inactiveLink} >
                        <img src="./navbar/roomRequest.svg" width={25} height={25} alt="" />
                        <span>Room Requests</span>
                    </Link>
                    <Link href={"/academicFiles"} className={usePathname() == "/academicFiles" ? activeLink : inactiveLink} >
                        <img src="./navbar/files.svg" width={25} height={25} alt="" />
                        <span>Academic Files</span>
                    </Link>
                    <Link href={"/users"} className={usePathname() == "/users" ? activeLink : inactiveLink} >
                        <img src="./navbar/users.svg" width={25} height={25} alt="" />
                        <span>Users</span>
                    </Link>
                </div>

                <div className="w-full border-t-2 border-gray-500 absolute left-0 bottom-0">
                    <Link href={"/profile"} className={usePathname() == "/profile" ? activeLink : inactiveLink} >
                        <img src="./navbar/avatar.svg" width={25} height={25} alt="" />
                        <span>My Profile</span>
                    </Link>
                    <button className={inactiveLink}>
                        <img src="./navbar/signout.svg" width={25} height={25} alt="" />
                        Sign out
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Navbar;
