'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/app.jsx';
import LoginView from './pages/login/login.jsx';
import NotFoundView from './pages/not-found.jsx';

export default [
    <Route path="/" component={App}>
        <IndexRoute component={LoginView} />
        <Route path="*" component={NotFoundView}/>
    </Route>,
];
