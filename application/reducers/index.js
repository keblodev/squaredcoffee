import { combineReducers } from 'redux';
import testReducer from "./testReducer";

import nav from './navReducer';
import cart from './cartReducer';
import user from './userReducer';
import webviews from './webviewsReducer';
import modal from './modalReducer';
import geo from './geoReducer';
import notification from './notifyReducer';
import shops from './shopsReducer';

const rootReducer = combineReducers({
	testReducer,
	nav,
	cart,
	user,
	webviews,
	modal,
	geo,
	shops,
	notification
});

export default rootReducer;
