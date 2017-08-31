
import {
    FETCH_USER,
    USER_FETCHED,
    FETCH_USER_CARD,
    USER_CARD_FETCHED,
    LOGIN_USER,
    USER_LOGGEDIN,
    LOGOUT_USER,
    USER_LOGGEDOUT,
    CREATE_USER,
    USER_CREATED,
    CREATE_REMOTE_USER,
    REMOTE_USER_CREATED,
    CREATE_USER_CARD,
    USER_CARD_CREATED,
    CHARGE_USER_CARD,
    USER_CARD_CHARGED,
    CHARGE_NONCE,
    NONCE_CHARGED,
    PURCHASE_SUCCESS,
    PURCHASE_ERROR,
    FETCH_LOCATION,
}                       from '../../statics/actions/api';

import actions          from '../../actions';

export default store => next => action => {
    Promise.resolve().then(_=> {
        const state = store.getState();
        const dispatch = store.dispatch;
        stateAndDispatch = {state, dispatch};

        switch(action.type) {
            case LOGIN_USER:
            case CREATE_USER:
            case CREATE_REMOTE_USER:
            case CREATE_USER_CARD:
            case CHARGE_USER_CARD:
            case CHARGE_NONCE:
                dispatch(actions.loadingActive("loading..."));
                break;
            case USER_LOGGEDIN:
            case USER_CREATED:
            case REMOTE_USER_CREATED:
            case USER_CARD_CREATED:
            case USER_CARD_CHARGED:
            case NONCE_CHARGED:
                dispatch(actions.loadingNotActive());
                break;
        }
    });

    return next(action);
}