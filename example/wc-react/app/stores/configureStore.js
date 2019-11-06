import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const storeEnhancer = composeWithDevTools(applyMiddleware(thunk, reduxLogger));

export default function(initialState) {
    return createStore(rootReducer, initialState, storeEnhancer);
}
