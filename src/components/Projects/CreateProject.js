import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import Select from 'react-select';
import axios from '../../config/axios';

const CreateProject = () => {
    const [clients, setClients] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchClients = async () => {
            try {
                const response = await axios.get('/client/getAllClients',{
                    headers: { Authorization: `Bearer ${token}` }
                });
              
                setClients(response.data);
            } catch (error) {
                console.error('Failed to fetch clients', error.response.data);
                notifyError('Failed to fetch clients');
            }
        };

        const fetchTeamMembers = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                const response = await axios.get('/users/getUserByRole', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        roles: 'Animator,Project Manager',
                    }
                });                
                console.log('Team Members:', response.data);
                setTeamMembers(response.data);
            } catch (error) {
                console.log('team members error',error)
                notifyError('Failed to fetch team members');
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get('/task/getalltasks', {
                    headers: { Authorization: `Bearer ${token}` }   
                })
                console.log('Tasks:', response.data);

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
        console.log('Submitting values:', values);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/project/create', values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Project creation response:', response);
            notifySuccess('Project created successfully');  
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Unknown error occurred';
            console.error('Error creating project:',errorMessage); 
            notifyError('Failed to create project'+ errorMessage);
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
                    status: 'Planned', 
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
                            <Select
                                isMulti
                                name="assignedTeamMembers"
                                options={teamMembers.map(member => ({
                                    value: member._id,
                                    label: member.name
                                }))}
                                className="basic-multi-select"
                                classNamePrefix="select Team Members"
                                onChange={selectedOptions => {
                                    setFieldValue('assignedTeamMembers', selectedOptions.map(option => option.value));
                                }}
                            />
                            <ErrorMessage name="assignedTeamMembers" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tasks">Tasks</label>
                            <Select
                                isMulti
                                name="tasks"
                                options={tasks.map(task => ({
                                    value: task._id,
                                    label: task.name
                                }))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={selectedOptions => {
                                    setFieldValue('tasks', selectedOptions.map(option => option.value));
                                }}
                            />
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

