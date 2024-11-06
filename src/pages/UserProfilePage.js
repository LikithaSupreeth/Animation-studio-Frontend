import { Route, Routes } from 'react-router-dom';

import EditProfile from '../components/UserProfile/EditProfile';
import React from 'react';
import UserProfile from '../components/UserProfile/UserProfile';

const UserProfilePage = () => {
   

    return (
        <div className="container mt-4">
            <Routes>
                <Route  path="/" element={UserProfile} />
                <Route path="edit" element={EditProfile} />
            </Routes>
        </div>
    );
};

export default UserProfilePage;
