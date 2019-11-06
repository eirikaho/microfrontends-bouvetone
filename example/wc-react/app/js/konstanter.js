// Test-relatert
export const TESTMODUS = false;

// HTTP-relatert
const TIMEOUT_SERVER_RESPONSTID = 10000;
const TIMEOUT_DATAMOTTAK = 60000;
export const TIMEOUT_CONFIG = {
    response: TIMEOUT_SERVER_RESPONSTID,
    deadline: TIMEOUT_DATAMOTTAK,
};

// Backend / Endepunkt
export const ROOT_URI_LOGG = '/logg';
export const ROOT_URI_KODEVERK = '/kodeverk';
