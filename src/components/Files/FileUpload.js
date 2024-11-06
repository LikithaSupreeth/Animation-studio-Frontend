import { ErrorMessage, Field, Form, Formik } from 'formik';
import { notifyError, notifySuccess } from '../../utils/notifications';

import React from 'react';
import axios from '../../config/axios'
import { fileValidationSchema } from '../../utils/validations';

const FileUpload = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('file', values.file);
        formData.append('description', values.description);

        try {
            await axios.post('/file/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            notifySuccess('File uploaded successfully');
        } catch (error) {
            notifyError('Failed to upload file');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Upload File</h2>
            <Formik
                initialValues={{ file: null, description: '' }}
                validationSchema={fileValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="file">File</label>
                            <input
                                name="file"
                                type="file"
                                className="form-control"
                                onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
                            />
                            <ErrorMessage name="file" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field name="description" as="textarea" className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Upload File</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FileUpload;
