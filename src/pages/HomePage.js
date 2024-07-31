import '../styles/HomePage.css'

import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
    return (
        <div className="homepage-background">
  <div className="text-center homepage-text">
        <h2>Welcome to Animation Studio Management System</h2>

           <div className="mt-4">
                    <Link to="/register-client" className="btn btn-primary mx-2">Register as Client</Link>
                    <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
                    {/* <Link to="/admin/register-user" className="btn btn-warning mx-2">Admin Register User</Link> */}

             </div>
        </div> 
    </div>
    );
};

export default HomePage;
