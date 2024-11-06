import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from '../../config/axios'
import { notifyError } from '../../utils/notifications';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/task/getalltasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data && response.data.length > 0) {
                    setTasks(response.data);
                } else {
                    setError('No tasks found.');
                }            
            } catch (error) {
                console.error('Failed to fetch tasks', error);
                notifyError('Failed to fetch tasks');
                setError('Failed to fetch tasks');
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Tasks</h2>
            {/* <Link to="create" className="btn btn-primary mb-3">Create Task</Link> */}
            {/* {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : ( */}
                <ul className="list-group">
                    {tasks.map(tasks => (
                        <li key={tasks._id} className="list-group-item">
                            <Link to={`${tasks._id}`}>{tasks.name}</Link>
                        </li>
                    ))}
                </ul>
            {/* )} */}
        </div>
    );
};

export default TaskList;
