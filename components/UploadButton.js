import { useState } from "react";
import { Button } from 'primereact/button';

const UploadButton = ({ apiEndPoint, uploadedFiles, setUploadedFiles }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Handle file upload
    const uploadFile = async (apiEndPoint) => {
        if (!selectedFile) {
            alert("no file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log('file uploaded');

        const res = await fetch(`/api/upload/${apiEndPoint}`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        const file = data.file;
        console.log({ data, file });

        setUploadedFiles(prev => [...prev, file])

        // refreshPage() // dynamic call the function like getSchedules/getFiles
    };
    return (
        <div className="my-10">
            <h3 className="h3">Upload New File</h3>
            <input type="file" onChange={e => handleFileChange(e)} />


            <div className="flex-center flex-col w-full lg:w-1/2">
                <label className="flex-center flex-col w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                    <div className="flex-center flex-col pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 font-semibold dark:text-gray-400">Click to upload</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            .xlsx (Excel file only)
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden"
                        onChange={e => handleFileChange(e)} />
                </label>
                <button className="btn-primary mt-5 w-full" onClick={() => uploadFile(apiEndPoint)}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default UploadButton