import React, { useEffect, useState } from 'react';

import api from '../../utils/api';
import { notifyError } from '../../utils/notifications';
import { useParams } from 'react-router-dom';

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await api.get(`/client/get-client/${id}`);
                setClient(response.data);
            } catch (error) {
                notifyError('Failed to fetch client details');
            }
        };
        fetchClient();
    }, [id]);

    if (!client) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>{client.name}</h2>
            <p>{client.email}</p>
            <p><strong>Projects:</strong></p>
            <ul>
                {client.projects.map(project => (
                    <li key={project._id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClientDetail;
