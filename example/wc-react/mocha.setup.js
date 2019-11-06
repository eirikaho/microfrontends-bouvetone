/**
 * Mocha må settes opp med jsdom for at mount() skal fungere.
 * mount() sørger for å rendre komponenten under test til en DOM.
 */

import { JSDOM } from 'jsdom';

const DOM = new JSDOM('');
global.window = DOM.window;
global.document = DOM.window.document;

global.navigator = {
    userAgent: 'node.js',
};
