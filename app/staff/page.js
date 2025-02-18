
import OnsiteCard from '@/components/StaffCard'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import React from 'react'
import StaffCard from '@/components/StaffCard'

const Staff = () => {
    return (
        <Layout>
            <Section title={"On-site staff schedule"}>
                <h2 className="h2">Mirvish Winter 2025 Schedule</h2>
                <div className="mt-10 grid grid-cols-3 gap-5">
                  <StaffCard/>
                  <StaffCard/>
                  <StaffCard/>
                  <StaffCard/>
                  <StaffCard/>
                  <StaffCard/>
                  <StaffCard/>
                  
                </div>
            </Section>
        </Layout>
    )
}

export default Staff