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
import sync from './syncReducer';

const rootReducer = combineReducers({
    cart,
    geo,
    modal,
    nav,
    notification,
    shops,
    sync,
    testReducer,
    user,
    webviews,
});

export default rootReducer;
