import { combineReducers } from 'redux';
import testReducer from "./testReducer";
import testReducerDva from "./testReducerDva";

import nav from './navReducer';
import cart from './cartReducer';
import user from './userReducer';
import webviews from './webviewsReducer';
import modal from './modalReducer';
import geo from './geoReducer';
import notification from './notifyReducer';

const rootReducer = combineReducers({
	testReducer,
	testReducerDva,
	nav,
	cart,
	user,
	webviews,
	modal,
	geo,
	notification
});

export default rootReducer;
