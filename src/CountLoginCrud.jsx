
import React, { useState} from 'react';



function CountLoginCrud() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedExtension = ['.jpg', '.png'];
            const selectedFileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedExtension.includes('.' + selectedFileExtension)) {
                setSelectedFile(URL.createObjectURL(file));
            } else {
                setSelectedFile(null);
                alert('Invalid file extension. Please select a file with .jpg or .png extension.');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-5 text-center"><b>Upload File in React.js</b></h1>

            <div className="card">
                <div className="card-header">Upload File in React.js</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col col-2"><b>Select File</b></div>
                        <div className="col col-3">
                            <input type="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col col-12">
                            {selectedFile && (
                                <img src={selectedFile} alt="Selected File" style={{ maxWidth: '100%', maxHeight: '500px' }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountLoginCrud;