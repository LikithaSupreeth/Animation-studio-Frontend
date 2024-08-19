import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import api from '../../utils/api';
import { taskValidationSchema } from '../../utils/validations';

const CreateTask = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/project/getallprojects');
                setProjects(response.data);
            } catch (error) {
                notifyError('Failed to fetch projects');
            }
        };
        fetchProjects();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await api.post('/task/create', values);
            notifySuccess('Task created successfully');
        } catch (error) {
            notifyError('Failed to create task');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Create Task</h2>
            <Formik
                initialValues={{ name: '', description: '', deadline: '', projectId: '' }}
                validationSchema={taskValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Task Name</label>
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
                        <div className="form-group">
                            <label htmlFor="projectId">Project</label>
                            <Field as="select" name="projectId" className="form-control">
                                <option value="">Select a project</option>
                                {projects.map(project => (
                                    <option key={project._id} value={project._id}>{project.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="projectId" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Create Task</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateTask;
