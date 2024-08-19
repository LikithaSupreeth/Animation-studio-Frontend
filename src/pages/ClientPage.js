import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ClientDetail from '../components/Clients/ClientDetail';
import ClientList from '../components/Clients/ClientList';
import React from 'react';

const ClientPage = () => {
    const { path } = useRouteMatch();

    return (
        <div className="container mt-4">
            <Switch>
                <Route exact path={path} component={ClientList} />
                <Route path={`${path}/:id`} component={ClientDetail} />
            </Switch>
        </div>
    );
};

export default ClientPage;
