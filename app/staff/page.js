
import OnsiteCard from '@/components/StaffCard'
import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import React from 'react'
import StaffCard from '@/components/StaffCard'

const Staff = () => {
    return (
        <Layout>
            <Section title={"On-site staff schedule"}>
                <h2 className="h2">Mirvish Winter 2025 Schedule</h2>
                <button className="btn-primary">Add Excel</button>
                <div className="mt-10 grid grid-cols-3 gap-5">
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />
                    <StaffCard />

                </div>
            </Section>
        </Layout>
    )
}

export default Staff