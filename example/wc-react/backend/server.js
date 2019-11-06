const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const epimetheus = require('epimetheus');
const prometheus = require('prometheus-healthcheck-format');
const { correlationId, logInfo } = require('puma-logg');

const leggTilProperties = require('./middleware/leggTilProperties');
const routes = require('./routes');

/**
 * Konfigurerer og starter HTTP-server.
 * @param port
 * @param properties
 */
let server = null;
const start = (port, properties) => {
    const app = express();

    app.use(bodyParser.json({ strict: false, limit: '10mb' }));
    app.use(cookieParser());
    app.use(correlationId());
    app.use(leggTilProperties(properties));
    app.set('port', port);

    epimetheus.instrument(app, { url: '/admin/metrics' }); // Gjør metrics tilgjengelige for Prometheus.
    prometheus(app);

    routes(app);

    server = http.createServer(app).listen(app.get('port'));

    logInfo(
        'react-oppstart',
        `Server startet OK på port ${port}.`
    );

    return server;
};

const close = () => {
    if (server && server.close) server.close();
};

module.exports.start = start;
module.exports.close = close;
