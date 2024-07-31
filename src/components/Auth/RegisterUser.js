// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { notifyError, notifySuccess } from '../../utils/notifications';

// import React from 'react';
// import {adminRegisterValidationSchema} from '../../validations/registerValidations'
// import axios from '../../config/axios';

// const RegisterUser = () => {
//     const handleSubmit = async (values, { setSubmitting }) => {
//         try {
//             await axios.post('/users/register', values);
//             notifySuccess('Registration successful');
//         } catch (error) {
//             notifyError('Registration failed');
//         }
//         setSubmitting(false);
//     };

//     return (
//         <div className="container">
//             <h2>Register Project Manager or Animator</h2>
//             <Formik
//                 initialValues={{ name: '', email: '', password: '', role: '' }}
//                 validationSchema={adminRegisterValidationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ isSubmitting }) => (
//                     <Form>
//                         <div className="form-group">
//                             <label htmlFor="name">Name</label>
//                             <Field name="name" type="text" className="form-control" />
//                             <ErrorMessage name="name" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email">Email</label>
//                             <Field name="email" type="email" className="form-control" />
//                             <ErrorMessage name="email" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password">Password</label>
//                             <Field name="password" type="password" className="form-control" />
//                             <ErrorMessage name="password" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="role">Role</label>
//                             <Field as="select" name="role" className="form-control">
//                                 <option value="">Select a role</option>
//                                 <option value="Project Manager">Project Manager</option>
//                                 <option value="Animator">Animator</option>
//                             </Field>
//                             <ErrorMessage name="role" component="div" className="text-danger" />
//                         </div>
//                         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default RegisterUser;

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { notifyError, notifySuccess } from '../../utils/notifications';

import React from 'react';
import { adminRegisterValidationSchema } from '../../validations/registerValidations';
import axios from '../../config/axios';

const RegisterUser = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post('/users/register', values);
            notifySuccess('User registered successfully');
        } catch (error) {
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
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
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
