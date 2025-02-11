import React from 'react'

const Section = ({ title, children }) => {
    return (
        // w-2/3 md:w-3/4 bg-gray-700 text-gray-100 bg-gray-200
        <div className='relative p-10 w-full  m-4 rounded-md bg-gray-200'>
            <div className="flex-between mb-5">
                <h1 className="h1">{title}</h1>
                <span>username</span>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Section