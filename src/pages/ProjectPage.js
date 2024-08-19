// import React, { useEffect, useState } from 'react';

// import axios from '../config/axios';

// const ProjectPage = () => {
//     const [projects, setProjects] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 console.log('Authorization Token:', token); // Log the token to ensure it's correct

//                 const response = await axios.get('/project/getallprojects', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 if (response.data && response.data.length > 0) {
//                     setProjects(response.data);
//                 } else {
//                     setError('No projects found.');
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch projects', error);
//                 setError('Failed to fetch projects');
//             }
//         };

//         fetchProjects();
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h2>Projects</h2>
//             {error ? (
//                 <div className="alert alert-danger">{error}</div>
//             ) : (
//                 <ul>
//                     {projects.map((project) => (
//                         <li key={project._id}>{project.name}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default ProjectPage;

import { Route, Routes } from 'react-router-dom';

import CreateProject from '../components/Projects/CreateProject';
import ProjectDetail from '../components/Projects/ProjectDetails';
import ProjectList from '../components/Projects/ProjectList';
import React from 'react';

const ProjectPage = () => {
    return (
        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<ProjectList />} />
                <Route path="create" element={<CreateProject />} />
                <Route path=":id" element={<ProjectDetail />} />
            </Routes>
        </div>
    );
};

export default ProjectPage;



