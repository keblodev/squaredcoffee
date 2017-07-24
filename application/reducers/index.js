import { combineReducers } from 'redux';
import testReducer from "./testReducer";
import testReducerDva from "./testReducerDva";


const rootReducer = combineReducers({
  testReducer,
  testReducerDva
});

export default rootReducer;
