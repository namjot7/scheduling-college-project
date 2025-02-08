import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            {/* bg-slate-100 */}
            <div className='flex min-h-screen bg-gray-700'>
                {/* <Navbar /> */}
                {children}
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Layout