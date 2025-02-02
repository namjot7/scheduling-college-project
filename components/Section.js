import React from 'react'

const Section = ({ title, children }) => {
    return (
        // w-2/3 md:w-3/4
        <div className='p-10 w-full  bg-gray-800 text-gray-300'>
            <div className="flex-between">
                <h1 className="h1 mb-5">{title}</h1>
                <span>username</span>
            </div>
            {children}
        </div>
    )
}

export default Section