import { ErrorMessage, Field, Form, Formik } from 'formik';

import React from 'react';
import axios from '../../config/axios'
// import { loginValidationSchema } from '../../utils/validations';
import { useAuth } from '../../context/AuthContext';
// import { notifyError, notifySuccess } from '../../utils/notifications';


const Login = () => {
    const { dispatch } = useAuth();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('/users/login', values);
            dispatch({ type: 'LOGIN', payload: { account: response.data.account, profile: response.data.profile } });
            notifySuccess('Login successful');
        } catch (error) {
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
                            <Field name="password" type="password" className="form-control" />
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
