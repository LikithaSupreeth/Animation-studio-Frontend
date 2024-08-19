import { Route, Switch, useRouteMatch } from 'react-router-dom';

import EditProfile from '../components/UserProfile/EditProfile';
import React from 'react';
import UserProfile from '../components/UserProfile/UserProfile';

const UserProfilePage = () => {
    const { path } = useRouteMatch();

    return (
        <div className="container mt-4">
            <Switch>
                <Route exact path={path} component={UserProfile} />
                <Route path={`${path}/edit`} component={EditProfile} />
            </Switch>
        </div>
    );
};

export default UserProfilePage;
