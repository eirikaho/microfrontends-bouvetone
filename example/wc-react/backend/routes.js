const path = require('path');
const express = require('express');

// const auth = require('peter-node-middleware');
// const { lagreInnsynslogg } = require('innsynslogg-middleware');
const { logInfo } = require('puma-logg');

// const swagger = require('./swagger');
const status404 = require('./middleware/status404');

module.exports = app => {
    app.use('/', express.static(path.join(__dirname, '../dist/')));

    app.all('*', (req, res) => {
        status404(req, res);
    });

    const allConfiguredRoutes = () => {
        const routes = [];
        app._router.stack.forEach(layer => {
            if (layer && layer.route) {
                routes.push(layer.route.path);
            }
        });
        return { routes };
    };

    logInfo(
        'react-oppstart',
        JSON.stringify(allConfiguredRoutes())
    );
};
