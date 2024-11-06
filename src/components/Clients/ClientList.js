import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from '../../config/axios'
import { notifyError } from '../../utils/notifications';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/client/getallclients', {
                    headers: { Authorization: `Bearer ${token}` }
            });
                if (response.data && response.data.length > 0) {
                    setClients(response.data);
                } else {
                    setError('No clients found.');
                }
            } catch (error) {
                notifyError('Failed to fetch clients');
                setError('Failed to fetch clients');

            }
        };
        fetchClients();
    }, []);
    return (
        <div className="container mt-4">
            <h2>Clients</h2>
            {/* <Link to="create" className="btn btn-primary mb-3">Create Client</Link> */}
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <ul className="list-group">
                    {clients.map(clients => (
                        <li key={clients._id} className="list-group-item">
                            <Link to={`${clients._id}`}>{clients.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientList;
