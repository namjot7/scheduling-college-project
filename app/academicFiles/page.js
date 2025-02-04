'use client'
import FileTypeIcon from '@/components/design/FileTypeIcon'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import UploadButton from '@/components/UploadButton'
import React, { useEffect, useState } from 'react'

const AcademicFiles = () => {
    const [uploadedFiles, setUploadedFiles] = useState([
        // {
        //     name: "details.xlsx",
        //     type: "xlsx"
        // },
        // {
        //     name: "details.pdf",
        //     type: "pdf"
        // },
        // {
        //     name: "details.docx",
        //     type: "docx"
        // },
        // {
        //     name: "details.et",
        //     type: "et"
        // }
    ]); // array of strings (containing file info (name and type))

    const getFiles = async () => {
        const res = await fetch('/api/academicFiles')
        const data = await res.json()
        console.log(data);
        console.log(`./uploads/academic_files/details.xlsx`);

        setUploadedFiles(data)
    }
    const deleteFile = async (fileName) => {
        const res = await fetch("/api/academicFiles", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: fileName }),
        });
        const data = await res.json();
        // console.log(data);
        getFiles(); // refresh the file useState
    }
    useEffect(() => {
        getFiles()
    }, [])

    useEffect(() => {
        console.log(uploadedFiles);
    }, [uploadedFiles])

    return (
        <Layout>
            <Section>
                <h1 className="h1">Academic Files</h1>

                <UploadButton
                    fileType={'academicFiles'}
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                />

                <h3 className="h3 mt-10 mb-5">Existing Files</h3>
                <div className="flex gap-7 flex-col">
                    {uploadedFiles?.length > 0 && uploadedFiles.map((file, idx) => (
                        <div className="flex-between" key={idx}>
                            <div className="flex items-center gap-3">
                                <FileTypeIcon fileType={file?.type} />
                                {file?.name}
                            </div>
                            <div className="">
                                <button className="btn-primary" onClick={() => deleteFile(file.name)}>
                                    Delete
                                </button>
                                <a href={`./uploads/academic_files/${file.name}`}>
                                    <button className="btn-primary" >Download</button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {uploadedFiles.length == 0 && <div>No file </div>}
            </Section>
        </Layout>
    )
}

export default AcademicFiles