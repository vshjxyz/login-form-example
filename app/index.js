import App from './pages/app';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router } from 'react-router';
import { browserHistory } from 'react-router'

if (module.hot) {
    // Enables webpack hot reload
    module.hot.accept();
}

window.onload = () => {
    ReactDOM.render(<Router history={ browserHistory } routes={ routes } />, document.getElementById('app-wrapper'));
};
