
import appActions from '../../statics/actions';

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
                if (auth) {
                    dispatch(actions.getUserAccountInfo({auth}));
                }
            case appActions.USER_LOGGEDIN:
            case appActions.USER_CREATED:
                if (auth) {
                    dispatch(actions.getUserCards({auth}));
                    dispatch(actions.getUserAccountInfo({auth}));
                }
                break;

            case appActions.DELETING_USER_CARD_ERROR:
            case appActions.CREATE_USER_CARD_ERROR:
            case appActions.USER_CARD_CREATED:
            case appActions.USER_CARD_DELETED:
                if (auth) {
                    dispatch(actions.getUserCards({auth}));
                    dispatch(actions.getUserAccountInfo({auth}));
                }
                break;

            case appActions.GOT_AUTHORIZED_SHOPS:
                const {shops} = action;
                shops
                && shops.length
                && shops.forEach(shop => dispatch(actions.getShopCategories({shopId: shop.remote_id})))

                break;
        }
    });

    return next(action);
}