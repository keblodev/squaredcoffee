import { combineReducers } from 'redux';
import testReducer from "./testReducer";
import testReducerDva from "./testReducerDva";

import nav from './navReducer';
import cart from './cartReducer';
import webviews from './webviewsReducer';

const rootReducer = combineReducers({
  testReducer,
  testReducerDva,
  nav,
  cart,
  webviews
});

export default rootReducer;
