import { ErrorMessage, Field, Form, Formik } from 'formik';
import { notifyError, notifySuccess } from '../../utils/notifications';

import React from 'react';
import axios from '../../config/axios';

// import { projectValidationSchema } from '../../utils/validations';

const CreateProject = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post('/project/create', values);
            notifySuccess('Project created successfully');
        } catch (error) {
            notifyError('Failed to create project');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Create Project</h2>
            <Formik
                initialValues={{ name: '', description: '', deadline: '' }}
                // validationSchema={projectValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Project Name</label>
                            <Field name="name" type="text" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field name="description" as="textarea" className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline</label>
                            <Field name="deadline" type="date" className="form-control" />
                            <ErrorMessage name="deadline" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Create Project</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateProject;
