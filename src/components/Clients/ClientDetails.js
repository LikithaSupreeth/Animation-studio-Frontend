import React, { useEffect, useState } from 'react';

import axios from '../../config/axios';
import { notifyError } from '../../utils/notifications';
import { useParams } from 'react-router-dom';

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/client/get-client/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    console.log("Client Data:", response.data);
                    setClient(response.data);
                } else {
                    notifyError('No client details found');
                }
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
            {client.projectHistory && client.projectHistory.length > 0 ? (
          client.projectHistory.map(project => (
            <li key={project._id}>{project.name}</li>
          ))
                ) : (
                    <li>No projects found.</li>
                )}
            </ul>
        </div>
    );
};

export default ClientDetail;
