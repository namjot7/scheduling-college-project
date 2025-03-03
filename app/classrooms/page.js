import Layout from '@/components/design/Layout'
import Section from '@/components/Section'
import { sampleTeachersData } from '@/public/testData'
import React from 'react'

const ClassRooms = () => {
    return (
        <Layout>
            <Section title={"Classrooms Details"}>
                {/* Test table */}
                <div className="overflow-auto max-w-[70vw] max-h-[80vh]">
                    <table className="table-basic">
                        <thead>
                            <tr>
                                <th>Campus</th>
                                <th>Floor</th>
                                <th>Room Capacity</th>
                                <th>Seating Arrngement</th>
                                <th>Specification</th>
                                <th>Equipment in room</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mirvish</td>
                                <td>2</td>
                                <td>222</td>
                                <td>45</td>
                                <td></td>
                                <td>Projector</td>
                            </tr>
                            <tr>
                                <td>Mirvish</td>
                                <td>3</td>
                                <td>301</td>
                                <td>30</td>
                                <td></td>
                                <td>Projector + Computers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </Layout>
    )
}

export default ClassRooms