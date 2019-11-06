const { logInfo, newCorrelationId } = require('puma-logg');

/**
 * Ansvarlig for at vi ikke logger noe utilsiktet fra konfigurasjonen, som for eksempel passord.
 */
module.exports = {
    logg: config => {
        const configSomKanLogges = {
            loggBackendUrl: config.loggBackendUrl,
            kodeverkUrl: config.kodeverkUrl,
            peter: config.peter,
        };
        logInfo(
            newCorrelationId(),
            `Starter opp med konfigurasjon: ${JSON.stringify(
                configSomKanLogges
            )}`
        );
    },
};
