import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

// import { composeWithDevTools } from 'redux-devtools-extension';

import actions from '../actions';
import reducers from '../reducers';

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools({ port: 5678 , realtime: true });
console.log(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);

export default function configureStore(initialState) {

	const store = createStore(reducers, initialState,
	  	composeEnhancers(
	    	applyMiddleware(thunk),
  		)
	);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}