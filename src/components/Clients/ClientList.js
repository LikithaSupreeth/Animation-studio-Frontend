import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { notifyError } from '../../utils/notifications';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get('/clients/getallclients');
                setClients(response.data);
            } catch (error) {
                notifyError('Failed to fetch clients');
            }
        };
        fetchClients();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Clients</h2>
            <Link to="/clients/create" className="btn btn-primary mb-3">Register Client</Link>
            <ul className="list-group">
                {clients.map(client => (
                    <li key={client._id} className="list-group-item">
                        <Link to={`/clients/${client._id}`}>{client.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
