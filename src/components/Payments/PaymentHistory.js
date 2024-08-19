import React, { useEffect, useState } from 'react';

import api from '../../utils/api';
import { notifyError } from '../../utils/notifications';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get('/payment/getallpayments');
                setPayments(response.data);
            } catch (error) {
                notifyError('Failed to fetch payment history');
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Payment History</h2>
            <ul className="list-group">
                {payments.map(payment => (
                    <li key={payment._id} className="list-group-item">
                        <p><strong>Amount:</strong> {payment.amount}</p>
                        <p><strong>Description:</strong> {payment.description}</p>
                        <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                        <p><strong>Client:</strong> {payment.client.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;
