"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { dashboard } from '@/assets';

const Navbar = () => {
    // const { pathname } = Router;
    console.log(usePathname()); // works

    // Classes for dynamic navbar
    const inactiveLink = `text-gray-700 dark:text-gray-300  flex gap-1 py-2 px-2.5 rounded-l-lg dark:hover:text-white 
    text-center hover:text-black md:hover:scale-105 dark:md:hover:text-white`;
    const activeLink = inactiveLink + "  hover:text-white bg-primary !text-white font-semibold dark:md:bg-white dark:md:!text-black dark:md:bg-slate-300 dark:md:text-black";

    return (
        <aside className="z-10 md:block bg-slate-100 dark:bg-slate-800 min-h-screen fixed top-[54px] w-full left-0 md:w-1/5 md:static transition-all p-3 py-5 pr-0">
            <div className='hidden md:flex mb-5'>
                {/* <AdminLogo /> */}
            </div>

            <nav className="flex flex-col gap-2">
                <Link href={"/"} className={0 == 0 ? activeLink : inactiveLink}>
                    <img src={dashboard} alt="" />
                    <span>Dashboard</span>
                </Link>
                <Link href={"/products"} className={(usePathname() == "/products") ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                    <span>Products</span>
                </Link>
                <Link href={"/categories"} className={(usePathname() == "/categories") ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span>Categories</span>
                </Link>
                <Link href={"/orders"} className={(usePathname() == "/orders") ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                    <span>Orders</span>
                </Link>
                <button className={inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Sign out
                </button>
            </nav>
        </aside>
    )
}

export default Navbar