const server = require('./server');
const config = require('./config');

const instans = server.start(3003, config.hent());

module.exports.instans = instans;
