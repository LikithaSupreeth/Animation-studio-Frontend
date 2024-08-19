import { Route, Switch, useRouteMatch } from 'react-router-dom';

import PaymentForm from '../components/Payments/PaymentForm';
import PaymentHistory from '../components/Payments/PaymentHistory';
import React from 'react';

const PaymentPage = () => {
    const { path } = useRouteMatch();

    return (
        <div className="container mt-4">
            <Switch>
                <Route exact path={path} component={PaymentHistory} />
                <Route path={`${path}/create`} component={PaymentForm} />
            </Switch>
        </div>
    );
};

export default PaymentPage;
