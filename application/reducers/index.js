import { combineReducers } from 'redux';
import testReducer from "./testReducer";
import testReducerDva from "./testReducerDva";

import nav from './navReducer';

const rootReducer = combineReducers({
  testReducer,
  testReducerDva,
  nav
});

export default rootReducer;
