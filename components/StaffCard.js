import React from 'react'

const StaffCard = () => {
    return (
        <div className="bg-gray-100 p-5 mb-5 rounded-md">
            <h4 className="h4 text-xl flex gap-1 mb-2">
                <img src="./navbar/schedule.svg" alt="" width={25} />
                February 15
            <span className='!font-sm font-normal'>- Wednesday</span>
            </h4>
            <ul className="">
                <ul className='text-base'>Academics: John, John</ul>
                <ul className='text-base'>Adivor: John, John</ul>
                <ul className='text-base'>Academics: John, John</ul>
            </ul>
        </div>
    )
}

export default StaffCard