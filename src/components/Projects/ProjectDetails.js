import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import axios from '../../config/axios';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]); 
    const [animators, setAnimators] = useState([]);
    const [selectedAnimator, setSelectedAnimator] = useState('');
    const [taskToAssign, setTaskToAssign] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProject = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Authorization Token:", token);

                const response = await axios.get(`/project/get/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setProject(response.data);
                } else {
                    notifyError('No project details found');
                }
            } catch (error) {
                notifyError('Failed to fetch project details');
                console.error("Error fetching project details:", error);
            }
        };

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/task/gettasksbyproject/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setTasks(response.data); // Set tasks to state
                } else {
                    notifyError('No tasks found for this project');
                }
            } catch (error) {
                notifyError('Failed to fetch tasks');
                console.error("Error fetching tasks:", error);
            }
        };

        const fetchAnimators = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/users/animators', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAnimators(response.data);
            } catch (error) {
                notifyError('Failed to fetch animators');
            }
        };

        fetchProject();
        fetchTasks()
        fetchAnimators();

        
    }, [id]);

    const handleAssignAnimator = async () => {
        if (!taskToAssign || !selectedAnimator) {
            notifyError('Please select a task and an animator');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log('Task to assign:', taskToAssign);  // Log task ID
            console.log('Selected Animator:', selectedAnimator);

              // Fetch the existing task details
            const taskResponse = await axios.get(`/task/gettaskbyid/${taskToAssign}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // const existingTask = taskResponse.data;

        // Merge existing task data with the new assigned animator
        const updatedTask = {
            // ...existingTask,
            assignedAnimator: selectedAnimator
        };

        console.log('Updated Task:', updatedTask);

            await axios.put(`/task/update/${taskToAssign}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            notifySuccess('Animator assigned successfully');
            setTaskToAssign(null);
            setSelectedAnimator('');
            
            // Fetch tasks again to refresh the list
            const response = await axios.get(`/task/gettasksbyproject/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (error) {
            console.log(error.response.data);
            notifyError('Failed to assign animator');
        }
    };


    if (!project) {
        return <div>Loading...</div>;
    }

 

    return (
        <div className="container mt-8">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <button
                className="btn btn-primary"
                onClick={() => navigate(`/tasks/create?projectId=${id}`)}
            >
                Add Task
            </button>

            <div className="mt-4">
                <h3>Tasks</h3>
                {tasks.length === 0 ? (
                    <p>No tasks available for this project.</p>
                ) : (
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li key={task._id} className="list-group-item">
                                <strong>{task.name}</strong> - {task.status}
                                <p>{task.description}</p>
                                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                                <p><strong>Assigned Animator:</strong> {task.assignedAnimator?.name || 'N/A'}</p>


                                {/* Show button if animator is not assigned */}
                                {!task.assignedAnimator && (
                                    <div>
                                        <select
                                            value={selectedAnimator}
                                            onChange={(e) => {
                                                setSelectedAnimator(e.target.value);
                                                setTaskToAssign(task._id);
                                            }}
                                            className="form-control mb-2"
                                        >
                                            <option value="">Select Animator</option>
                                            {animators.map(animator => (
                                                <option key={animator._id} value={animator._id}>
                                                    {animator.name} ({animator.email})
                                                </option>
                                            ))}
                                        </select>
                                        <button className="btn btn-success" onClick={handleAssignAnimator}>
                                            Assign Animator
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
