
import * as apiTypes    from '../../statics/actions/api';

import {
   USER_CARD_REMOVE,
}                       from '../../statics/actions/user';

import actions          from '../../actions';

export default store => next => action => {
    Promise.resolve().then(_=> {
        const state = store.getState();
        const dispatch = store.dispatch;
        stateAndDispatch = {state, dispatch};

        const auth = state.user.auth;

        switch(action.type) {
            case USER_CARD_REMOVE:
                const cardRemoteId = action.cardRemoteId;

                dispatch(actions.deleteUserCard({cardRemoteId, auth}))

                break;
            case apiTypes.DELETE_USER_CARD:
                console.log(action);
                break;

            case apiTypes.REMOTE_USER_UPDATED:
                if (auth) {
                    dispatch(actions.getUserAccountInfo({auth}));
                }
            case apiTypes.USER_LOGGEDIN:
            case apiTypes.USER_CREATED:
                if (auth) {
                    dispatch(actions.getUserCards({auth}));
                    dispatch(actions.getUserAccountInfo({auth}));
                }
                break;

            case apiTypes.DELETING_USER_CARD_ERROR:
            case apiTypes.CREATE_USER_CARD_ERROR:
            case apiTypes.USER_CARD_CREATED:
            case apiTypes.USER_CARD_DELETED:
                if (auth) {
                    dispatch(actions.getUserCards({auth}));
                    dispatch(actions.getUserAccountInfo({auth}));
                }
                break;
        }
    });

    return next(action);
}