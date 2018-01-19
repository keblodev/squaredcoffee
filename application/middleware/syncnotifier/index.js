
import appActions      from '../../statics/actions';

import actions          from '../../actions';

export default store => next => action => {
    Promise.resolve().then(_=> {
        const state = store.getState();
        const dispatch = store.dispatch;
        stateAndDispatch = {state, dispatch};

        switch(action.type) {

            case appActions.GETTING_AUTHORIZED_SHOPS:
                dispatch(actions.loadingActive("getting authorized shops..."));
                break;

            case appActions.GETTING_SHOP_CATEGORIES:
                dispatch(actions.fetchingActive("syncing shop categories... "));
                break;

            case appActions.PLACING_NEW_ORDER:
                dispatch(actions.loadingActive("placing your order..."));
                break;

            case appActions.UPDATING_USER:
                dispatch(actions.loadingActive("updating you information..."));
                break;

            case appActions.RESET_PASSWORD_REQUEST:
                dispatch(actions.loadingActive("sending new password reset link..."));
                break;

            case appActions.EMAIL_VALIDATE_RESEND_REQUEST:
                dispatch(actions.loadingActive("sending new verification link..."));
                break;

            case appActions.PAYING_FOR_ORDER:
                dispatch(actions.loadingActive("Processing payment..."));
                break;

            case appActions.CANCELLING_ORDER:
                dispatch(actions.loadingActive("Cancelling order..."));
                break;

            case appActions.GOT_SHOP_CATEGORIES:
                dispatch(actions.fetchingNotActive())
                break;
            case appActions.GOT_AUTHORIZED_SHOPS:
                dispatch(actions.loadingNotActive());
                break;

            case appActions.ORDER_IS_CANCELLED:
            case appActions.ORDER_IS_PAID:
                var notifyConfig = {
                    msg: "Success!",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;

            case appActions.USER_CARD_CREATED:
                var notifyConfig = {
                    msg: "card added",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case appActions.USER_LOGGEDIN:
                // var notifyConfig = {
                //     msg: "you're in",
                //     popup: true,
                // }
                // dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case appActions.USER_CREATED:
                var notifyConfig = {
                    msg: "good to go!",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case appActions.REMOTE_USER_CREATED:
                var notifyConfig = {
                    msg: "thanks!",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;
            case appActions.USER_CARD_DELETED:
                var notifyConfig = {
                    msg: "card deleted",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;

            case appActions.RESET_PASSWORD_REQUEST_SUCCESS:
            case appActions.VALIDATION_EMAIL_RESENT:
                var notifyConfig = {
                    msg: "Link sent.",
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());
                break;

            case appActions.GOT_NEW_ORDER_PLACED:
                dispatch(actions.loadingNotActive());
                break;

            case appActions.USER_UPDATED:
            case appActions.REMOTE_USER_UPDATED:
                var notifyConfig = {
                    msg: 'updated',
                    popup: true,
                }
                dispatch(actions.showNotify({...notifyConfig}));
                dispatch(actions.loadingNotActive());

                break;

            case appActions.GETTING_USER_ORDERS:
            case appActions.GET_USER_CARDS:
            case appActions.GET_USER_ACCOUNT_INFO:
                dispatch(actions.fetchingActive("hang on there... "));
                break;

            case appActions.GOT_USER_ORDERS:
            case appActions.GOT_USER_ACCOUNT_INFO:
            case appActions.GOT_USER_CARDS:
                dispatch(actions.fetchingNotActive())
                break;


            case appActions.LOGIN_USER:
            case appActions.CREATE_USER:
            case appActions.CREATE_REMOTE_USER:
            case appActions.CREATE_USER_CARD:
            case appActions.CHARGE_USER_CARD:
            case appActions.CHARGE_NONCE:
            case appActions.DELETE_USER_CARD:
            case appActions.DELETE_USER:
                dispatch(actions.loadingActive("loading..."));
                break;


            case appActions.REMOVING_ORDER_ERROR:
            case appActions.CANCELLING_ORDER_ERROR:
            case appActions.PAYING_FOR_ORDER_ERROR:
            case appActions.LOGIN_USER_ERROR:
            case appActions.LOGOUT_USER_ERROR:
            case appActions.CREATE_USER_ERROR:
            case appActions.CREATE_REMOTE_USER_ERROR:
            case appActions.UPDATING_USER_ERROR:
            case appActions.CREATE_USER_CARD_ERROR:
            case appActions.CHARGE_USER_CARD_ERROR:
            case appActions.CHARGE_NONCE_ERROR:
            case appActions.GETTING_USER_ORDERS_ERROR:
            case appActions.GETTING_USER_CARDS_ERROR:
            case appActions.DELETING_USER_CARD_ERROR:
            case appActions.DELETING_USER_ERROR:
            case appActions.RESET_PASSWORD_REQUEST_ERROR:
            case appActions.GETTING_USER_ACCOUNT_INFO_ERROR:
            case appActions.UPDATE_REMOTE_USER_ERROR:
            case appActions.GETTING_AUTHORIZED_SHOPS_ERROR:
            case appActions.GETTING_SHOP_CATEGORIES_ERROR:
            case appActions.EMAIL_VALIDATE_RESEND_REQUEST_ERROR:
            case appActions.PLACING_NEW_ORDER_ERROR:
            case appActions.REFETCHING_AUTHORIZED_SHOPS:
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