import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex min-h-screen'>
                <Navbar />
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout