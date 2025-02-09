"use client"
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useSession, signIn } from "next-auth/react";

const Layout = ({ children }) => {
    const { data: session } = useSession();
    // console.log(session);

    // if (!session) {
    //     return (
    //         <div className="bg-primary dark:bg-gray-800 w-screen h-screen flex items-center justify-center">
    //             <button onClick={() => signIn('azure')} className="bg-white rounded-md px-3 py-2 flex items-center gap-2">
    //                 <img width={25} src="./microsoft.png" /> Login with Microsoft
    //             </button>
    //         </div>
    //     )
    // }
    return (
        <>
            {/* bg-slate-100 bg-gray-700*/}
            <div className='flex min-h-screen bg-slate-200'>
                {/* <Navbar /> */}
                {children}
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Layout