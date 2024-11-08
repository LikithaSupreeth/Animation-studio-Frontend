import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage'
import ClientPage from './pages/ClientPage'
import CreateTask from './components/Tasks/CreateTask';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import PaymentPage from './pages/PaymentPage';
import ProjectPage from './pages/ProjectPage';
import React from 'react';
import RegisterClient from './components/Auth/RegisterClient';
import RegisterUser from './components/Auth/RegisterUser';
import TaskPage from './pages/TaskPage'

// import UserProfilePage from './pages/UserProfilePage'

const AppRoutes = () => {
    return (
        <Router>
             <Routes> 
                 <Route path="/" element ={<HomePage/>} /> 
                 <Route path="/login" element={<Login/>} />
                 <Route path="/register-client" element={<RegisterClient />} />
                 
                 <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/register-user" element={<RegisterUser />} />  
                <Route path="/admin/projects/*" element={<ProjectPage />} />

                {/* <Route path="/projects" element={<ProjectPage/>} /> */}
                 <Route path="/admin/tasks/*" element={<TaskPage/>} />
                <Route path="/admin/clients/*" element={<ClientPage/>} />
                <Route path="/tasks/create" element={<CreateTask />} />

                <Route path="/admin/payments/*" element={<PaymentPage/>} /> 
                {/* <Route path="/profile" element={<UserProfilePage/>} /> */}
              
             </Routes> 
        </Router>
    );
};

export default AppRoutes;
