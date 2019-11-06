const logg = require('puma-logg');

/** Denne kan brukes for å logge, vil inkludere korrelasjonsId i logginnslag */
class Logger {
    constructor(req) {
        this.correlationId = req.headers[logg.CORRELATIONID_HEADER];
        if (this.correlationId === undefined) {
            // egentlig smør på flesk, siden vi gjør app.use(correlationId());
            this.correlationId = logg.newCorrelationId();
            req.headers[logg.CORRELATIONID_HEADER] = this.correlationId;
        }
    }

    debug(msg) {
        logg.logDebug(this.correlationId, msg);
    }

    info(msg) {
        logg.logInfo(this.correlationId, msg);
    }

    warning(msg) {
        logg.logWarning(this.correlationId, msg);
    }

    error(msg, error) {
        logg.logError(this.correlationId, msg, error);
    }
}

module.exports = Logger;
