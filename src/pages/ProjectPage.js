import '../styles/ProjectPage.css'

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



