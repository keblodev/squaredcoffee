
import {
   DELETE_USER_CARD
}                       from '../../statics/actions/api';

import {
   USER_CARD_REMOVE
}                       from '../../statics/actions/user';

import actions          from '../../actions';

export default store => next => action => {
    Promise.resolve().then(_=> {
        const state = store.getState();
        const dispatch = store.dispatch;
        stateAndDispatch = {state, dispatch};

        switch(action.type) {
            case USER_CARD_REMOVE:
                const cardRemoteId = action.cardRemoteId;
                const auth = state.user.auth;
                dispatch(actions.deleteUserCard({cardRemoteId, auth}))

                break;
            case DELETE_USER_CARD:
                console.log(action);
                break;
        }
    });

    return next(action);
}