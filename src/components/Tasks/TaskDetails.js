import React, { useEffect, useState } from 'react';

import axios from '../../config/axios'
import { notifyError } from '../../utils/notifications';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Authorization Token:", token);

                const response = await axios.get(`/task/gettaskbyid/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data) {
                    setTask(response.data);
                } else {
                    notifyError('No tasks details found');
                }            
            } catch (error) {
                notifyError('Failed to fetch tasks details');
                console.error("Error fetching project details:", error);
            }
        };
        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Project:</strong> {task.project.name}</p>
        </div>
    );
};

export default TaskDetail;


