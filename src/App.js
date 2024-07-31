import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AuthProvider>
    );
}

export default App;
