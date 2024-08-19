import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CreateTask from '../components/Tasks/CreateTask';
import React from 'react';
import TaskDetail from '../components/Tasks/TaskDetail';
import TaskList from '../components/Tasks/TaskList';

const TaskPage = () => {
    const { path } = useRouteMatch();

    return (
        <div className="container mt-4">
            <Switch>
                <Route exact path={path} component={TaskList} />
                <Route path={`${path}/create`} component={CreateTask} />
                <Route path={`${path}/:id`} component={TaskDetail} />
            </Switch>
        </div>
    );
};

export default TaskPage;
