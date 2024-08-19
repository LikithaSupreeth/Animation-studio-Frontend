import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { notifyError } from '../../utils/notifications';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Authorization Token:', token);

                const response = await axios.get('/project/getallprojects', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && response.data.length > 0) {
                    setProjects(response.data);
                } else {
                    setError('No projects found.');
                }
            } catch (error) {
                console.error('Failed to fetch projects', error);
                notifyError('Failed to fetch projects');
                setError('Failed to fetch projects');
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Projects</h2>
            <Link to="create" className="btn btn-primary mb-3">Create Project</Link>
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <ul className="list-group">
                    {projects.map(project => (
                        <li key={project._id} className="list-group-item">
                            <Link to={`${project._id}`}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;
