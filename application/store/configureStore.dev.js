import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import * as storage from 'redux-storage'
// import { composeWithDevTools } from 'redux-devtools-extension';

import actions from '../actions';
import reducers from '../reducers';

const reducer = storage.reducer(reducers);
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools({ port: 5678 , realtime: true });
const localStorageKey = "mySquaredCoffeeAppDev";
const engine = createEngine(localStorageKey);
const middleware = storage.createMiddleware(engine);

import checkoutFormMw from '../middleware/checkoutform';
import geoMw from '../middleware/geo';

export default function configureStore(initialState) {

	const store = createStore(reducer, initialState,
	  	composeEnhancers(
	    	applyMiddleware(
				thunk,
				checkoutFormMw,
				geoMw,
				middleware
			),
  		)
	);

	const load = storage.createLoader(engine);

	load(store)
		.then((newState) => console.log('Loaded state:', newState))
		.catch(() => console.log('Failed to load previous state'));

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default;
			store.replaceReducer(nextReducer);
		});
  	}

  return store;
}