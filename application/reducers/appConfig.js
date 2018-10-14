import appTypes from '../statics/actions';

import {BASE_URL, CLOVER_IMG_ROUTE} from '../statics/configs';

const initialState = {
    assetsRoute: CLOVER_IMG_ROUTE,
};

export default function appConfig(state = initialState, action) {
    switch (action.type) {
        case appTypes.GOT_APP_CONFIG:
            return {
                ...action.data,
            };

        default:
            return state;
    }
}