const request = require('superagent');
const { CORRELATIONID_HEADER } = require('puma-logg');

/** Denne kan brukes for å gjøre kall til andre tjenester
vil inkludere headers med x-correlation-id, x-application-id og auth cookie
*/
class ServiceRequest {
    constructor(req) {
        this.correlationId = req.headers[CORRELATIONID_HEADER];
        if (this.correlationId === undefined) {
            throw Error(
                `${CORRELATIONID_HEADER} has to be set in  ServiceRequest`
            );
        }
        this.applicationId = req.properties.applicationId;
        if (this.applicationId === undefined) {
            throw Error('x-application-id has to be set in  ServiceRequest');
        }
        this.cookie = req.cookies.Cookie;
        if (this.cookie === undefined) {
            throw Error(
                'iPlanetDirecotryPro cookie has to be set in  ServiceRequest'
            );
        }
        this.authorization = req.headers.authorization;
        if (this.authorization === undefined) {
            throw Error('authorization has to be set in  ServiceRequest');
        }
    }

    get(url) {
        return request
            .get(url)
            .set('Cookie', this.cookie)
            .set(CORRELATIONID_HEADER, this.correlationId)
            .set('x-application-id', this.applicationId);
    }

    post(url, data) {
        return request
            .post(url, data)
            .set('Cookie', this.cookie)
            .set(CORRELATIONID_HEADER, this.correlationId)
            .set('Authorization', `Token ${this.cookie.split('=')[1]}`)
            .set('x-application-id', this.applicationId);
    }

    put(url, data) {
        return request
            .put(url, data)
            .set('Cookie', this.cookie)
            .set(CORRELATIONID_HEADER, this.correlationId)
            .set('x-application-id', this.applicationId);
    }

    del(url) {
        return request
            .del(url)
            .set('Cookie', this.cookie)
            .set(CORRELATIONID_HEADER, this.correlationId)
            .set('x-application-id', this.applicationId);
    }
}

module.exports = ServiceRequest;
