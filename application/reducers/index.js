// import { combineReducers } from 'redux';
import testReducer from "./testReducer";

import nav          from './navReducer';
import cart         from './cart';
import user         from './user';
import webviews     from './webviewsReducer';
import modal        from './modalReducer';
import geo          from './geoReducer';
import notification from './notifyReducer';
import shops        from './shops';
import sync         from './syncReducer';
import images       from './images';
import appConfig    from './appConfig';

export default {
    images,
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
    appConfig,
};
