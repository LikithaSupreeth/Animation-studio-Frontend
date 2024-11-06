import { Route, Routes } from 'react-router-dom';

import PaymentForm from '../components/Payments/PaymentsForm';
import PaymentHistory from '../components/Payments/PaymentHistory';
import React from 'react';

const PaymentPage = () => {


    return (
        <div className="container mt-4">
            <Routes>
                <Route  path="/" element={<PaymentHistory/>} />
                <Route path="create" element={<PaymentForm/>} />
            </Routes>
        </div>
    );
};

export default PaymentPage;
