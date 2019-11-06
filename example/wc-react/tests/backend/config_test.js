import { expect } from 'chai';
import sinon from 'sinon';
import logg from 'puma-logg';
import * as config from '../../backend/config';

const { Base64 } = require('js-base64');

describe('config', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(logg);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('skal returnere properties', () => {
        expect(config.hent()).to.deep.equal({
            kodeverkUrl: 'http://kodeverk:8080/api/',
            peter: {
                appName: 'react',
                host: 'http://peter.kpt.spk.no',
                redirect: 'localhost:8090',
            },
            applicationId: 'b9f4079a-fbf2-4e7f-baf3-4cc203f20718',
            innsynslogg: {
                innsynsloggHost: 'http://innsynslogg-webservice:8080',
                innsynsloggPassword: Base64.encode('spk_client:innsynslogg'),
            },
        });
    });
});
