import React from 'react'

const Section = ({ title, children }) => {
    return (
        <div className='p-10 w-full bg-gray-800 text-gray-300'>
            <div className="flex-between">
                <h1 className="h1 mb-5">{title}</h1>
                <span>username</span>
            </div>
            {children}
        </div>
    )
}

export default Section