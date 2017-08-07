
import {PUSH_NOTIFY} from '../../statics/actions'

import actions from '../../actions';

const showNotify = () => {
	stateAndDispatch.dispatch(actions.showNotify());

	setTimeout(()=> {
		stateAndDispatch.dispatch(actions.hideNotify())
	},2000);
}

let stateAndDispatch = {};

export default store => next => action => {
	Promise.resolve().then(_=> {
		const state = store.getState();
		const dispatch = store.dispatch;
		stateAndDispatch = {state, dispatch};

		switch(action.type) {
			case PUSH_NOTIFY:
				showNotify(action.notification);
				break;
		}
	});

	return next(action);
}