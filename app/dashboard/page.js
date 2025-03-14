'use client'
import AnnounceContent from '@/components/AnnounceContent'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import { useUserRole } from '@/components/UserContext'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [date, setDate] = useState(new Date())
    const { userName, role } = useUserRole();

    return (
        <Layout>
            <Section title={'Dashboard'}>
                <div className='flex  justify-center flex-col '>
                    <div className='font-semibold text-lg my-5'>Date: 29 Jan, 2025</div>
                    <div className='flex gap-10 mb-10'>
                        <div className="flex-between w-56 rounded-md bg-gray-100 shadow-md px-5 py-4 hover:bg-gray-200 transition">
                            <div>
                                <h3 className='text-xl'>Instructors</h3>
                                <span className='text-2xl font-semibold'>45</span>
                            </div>
                            <img src="./navbar/instructor.svg" width={35} alt="" />
                        </div>
                        <div className="flex-between w-56 rounded-md bg-gray-100 shadow-md px-5 py-4 hover:bg-gray-200 transition">
                            <div>
                                <h3 className='text-xl'>Classes</h3>
                                <span className='text-2xl font-semibold'>45</span>
                            </div>
                            <img src="./navbar/classroom.svg" width={35} alt="" />
                        </div>
                    </div>
                    <AnnounceContent />
                </div>
            </Section>
        </Layout>
    )
}

export default Dashboard