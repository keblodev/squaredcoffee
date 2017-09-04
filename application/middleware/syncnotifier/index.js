
import * as types       from '../../statics/actions/api';

import actions          from '../../actions';

export default store => next => action => {
    Promise.resolve().then(_=> {
        const state = store.getState();
        const dispatch = store.dispatch;
        stateAndDispatch = {state, dispatch};

        switch(action.type) {
            case types.USER_CARD_CREATED:
                var notifyConfig = {
                    msg: "card added",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case types.USER_LOGGEDIN:
                var notifyConfig = {
                    msg: "you're in",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case types.USER_CREATED:
                var notifyConfig = {
                    msg: "good to go!",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case types.REMOTE_USER_CREATED:
                var notifyConfig = {
                    msg: "thanks!",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case types.USER_CARD_DELETED:
                var notifyConfig = {
                    msg: "card deleted",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;

            case types.USER_CARD_CHARGED:
            case types.NONCE_CHARGED:
                var notifyConfig = {
                    msg: "order placed",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;

            case types.REMOTE_USER_UPDATED:
                var notifyConfig = {
                    msg: 'updated',
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());

                break;

            case types.GET_USER_CARDS:
            case types.GET_USER_ACCOUNT_INFO:
                dispatch(actions.fetchingActive("hang on there... "));
                break;

            case types.GOT_USER_ACCOUNT_INFO:
            case types.GOT_USER_CARDS:
                dispatch(actions.fetchingNotActive())
                break;

            case types.LOGIN_USER:
            case types.CREATE_USER:
            case types.CREATE_REMOTE_USER:
            case types.CREATE_USER_CARD:
            case types.CHARGE_USER_CARD:
            case types.CHARGE_NONCE:
            case types.DELETE_USER_CARD:
            case types.DELETE_USER:
                dispatch(actions.loadingActive("loading..."));
                break;

            case types.LOGIN_USER_ERROR:
            case types.LOGOUT_USER_ERROR:
            case types.CREATE_USER_ERROR:
            case types.CREATE_REMOTE_USER_ERROR:
            case types.CREATE_USER_CARD_ERROR:
            case types.CHARGE_USER_CARD_ERROR:
            case types.CHARGE_NONCE_ERROR:
            case types.GETTING_USER_CARDS_ERROR:
            case types.DELETING_USER_CARD_ERROR:
            case types.DELETING_USER_ERROR:
            case types.GETTING_USER_ACCOUNT_INFO_ERROR:
            case types.UPDATE_REMOTE_USER_ERROR:
                if (action.error) {
                    var notifyConfig = {
                        msg: action.error.message,
                        popup: true,
                        error: true
                    }
                    dispatch(actions.showNotify(notifyConfig));
                }
                dispatch(actions.loadingNotActive());
                dispatch(actions.fetchingNotActive());
                break;
        }
    });

    return next(action);
}