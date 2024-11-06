import '../styles/AdminPage.css'

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import axios from '../config/axios'
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login'); // Redirect to login if not an admin
        }
        else {
            fetchDashboardData();
        }
    }, [isAdmin, navigate]);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            
            await Promise.all([

                axios.get('/project/getallprojects', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('/task/getalltasks', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('/clients/:id/projects', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        }
    };
    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>
            <div className="mb-4">
                <Link to="/admin/register-user" className="btn btn-primary mb-2">Register New User</Link>
            </div>
            <div className="navbar  mt-4  ">
                    <Link to="/admin/projects" >Projects</Link>
                    <Link to="/admin/tasks" >Tasks</Link>
                    <Link to="/admin/clients" >Clients</Link>
                    <Link to="/admin/payments" >Payments</Link>
            </div>

            {/* <div className="sub-navbar mb-4 ">
                <Link to="/admin/add-project" >Add Projects</Link>
                <Link to="/admin/add-task" >Add Tasks</Link>
                <Link to="/admin/add-client" >Add Client</Link>
            </div> */}
        </div>
    );
};

export default AdminPage;

//Promise.all is a method that takes an array of promises (asynchronous operations) and returns a single promise