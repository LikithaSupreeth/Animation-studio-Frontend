import * as Yup from 'yup';

export const clientRegisterValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .required('Password is required'),
    contactInformation: Yup.string()
        .required('Contact information is required')
});

export const adminRegisterValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .required('Password is required'),
    role: Yup.string()
        .oneOf(['Project Manager', 'Animator'], 'Invalid role specified')
        .required('Role is required'),
});
