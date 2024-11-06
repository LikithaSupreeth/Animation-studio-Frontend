import { ErrorMessage, Field, Form, Formik } from 'formik';
import React,{useEffect, useState} from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import axios from '../../config/axios';
import { useLocation } from 'react-router-dom';

const CreateTask = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    const [animators, setAnimators] = useState([]);

    useEffect(() => {
        const fetchAnimators = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/users/animators', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAnimators(response.data);
            } catch (error) {
                notifyError('Failed to fetch animators');
                // console.log(error)
            }
        };

        fetchAnimators();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        if (!projectId) {
            notifyError('Project ID is missing');
            setSubmitting(false);
            return;
        }

        const token = localStorage.getItem('token');
        const taskData = { ...values, project: projectId }; 

        console.log('Task Data:', taskData); 

        try {
            const response = await axios.post('/task/create', taskData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            notifySuccess('Task created successfully');
            // console.log('Response:', response); 

        } catch (error) {
            notifyError('Failed to create task');
            // console.log('Error:', error.response?.data || error);
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Create Task</h2>
            <Formik
                initialValues={{ name: '', description: '', dueDate: '', status: '', assignedAnimator: '' }}
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
                            <label htmlFor="dueDate">Due Date</label>
                            <Field name="dueDate" type="date" className="form-control" />
                            <ErrorMessage name="dueDate" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Task Status</label>
                            <Field name="status" as="select" className="form-control">
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assignedAnimator">Assign Animator</label>
                            <Field name="assignedAnimator" as="select" className="form-control">
                                <option value="">Select Animator</option>
                                {animators.map(animator => (
                                    <option key={animator._id} value={animator._id}>
                                        {animator.name} ({animator.email})
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="assignedAnimator" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Create Task
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateTask;

// const CreateTask = () => {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const projectId = searchParams.get('projectId');

//     const handleSubmit = async (values, { setSubmitting }) => {
//         if (!projectId) {
//             notifyError('Project ID is missing');
//             setSubmitting(false);
//             return;
//         }

//         const token = localStorage.getItem('token');
//         const taskData = { ...values, projectId }; // Include projectId

//         try {
//             await axios.post('/task/create', taskData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             notifySuccess('Task created successfully');
//         } catch (error) {
//             notifyError('Failed to create task');
//         }
//         setSubmitting(false);
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Create Task</h2>
//             <Formik
//                 initialValues={{ name: '', description: '', dueDate: '', status: '', assignedAnimator: '' }}
//                 onSubmit={handleSubmit}
//             >
//                 {({ isSubmitting }) => (
//                     <Form>
//                         <div className="form-group">
//                             <label htmlFor="name">Task Name</label>
//                             <Field name="name" type="text" className="form-control" />
//                             <ErrorMessage name="name" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="description">Description</label>
//                             <Field name="description" as="textarea" className="form-control" />
//                             <ErrorMessage name="description" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="dueDate">Due Date</label>
//                             <Field name="dueDate" type="date" className="form-control" />
//                             <ErrorMessage name="dueDate" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="status">Task Status</label>
//                             <Field name="status" as="select" className="form-control">
//                                 <option value="Not Started">Not Started</option>
//                                 <option value="In Progress">In Progress</option>
//                                 <option value="Completed">Completed</option>
//                             </Field>
//                             <ErrorMessage name="status" component="div" className="text-danger" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="assignedAnimator">Assign Animator</label>
//                             <Field name="assignedAnimator" type="text" className="form-control" />
//                             <ErrorMessage name="assignedAnimator" component="div" className="text-danger" />
//                         </div>
//                         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                             Create Task
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default CreateTask;





