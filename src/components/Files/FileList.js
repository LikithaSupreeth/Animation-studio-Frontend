import React, { useEffect, useState } from 'react';

import api from '../../utils/api';
import { notifyError } from '../../utils/notifications';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await api.get('/file/getallfiles');
                setFiles(response.data);
            } catch (error) {
                notifyError('Failed to fetch files');
            }
        };
        fetchFiles();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Files</h2>
            <ul className="list-group">
                {files.map(file => (
                    <li key={file._id} className="list-group-item">
                        <p><strong>Description:</strong> {file.description}</p>
                        <p><strong>Upload Date:</strong> {new Date(file.uploadDate).toLocaleDateString()}</p>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">Download</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
