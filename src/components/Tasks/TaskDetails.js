import React, { useEffect, useState } from 'react';

import api from '../../utils/api';
import { notifyError } from '../../utils/notifications';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/task/gettaskbyid/${id}`);
                setTask(response.data);
            } catch (error) {
                notifyError('Failed to fetch task details');
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
