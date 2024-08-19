import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { userUpdateValidations } from '../../utils/validations';

const EditProfile = () => {
    const { user, dispatch } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/getuser', {
                    headers: { Authorization: `Bearer ${user.account.token}` }
                });
                setProfile(response.data);
            } catch (error) {
                notifyError('Failed to fetch profile');
            }
        };
        fetchProfile();
    }, [user.account.token]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await api.put('/users/update', values, {
                headers: { Authorization: `Bearer ${user.account.token}` }
            });
            dispatch({ type: 'SET_PROFILE', payload: response.data });
            notifySuccess('Profile updated successfully');
        } catch (error) {
            notifyError('Failed to update profile');
        }
        setSubmitting(false);
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Profile</h2>
            <Formik
                initialValues={profile}
                validationSchema={userUpdateValidations}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="text" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Update Profile</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;
