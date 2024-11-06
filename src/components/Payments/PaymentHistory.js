import React, { useEffect, useState } from 'react';

import axios from '../../config/axios';
import { notifyError } from '../../utils/notifications';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/payment/getallpayments',{
                    headers: { Authorization: `Bearer ${token}` }
                });
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
                        <p><strong>Description:</strong> {payment.description || 'No description available'}</p>
                        <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                        <p><strong>Client:</strong> {payment.client ? payment.client.name : 'Unknown Client'}</p>
                        <p><strong>Project:</strong> {payment.project?.name || "No project assigned"}</p>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;

