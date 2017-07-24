import * as types from '../statics/actions';

const appTestAction = val => ({ type: types.APP_TEST_ACTION, val });
const appTestActionDva = val => ({ type: types.APP_TEST_ACTION_DVA, val });

export default {
	appTestAction,
	appTestActionDva
};
