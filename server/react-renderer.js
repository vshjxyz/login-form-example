import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router';
import { RouteErrors } from  '../app/shared/constants';
import routes from '../app/routes';
import globPromise from './glob-promise';

// This renders the router server-side
// It is necessary to do so if we want to handle error codes in order to return the
// proper one for CDNs and other services that relies on http status codes.
const routeUrl = (url) => {
    return new Promise((resolve, reject) => {
        match({
            routes: routes,
            location: url
        }, (error, redirectLocation, renderProps) => {
            if (error) {
                reject({
                    error: RouteErrors.ROUTING
                });
            } else if (redirectLocation) {
                reject({
                    error: RouteErrors.REDIRECT,
                    route: redirectLocation
                });
            } else {
                resolve(renderProps);
            }
        });
    }).then((routerProps) => {
            if (routerProps.routes[0].path === '*') { // Not found
                throw {
                    error: RouteErrors.NOT_FOUND,
                    props: routerProps
                };
            }

            return routerProps;
        });
};

const renderRouter = (routerProps) => {
    return new Promise((resolve, reject) => {
        const prerenderedPage = ReactDOMServer.renderToString(<RouterContext {...routerProps} />);

        if (process.env.NODE_ENV != 'development') {
            // If we are not in development, webpack won't be running so we need to
            // fetch the files from the dist folders and order

            Promise.all([
                globPromise(process.cwd() + '/dist/*.css'),
                globPromise(process.cwd() + '/dist/*.js')
            ]).then(([cssList, jsList]) => {
                resolve({
                    html: prerenderedPage,
                    styles: cssList,
                    scripts: jsList
                });
            }, reject);
        } else {
            resolve({
                html: prerenderedPage,
                styles: [],
                scripts: [ 'bundle.js' ]
            });
        }
    });
};

export default {
    routeUrl,
    renderRouter
}
