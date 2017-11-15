
import appActions from '../../../statics/actions';

import {BASE_URL, CLOVER_IMG_ROUTE} from '../../../statics/configs';

const __handleSuccessError = function(response){
    return response.status !== 200 ? response.json().then(Promise.reject) : response.json();
}

// 1.
const getConfig = (route = CLOVER_IMG_ROUTE) => {
    return dispatch => {
        dispatch({ type: appActions.GETTING_CONFIGS });

        return fetch(`${BASE_URL}/shops/clover/config/remote`)
                .then(__handleSuccessError)
                .then(json => dispatch(gotConfig(json.data)))
                .then(data => {console.log(data)})
                .catch(error => dispatch(gettingConfigError(error)))
    };
}

const gotConfig            = ({data}) => ({type: appActions.GOT_CONFIGS, data});
const gettingConfigError   = error => ({type: appActions.GETTING_CONFIGS_ERROR, error});

// 2.
const getAuthorizedShops = () => {
    return dispatch => {
        dispatch({ type: appActions.GETTING_AUTHORIZED_SHOPS });

        return fetch(`${BASE_URL}/shops/clover`)
                .then(__handleSuccessError)
                .then(json => dispatch(gotAuthorizedShops(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(gettingAuthorizedShopsError(error)))
    };
}

const gotAuthorizedShops            = ({shops}) => ({type: appActions.GOT_AUTHORIZED_SHOPS, shops});
const gettingAuthorizedShopsError   = error => ({type: appActions.GETTING_AUTHORIZED_SHOPS_ERROR, error});

// 3.
const getShopCategories = ({shopId}) => {
    return dispatch => {
        dispatch({ type: appActions.GETTING_SHOP_CATEGORIES });

        return fetch(`${BASE_URL}/shops/clover/${shopId}/categories`)
                .then(__handleSuccessError)
                .then(json => dispatch(gotShopCategories(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(gettingShopCategoriesError(error)))
    };
}

const gotShopCategories            = ({data, id}) => ({type: appActions.GOT_SHOP_CATEGORIES, data, id});
const gettingShopCategoriesError   = error => ({type: appActions.GETTING_SHOP_CATEGORIES_ERROR, error});

// 3.
const placeNewOrder = ({userConfig, order, shopId, isDriveThrough}) => {
    return dispatch => {

        console.log("SENDING ORDER FOR SHOP: " + shopId);
        console.log(order);

        dispatch({ type: appActions.PLACING_NEW_ORDER });

        return fetch(`${BASE_URL}/shops/clover/${shopId}/order/new`,{
                    method: 'POST',
                    body: JSON.stringify({...userConfig, order, isDriveThrough}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => dispatch(gotOrderPlaced(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(placingNewOrderError(error)))
    };
}

const gotOrderPlaced        = ({order}) => ({type: appActions.GOT_NEW_ORDER_PLACED, order});
const placingNewOrderError  = error => ({type: appActions.PLACING_NEW_ORDER_ERROR, error});

const getUserOrders = ({auth}) => {
    return dispatch => {
        dispatch({ type: appActions.GETTING_USER_ORDERS });

        return fetch(`${BASE_URL}/user/shop/clover/orders`, {
            method: 'POST',
            body: JSON.stringify({token: auth.token}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
                .then(__handleSuccessError)
                .then(json => dispatch(gotUserOrders(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(gettingUserOrdersError(error)))
    };
};

const gotUserOrders             = ({orders}) => ({type: appActions.GOT_USER_ORDERS, orders});
const gettingUserOrdersError    = error => ({type: appActions.GETTING_USER_ORDERS_ERROR, error});

export default {
    getConfig,
    getAuthorizedShops,
    getShopCategories,
    placeNewOrder,
    getUserOrders,
}