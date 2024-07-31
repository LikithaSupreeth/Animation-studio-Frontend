// import App from './App';
// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
