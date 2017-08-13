import { NavigationActions } from 'react-navigation';
import Navigator, {MainCardNavigator} from '../containers/navigator';

import { NAV_BACK, NAV_NAVIGATE } from '../statics/actions';

const initialState = Navigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'StoreSelect',
	  }),
	],
}))
export default function nav(state = initialState, action) {
	switch (action.type) {
		case NAV_NAVIGATE:
		case NAV_BACK:
			return Navigator.router.getStateForAction(action, state);
		default:
			return state;
	}
}