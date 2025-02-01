/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


export const Logo = () => {
    return (
        <div className="flex gap-3 items-center pl-5">
            <img src="./ncLogo.png" width={50} height={50} alt="aa" />
            <h2 className="h1">NCT</h2>
        </div>
    );
};

const Navbar = () => {
    // console.log(usePathname()); // works

    // Classes for dynamic navbar
    const inactiveLink = `text-gray-600 flex gap-1 py-2 px-2.5 rounded-l-lg  
    text-center hover:text-black md:hover:scale-105 ml-6`;
    const activeLink =
        inactiveLink + "  hover:text-black bg-primary font-semibold";

    return (
        <aside className="relative w-1/3 md:w-1/4 bg-gray-400 text-gray-300  min-h-screen transition-all py-5">
            <Logo />
            <nav className="flex flex-col gap-2">
                <div className="mt-5 py-5 border-t-2 border-b-2 border-gray-500">
                    <Link href={"/dashboard"} className={0 == 0 ? activeLink : inactiveLink}>
                        <img src="./navbar/dashboard.svg" width={25} height={25} alt="" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href={"/schedule"} className={usePathname() == "/schdeule" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Master Schedule</span>
                    </Link>
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Classrooms</span>
                    </Link>
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Courses</span>
                    </Link>
                </div>

                <div>
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Users</span>
                    </Link>
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Staff</span>
                    </Link>
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
                        <img src="./navbar/schedule.svg" width={25} height={25} alt="" />
                        <span>Room Requests</span>
                    </Link>
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
                        <img src="./navbar/files.svg" width={25} height={25} alt="" />
                        <span>Academic Files</span>
                    </Link>
                </div>

                <div className="w-full border-t-2 border-gray-500 absolute left-0 bottom-0">
                    <Link href={"/schdeules"} className={usePathname() == "/schdeules" ? activeLink : inactiveLink} >
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
