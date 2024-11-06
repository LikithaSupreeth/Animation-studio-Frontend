import { Route, Routes } from 'react-router-dom';

import CreateTask from '../components/Tasks/CreateTask';
import React from 'react';
import TaskDetail from '../components/Tasks/TaskDetails';
import TaskList from '../components/Tasks/TaskList';

const TaskPage = () => {
    

    return (
        <div className="container mt-4">
            <Routes>
                <Route  path="/" element={<TaskList/>} />
                <Route path= "create" element={<CreateTask/>} />
                <Route path=":id" element={<TaskDetail/>} />
            </Routes>
        </div>
    );
};

export default TaskPage;

