import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notifications';

import api from '../../utils/api';
import { paymentValidationSchema } from '../../utils/validations';

const PaymentForm = () => {
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

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await api.post('/payment/create', values);
            notifySuccess('Payment created successfully');
        } catch (error) {
            notifyError('Failed to create payment');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Create Payment</h2>
            <Formik
                initialValues={{ amount: '', description: '', clientId: '' }}
                validationSchema={paymentValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <Field name="amount" type="number" className="form-control" />
                            <ErrorMessage name="amount" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field name="description" as="textarea" className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clientId">Client</label>
                            <Field as="select" name="clientId" className="form-control">
                                <option value="">Select a client</option>
                                {clients.map(client => (
                                    <option key={client._id} value={client._id}>{client.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="clientId" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Create Payment</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PaymentForm;
