import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { notifyError } from '../../utils/notifications';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/task/getalltasks');
                setTasks(response.data);
            } catch (error) {
                notifyError('Failed to fetch tasks');
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Tasks</h2>
            <Link to="/tasks/create" className="btn btn-primary mb-3">Create Task</Link>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task._id} className="list-group-item">
                        <Link to={`/tasks/${task._id}`}>{task.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
