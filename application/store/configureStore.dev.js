import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import FilesystemStorage from 'redux-persist-filesystem-storage'
import { persistStore, persistCombineReducers } from 'redux-persist'
import reduxReset from 'redux-reset';

import actions from '../actions';
import reducers from '../reducers';

import appActions from '../statics/actions';

const version = "prodV2017010894";
const localStorageKey = ["myCloveredCoffeeAppOne", version].join('');

const config = {
    key:      localStorageKey,
    storage:  FilesystemStorage,
    debug:    true,
};

const reducer = persistCombineReducers(config, {...reducers});
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || composeWithDevTools({ port: 5678 , realtime: true });

import middleware from '../middleware';

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState,
        composeEnhancers(
            applyMiddleware(
                thunk,
                ...middleware,
            ),
            reduxReset(appActions.APP_RESET),
        )
    );

    persistStore(store);

  return store;
}
