import '../../styles/EyeMark.css'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import {React, useState} from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { notifyError, notifySuccess } from '../../utils/notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../config/axios'
import { loginValidationSchema } from '../../validations/loginValidations';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const { dispatch } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (values, { setSubmitting }) => {
        try {

            setSubmitting(true);
            toast.dismiss();

            const response = await axios.post('/users/login', values);
            console.log('API Response:', response.data); // Log the entire response for debugging

            const { token,account, profile } = response.data;
            localStorage.setItem('token', token);


        if (!profile || !profile.role) {
            throw new Error('Invalid profile or role data');
        }   

            dispatch({ type: 'LOGIN', payload: { account, profile } });
            notifySuccess('Login successful');


            switch (profile.role) {
                case 'Admin':
                    navigate('/admin');
                    break;
                case 'Project Manager':
                    navigate('/project-manager');
                    break;
                case 'Animator':
                    navigate('/animator');
                    break;
                case 'Client':
                    navigate('/client-dashboard');
                    break;
                default:
                    navigate('/login'); // Redirect back to login or a default page if the role is not recognized
                    break;
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);

            notifyError('Login failed');
        }
        setSubmitting(false);
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
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
                            </div>                            
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
