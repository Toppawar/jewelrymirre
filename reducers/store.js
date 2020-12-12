import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import clients from './clients';

const reducers = combineReducers({
    clients
});

const componseEnhancer = process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'dev' ? composeWithDevTools({
    name: 'JewelryMirre'
}) : compose;
const store = createStore(reducers, componseEnhancer(applyMiddleware(thunk)));

export default store;