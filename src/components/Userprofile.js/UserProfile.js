import React, { useEffect, useState } from 'react';

import axios from '../../config/axios'
import { notifyError } from '../../utils/notifications';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/getuser', {
                    headers: { Authorization: `Bearer ${user.account.token}` }
                });
                setProfile(response.data);
            } catch (error) {
                notifyError('Failed to fetch profile');
            }
        };
        fetchProfile();
    }, [user.account.token]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
        </div>
    );
};

export default UserProfile;
