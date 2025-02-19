import Layout from '@/components/Layout'
import Section from '@/components/Section'
import { sampleTeachersData } from '@/public/testData'
import React from 'react'

const Instructors = () => {
  return (
    <Layout>
      <Section title={"Instructors Details"}>
      <button className="btn-primary">Add Excel</button>

        {/* Test table */}
        <div className="overflow-auto max-w-[70vw] max-h-[80vh]">
          <table className="table-basic">
            <thead>
              <tr>
                <th>Name</th>
                <th>Work Email</th>
                <th>Bachelor's Degree</th>
                <th>Master's Degree</th>
                <th>PhD</th>
                <th>Additional Qualifications</th>
                <th>Publications</th>
                <th>Research Experience</th>
                <th>Conference Participation</th>
                <th>Working Experience</th>
                <th>Area/Industry</th>
                <th>Industry Experience (years)</th>
                <th>Teaching Experience (years)</th>
                <th>Programs Taught</th>
              </tr>
            </thead>
            <tbody>
              {sampleTeachersData.map((instructor, index) => (
                <tr key={index}>
                  <td>{instructor.name}</td>
                  <td>{instructor.work_email}</td>
                  <td>{instructor.bachelor_degree}</td>
                  <td>{instructor.master_degree}</td>
                  <td>{instructor.phd}</td>
                  <td>{instructor.additional_qualifications_and_certificates}</td>
                  <td>{instructor.publications}</td>
                  <td>{instructor.research_experience}</td>
                  <td>{instructor.participation_in_conferences}</td>
                  <td>{instructor.working_experience}</td>
                  <td>{instructor.area_or_industry}</td>
                  <td>{instructor.length_of_total_industry_experience_years}</td>
                  <td>{instructor.length_of_total_teaching_experience_years}</td>
                  <td>{instructor.programs_taught}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Section>
    </Layout>
  )
}

export default Instructors