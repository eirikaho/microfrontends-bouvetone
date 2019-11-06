const http = require('http');
const { logInfo, newCorrelationId } = require('puma-logg');

const options = {
    host: 'localhost',
    port: '8080',
    path: '/admin/healthcheck',
    timeout: 2000,
};

const request = http.get(options, res => {
    console.log(`healthcheck HTTP status code: ${res.statusCode}`);
    logInfo(
        newCorrelationId(),
        `healthcheck HTTP status code: ${res.statusCode}`
    );
    if (res.statusCode === 200) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});

request.on('error', err => {
    logInfo(newCorrelationId(), 'ERROR', err);
    process.exit(1);
});

request.end();
