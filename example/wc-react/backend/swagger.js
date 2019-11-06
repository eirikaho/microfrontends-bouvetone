const express = require('express');

const router = express.Router();

const options = {
    swaggerDefinition: {
        info: {
            title: 'React Redux Boilerplate',
            version: '1.0.0',
            description: 'REST API med Swagger doc',
        },
        tags: [
            {
                name: 'Medlemmer',
                description: 'Informasjon om SPK sine medlemmer',
            },
        ],
        schemes: ['http'],
        host: 'react-redux-boilerplate.kpt.spk.no',
        basePath: '/api',
    },
    apis: ['./backend/**/*Controller.js', './backend/routes.js'],
};

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc(options);

router.get('/json', (req, res) => {
    res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
