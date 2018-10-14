
import appActions from '../../statics/actions';
import { PERSIST, REHYDRATE } from 'redux-persist';
import { persistStore} from 'redux-persist'

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
            case REHYDRATE:
                dispatch(actions.appInitAction());
                break;

            case appActions.USER_CARD_REMOVE:
                const cardRemoteId = action.cardRemoteId;

                dispatch(actions.deleteUserCard({cardRemoteId, auth}))

                break;
            case appActions.DELETE_USER_CARD:
                console.log(action);
                break;

            case appActions.UPDATING_USER:
            case appActions.UPDATING_USER_ERROR:
            case appActions.REMOTE_USER_UPDATED:
                var {resetClientAppState} = action;
                if (resetClientAppState) {
                    dispatch(actions.appResetAction());
                } else {
                    if (auth) {
                        dispatch(actions.getUserAccountInfo({auth}));
                    }
                }
                break;
            case appActions.USER_LOGGEDIN:
            case appActions.USER_CREATED:
                if (auth) {
                    // TODO user ApplePay/Google
                    // dispatch(actions.getUserCards({auth}));
                    dispatch(actions.getUserAccountInfo({auth}));
                }
                break;

            case appActions.ORDER_IS_CANCELLED:
            case appActions.CANCELLING_ORDER_ERROR:
            case appActions.ORDER_IS_REMOVED:
            case appActions.REMOVING_ORDER_ERROR:
            case appActions.ORDER_IS_PAID:
                var {resetClientAppState} = action;
                if (resetClientAppState) {
                    dispatch(actions.appResetAction());
                } else {
                    if(auth) {
                        dispatch(actions.getUserOrders({auth}));
                    }
                }
                break;

            case appActions.DELETING_USER_CARD_ERROR:
            case appActions.CREATE_USER_CARD_ERROR:
            case appActions.USER_CARD_CREATED:
            case appActions.USER_CARD_DELETED:
                var {resetClientAppState} = action;
                if (resetClientAppState) {
                    dispatch(actions.appResetAction());
                } else {
                    if (auth) {
                        dispatch(actions.getUserCards({auth}));
                        dispatch(actions.getUserAccountInfo({auth}));
                    }
                }
                break;

            case appActions.APP_RESET:
                persistStore(store).purge();
                break;

            case appActions.GETTING_AUTHORIZED_SHOPS_ERROR:
                dispatch(actions.appResetAction());
                dispatch(actions.refetchAuthorizedShops());
                break;


            case appActions.PAYING_FOR_ORDER_ERROR:
            case appActions.LOGIN_USER_ERROR:
            case appActions.LOGOUT_USER_ERROR:
            case appActions.CREATE_USER_ERROR:
            case appActions.CREATE_REMOTE_USER_ERROR:
            case appActions.CHARGE_USER_CARD_ERROR:
            case appActions.CHARGE_NONCE_ERROR:
            case appActions.GETTING_USER_ORDERS_ERROR:
            case appActions.GETTING_USER_CARDS_ERROR:
            case appActions.DELETING_USER_ERROR:
            case appActions.RESET_PASSWORD_REQUEST_ERROR:
            case appActions.GETTING_USER_ACCOUNT_INFO_ERROR:
            case appActions.UPDATE_REMOTE_USER_ERROR:
            case appActions.GETTING_SHOP_CATEGORIES_ERROR:
            case appActions.EMAIL_VALIDATE_RESEND_REQUEST_ERROR:
            case appActions.PLACING_NEW_ORDER_ERROR:
                debugger;
                if (action.error && action.error.resetClientAppState) {
                    dispatch(actions.appResetAction());
                    dispatch(actions.refetchAuthorizedShops());
                }
                break;

            case appActions.GOT_AUTHORIZED_SHOPS:
                const {shops,resetClientAppState} = action;
                if (shops && shops.length && !resetClientAppState) {
                    shops.forEach(shop => {
                      dispatch(actions.getShopCategories({shopId: shop.remoteId}));
                      dispatch(actions.getShopImgConfig({shopId: shop.remoteId}));
                    });
                } else {
                    dispatch(actions.appResetAction());
                }

                break;
        }
    });

    return next(action);
}