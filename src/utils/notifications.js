import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

export const notifySuccess = (message) => {
    toast.success(message, {
        position:"top-right",
        autoClose: 5000, // auto close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const notifyError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
