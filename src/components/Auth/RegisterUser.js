import '../../styles/EyeMark.css'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import {React, useState} from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { notifyError, notifySuccess } from '../../utils/notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { adminRegisterValidationSchema } from '../../validations/registerValidations';
import axios from '../../config/axios';

const RegisterUser = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            await axios.post('/users/register', values, {
                headers: {
                Authorization: `Bearer ${token}`,
            }
        });
            notifySuccess('User registered successfully');
        } catch (error) {
            console.log('Registration error:', error);
            notifyError('Registration failed');
        }
        setSubmitting(false);
    };

    return (
        <div className="container">
            <h2>Register Project Manager or Animator</h2>
            <Formik
                initialValues={{ name: '', email: '', password: '', role: '' }}
                validationSchema={adminRegisterValidationSchema}
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
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <Field name="password" type={showPassword ? "text" : "password"} className="form-control" />
                                <span
                                    className="password-toggle-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />

                                </span>
                            </div>                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <Field as="select" name="role" className="form-control">
                                <option value="">Select a role</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Animator">Animator</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterUser;
