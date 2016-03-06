'use strict';

require('babel-register');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./dev.config');

const compiler = webpack(config.webpack);
const devServer = new WebpackDevServer(compiler, config.server.options);

devServer.listen(config.server.port, 'localhost', () => {
    console.log('server open');
});
