const { Base64 } = require('js-base64');
const app = require('../package');
const { logg } = require('./utils/util');

/**
 * Bygger opp og returnerer all konfigurasjon for applikasjonen.
 */
const hent = () => {
    const TJENESTEPORT = 8080;
    const PETER_URL = process.env.PETER_URL || `http://peter`;
    const KODEVERK =
        process.env.KODEVERK_URL || `http://kodeverk:${TJENESTEPORT}/api/`;

    const PETER_CONFIG = {
        host: process.env.ENVIRONMENT_ADDRESS
            ? `${PETER_URL}.${process.env.ENVIRONMENT_ADDRESS}`
            : `${PETER_URL}.kpt.spk.no`,
        appName: app.name,
        redirect: process.env.ENVIRONMENT_ADDRESS
            ? `${app.name}.${process.env.ENVIRONMENT_ADDRESS}`
            : 'localhost:8090',
    };

    const INNSYNSLOGG_URL =
        process.env.INNSYNSLOGG_WEBSERVICE_URL ||
        `http://innsynslogg-webservice:${TJENESTEPORT}`;

    const config = {
        kodeverkUrl: KODEVERK,
        peter: {
            ...PETER_CONFIG,
        },
        applicationId: 'b9f4079a-fbf2-4e7f-baf3-4cc203f20718',
        innsynslogg: {
            innsynsloggHost: INNSYNSLOGG_URL,
            innsynsloggPassword: process.env.INNSYNSLOGG_CLIENT_PASSWORD
                ? Base64.encode(
                      `spk_client:${process.env.INNSYNSLOGG_CLIENT_PASSWORD}`
                  )
                : Base64.encode('spk_client:innsynslogg'),
        },
    };

    logg(config);
    return config;
};

module.exports.hent = hent;
