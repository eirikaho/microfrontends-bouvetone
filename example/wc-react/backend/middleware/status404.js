const Logger = require('../middleware/Logger');

const melding404 =
    '<html><body><h1>Her finnes det ingenting</h1><p>Har du skrevet riktig URL?</p></body></html>';

module.exports = (req, res) => {
    const logger = new Logger(req);
    logger.info(
        `Mottok uventet request på URI: ${
            req.originalUrl
        }. Svarer med HTTP 404.`
    );
    return res.status(404).send(melding404);
};
