import { ErrorMessage, Field, Form, Formik } from 'formik';
import React,{useState} from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { notifyError, notifySuccess } from '../../utils/notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../config/axios';
import { clientRegisterValidationSchema } from '../../validations/registerValidations';

const RegisterClient = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const dataToSubmit = {
                ...values,
                role: 'Client', // The role is set to 'Client'
            };
            await axios.post('/users/register-client', dataToSubmit);
            notifySuccess('Registration successful');
        } catch (error) {
            notifyError('Registration failed');
        }
        setSubmitting(false);
    };

    return (
        <div className="container">
            <h2>Register as a Client</h2>
            <Formik
                initialValues={{ name: '', email: '', password: '', contactInformation: '' }}
                validationSchema={clientRegisterValidationSchema}
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
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactInformation">Contact Information</label>
                            <Field name="contactInformation" type="text" className="form-control" />
                            <ErrorMessage name="contactInformation" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterClient;
