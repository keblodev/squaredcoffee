import api              from './api';
import * as sync        from './sync';
import * as geo         from './geo';
import * as user        from './user';
import * as shops       from './shops';
import * as cart        from './cart';
import * as order       from './order';

export const APP_TEST_ACTION = 'APP_TEST_ACTION';
export const APP_TEST_ACTION_DVA = 'APP_TEST_ACTION_DVA';

//NAV
export const NAV_NAVIGATE = 'Navigation/NAVIGATE';
export const NAV_BACK = 'Navigation/BACK';

//WEBVIEWS
export const WEBVIEW_CHEKOUT_MESSAGE_IN='WEBVIEW_CHEKOUT_MESSAGE_IN';
export const WEBVIEW_CHEKOUT_MESSAGE_OUT='WEBVIEW_CHEKOUT_MESSAGE_OUT';
export const WEBVIEW_CHEKOUT_CLEAN_QUE='WEBVIEW_CHEKOUT_CLEAN_QUE';
export const RECEIVED_USER_CARD_NONCE='RECEIVED_USER_CARD_NONCE';

//PAYMENTS
export const PERSIST_PAYMENT_METHOD='PERSIST_PAYMENT_METHOD';
export const PAYMENT_CREATE_NEW='PAYMENT_CREATE_NEW';
export const PAYMENT_BY_CARD='PAYMENT_BY_CARD';
export const PAYMENT_BY_NONCE='PAYMENT_BY_NONCE';
export const PAYMENT_PENDING='PAYMENT_PENDING';
export const PAYMENT_SUCCESS='PAYMENT_SUCCESS';
export const PAYMENT_FAILED='PAYMENT_FAILED';
export const PAYMENT_UPDATE='PAYMENT_UPDATE';
export const RESET_PAYMENT_INSTRUMENT='RESET_PAYMENT_INSTRUMENT';

//NOTIFICATIONS
export const PUSH_NOTIFY='PUSH_NOTIFY';
export const SHOW_NOTIFY='SHOW_NOTIFY';
export const HIDE_NOTIFY='HIDE_NOTIFY';

//CHECKOUT
export const SHOW_CHECKOUT_FORM='SHOW_CHECKOUT_FORM';
export const HIDE_CHECKOUT_FORM='HIDE_CHECKOUT_FORM';

export const NONE = null;

export default {
    ...api,
    ...user,
    ...geo,
    ...sync,
    ...shops,
    ...cart,
    ...order,
    NAV_BACK,
    NAV_NAVIGATE,
    NONE,
}