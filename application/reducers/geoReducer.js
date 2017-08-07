
import {GEO_INACTIVE, GEO_ACTIVE} from '../statics/strings/geo';
import {GEO_START_WATCH, GEO_END_WATCH} from '../statics/actions/geo';

const initialState = {
	status: GEO_INACTIVE
}

export default geo = (state = initialState, action) => {
	switch(action.type) {
		case GEO_START_WATCH:
			return {
				...state,
				status: GEO_ACTIVE
			}
		case GEO_END_WATCH:
			return {
				...state,
				status: GEO_INACTIVE
			}
		default:
			return state;
	}
}