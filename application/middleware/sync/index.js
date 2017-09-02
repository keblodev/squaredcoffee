
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
        //     case LOGIN_USER:
        //     case CREATE_USER:
        //     case CREATE_REMOTE_USER:
        //     case CREATE_USER_CARD:
        //     case CHARGE_USER_CARD:
        //     case CHARGE_NONCE:
        //         dispatch(actions.loadingActive("loading..."));
        //         break;
        //     case LOGIN_USER_ERROR:
        //     case LOGOUT_USER_ERROR:
        //     case CREATE_USER_ERROR:
        //     case CREATE_REMOTE_USER_ERROR:
        //     case CREATE_USER_CARD_ERROR:
        //     case CHARGE_USER_CARD_ERROR:
        //     case CHARGE_NONCE_ERROR:
        //     case USER_LOGGEDIN:
        //     case USER_CREATED:
        //     case REMOTE_USER_CREATED:
        //     case USER_CARD_CREATED:
        //     case USER_CARD_CHARGED:
        //     case NONCE_CHARGED:
        //         dispatch(actions.loadingNotActive());
        //         break;
        }
    });

    return next(action);
}