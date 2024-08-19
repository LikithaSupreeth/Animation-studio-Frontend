import React, { useEffect, useState } from 'react';

import axios from '../../config/axios';
import { notifyError } from '../../utils/notifications';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Authorization Token:", token);

                const response = await axios.get(`/project/get/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setProject(response.data);
                } else {
                    notifyError('No project details found');
                }
            } catch (error) {
                notifyError('Failed to fetch project details');
                console.error("Error fetching project details:", error);
            }
        };
        fetchProject();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {project.status}</p>
        </div>
    );
};

export default ProjectDetail;
