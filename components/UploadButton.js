import { useState } from "react";


const UploadButton = ({ fileType, uploadedFiles, setUploadedFiles }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Handle file upload
    const uploadFile = async () => {
        if (!selectedFile) {
            alert("no file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log('file uploaded');

        const res = await fetch(`/api/upload/${fileType}`, {
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
        <div className="">
            <input type="file" onChange={e => handleFileChange(e)} />
            <button className="btn-primary mt-5" onClick={() => uploadFile(fileType)}>
                Submit
            </button>
        </div>
    )
}

export default UploadButton