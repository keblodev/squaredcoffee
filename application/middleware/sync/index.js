
import {
    FETCH_USER,
    USER_FETCHED,
    FETCH_LOCATION,
    FETCH_USER_CARD,
    USER_CARD_FETCHED,
    LOGIN_USER,
    LOGIN_USER_ERROR,
    USER_LOGGEDIN,
    LOGOUT_USER,
    LOGOUT_USER_ERROR,
    USER_LOGGEDOUT,
    CREATE_USER,
    CREATE_USER_ERROR,
    USER_CREATED,
    CREATE_REMOTE_USER,
    CREATE_REMOTE_USER_ERROR,
    REMOTE_USER_CREATED,
    CREATE_USER_CARD,
    CREATE_USER_CARD_ERROR,
    USER_CARD_CREATED,
    CHARGE_USER_CARD,
    CHARGE_USER_CARD_ERROR,
    USER_CARD_CHARGED,
    CHARGE_NONCE,
    CHARGE_NONCE_ERROR,
    NONCE_CHARGED,
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
            case LOGIN_USER_ERROR:
            case LOGOUT_USER_ERROR:
            case CREATE_USER_ERROR:
            case CREATE_REMOTE_USER_ERROR:
            case CREATE_USER_CARD_ERROR:
            case CHARGE_USER_CARD_ERROR:
            case CHARGE_NONCE_ERROR:
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