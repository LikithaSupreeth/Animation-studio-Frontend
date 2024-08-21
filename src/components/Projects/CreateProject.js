import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import axios from '../../config/axios';

const CreateProject = () => {
    const [clients, setClients] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/client/getAllclients');
                setClients(response.data);
            } catch (error) {
                notifyError('Failed to fetch clients');
            }
        };

        const fetchTeamMembers = async () => {
            try {
                const response = await axios.get('/project/getUsersByRole?roles=Animator,Project Manager');
                setTeamMembers(response.data);
            } catch (error) {
                notifyError('Failed to fetch team members');
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get('/task/getalltasks');
                setTasks(response.data);
            } catch (error) {
                notifyError('Failed to fetch tasks');
            }
        };

        fetchClients();
        fetchTeamMembers();
        fetchTasks();
    }, []);

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
                initialValues={{ 
                    name: '', 
                    description: '', 
                    deadline: '', 
                    status: '', 
                    assignedTeamMembers: [], 
                    tasks: [], 
                    client: '' 
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
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

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <Field as="select" name="status" className="form-control">
                                <option value="">Select status</option>
                                <option value="Planned">Planned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="assignedTeamMembers">Assigned Team Members</label>
                            <Field as="select" name="assignedTeamMembers" multiple className="form-control" onChange={e => {
                                const options = e.target.options;
                                const values = [];
                                for (let i = 0, l = options.length; i < l; i++) {
                                    if (options[i].selected) {
                                        values.push(options[i].value);
                                    }
                                }
                                setFieldValue("assignedTeamMembers", values);
                            }}>
                                <option value="">Select team members</option>
                                {teamMembers.map(member => (
                                    <option key={member._id} value={member._id}>
                                        {member.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="assignedTeamMembers" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tasks">Tasks</label>
                            <Field as="select" name="tasks" multiple className="form-control" onChange={e => {
                                const options = e.target.options;
                                const values = [];
                                for (let i = 0, l = options.length; i < l; i++) {
                                    if (options[i].selected) {
                                        values.push(options[i].value);
                                    }
                                }
                                setFieldValue("tasks", values);
                            }}>
                                <option value="">Select tasks</option>
                                {tasks.map(task => (
                                    <option key={task._id} value={task._id}>
                                        {task.title}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="tasks" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="client">Client</label>
                            <Field as="select" name="client" className="form-control">
                                <option value="">Select client</option>
                                {clients.map(client => (
                                    <option key={client._id} value={client._id}>
                                        {client.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="client" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Create Project
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateProject;

