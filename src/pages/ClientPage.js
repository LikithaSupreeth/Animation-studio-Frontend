import { Route, Routes } from 'react-router-dom';

import ClientDetail from '../components/Clients/ClientDetails';
import ClientList from '../components/Clients/ClientList';
import React from 'react';

const ClientPage = () => {

    return (
        <div className="container mt-4">
            <Routes>
                <Route  path="/" element={<ClientList/>} />
                <Route path=":id" element={<ClientDetail/>} />
            </Routes>
        </div>
    );
};

export default ClientPage;
