'use strict';

import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../shared/store';
import CounterActions from '../actions/counter-actions';

if (process.env.BROWSER) {
    require('../styles/app.scss');
}

export default React.createClass({
    displayName: 'App',

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <section className="app">
                <Provider store={configureStore()}>
                    { this.props.children }
                </Provider>
            </section>
        );
    }
});
