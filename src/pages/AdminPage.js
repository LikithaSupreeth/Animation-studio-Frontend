import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login'); // Redirect to login if not an admin
        }
    }, [isAdmin, navigate]);

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>
            <div className="mt-4">
                <Link to="/admin/register-user" className="btn btn-primary">Register New User</Link>
            </div>
        </div>
    );
};

export default AdminPage;
