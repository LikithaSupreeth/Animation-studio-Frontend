import { Route, BrowserRouter as Router } from 'react-router-dom';

import React from 'react';

// import HomePage from './pages/HomePage';
// import ClientPage from './pages/ClientPage';
// import FeedbackPage from './pages/FeedbackPage';
// import LoginPage from './pages/LoginPage';
// import PaymentPage from './pages/PaymentPage';
// import ProjectPage from './pages/ProjectPage';
// import RegisterClientPage from './pages/RegisterClientPage';
// import TaskPage from './pages/TaskPage';
// import Navbar from './components/common/Navbar';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="container mt-4">
        {/* <Switch> */}
          {/* <Route path="/" exact component={HomePage} />
          <Route path="/clients" component={ClientPage} />
          <Route path="/feedback" component={FeedbackPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/projects" component={ProjectPage} />
          <Route path="/register-client" component={RegisterClientPage} />
          <Route path="/tasks" component={TaskPage} /> */}
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;
