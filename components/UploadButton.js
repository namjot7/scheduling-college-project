import { useState } from "react";

const UploadButton = ({ apiEndPoint, getSchedule }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setSelectedFileName(file.name);
        }
    };

    // Handle file upload
    const uploadFile = async (path) => {
        if (!selectedFile) {
            alert("no file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log('file uploaded');

        const res = await fetch(`/api/upload/${path}`, {
            method: "POST",
            body: formData,
        });
        // const data = await res.json();
        // const file = data.file;
        // console.log({ data, file });
        getSchedule()
    };
    return (
        <div className="mt-10 w-full md:!w-1/2">
            <h3 className="h3">Upload New File</h3>
            <label className="flex-center flex-col h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 my-3">
                <img src="./svg/cloud.svg" alt="" />
                <p className="mb-1 text-gray-500 font-semibold ">Click to upload</p>
                <p className="text-xs text-gray-500">
                    .xlsx (Excel file only)
                </p>
                <input type="file" hidden
                    onChange={e => handleFileChange(e)} />
            </label>

            {selectedFile
                ? <div>{selectedFileName}</div>
                : <div>No file selected</div>
            }

            <button className="btn-primary mt-5 w-full" onClick={() => uploadFile(apiEndPoint)}>
                Submit
            </button>
        </div>
    )
}

export default UploadButton