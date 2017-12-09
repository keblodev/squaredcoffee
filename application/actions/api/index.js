import cloverApi from './clover';

import appActions from '../../statics/actions';
import {BASE_URL} from '../../statics/configs';

const baseUrl = BASE_URL;

const __handleSuccessError = function(response){
    return response.status !== 200 ? response.json().then(Promise.reject) : response.json();
}

const createUser = userConfig => {
    return dispatch => {
        dispatch({ type: appActions.CREATE_USER, userConfig });

        return fetch(baseUrl + '/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({...userConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => dispatch(userCreated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(createUserError(error)))
	};
};

const createRemoteUser = remoteUserConfig => {

    return dispatch => {
        dispatch({ type: appActions.CREATE_REMOTE_USER, remoteUserConfig });

        return fetch(baseUrl + '/user/signup_remote', {
                    method: 'POST',
                    body: JSON.stringify({...remoteUserConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => dispatch(userRemoteCreated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(userRemoteCreateError(error)))
	};
};

const updateRemoteUser = remoteUserConfig => {

    return dispatch => {
        dispatch({ type: appActions.UPDATE_REMOTE_USER, remoteUserConfig });

        return fetch(baseUrl + '/user/update_remote', {
                    method: 'POST',
                    body: JSON.stringify({...remoteUserConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => dispatch(userRemoteUpdated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(userRemoteUpdateError(error)))
	};
};

const loginUser = loginConfig => {
    return dispatch => {
        dispatch({ type: appActions.LOGIN_USER, loginConfig });
        let cookie = '';
        return fetch(baseUrl + '/user/login',{
                    method: 'POST',
                    body: JSON.stringify({...loginConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => {
                    return dispatch(userLoggedIn(
                            json.data,
                        //  cookie
                        ))
                })
                .then(data => console.log(data))
                .catch(({error}) => {
                    return dispatch(userLoginError(error))
                })
	};
};

const userLoginError    = error => ({type: appActions.LOGIN_USER_ERROR, error});

const createUserCard = ({nonce, auth}) => {
    return dispatch => {
        dispatch({ type: appActions.CREATE_USER_CARD, nonce });

        return fetch(baseUrl + '/card/new', {
            method: 'POST',
            body: JSON.stringify({nonce, token: auth.token}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                //todo
                'Cookie': auth.cookie && auth.cookie[0]
            },
        })
                .then(__handleSuccessError)
                .then(json => dispatch(userCardCreated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(createUserCardError(error)))
    };
};

const getUserCards = ({auth}) => {
    return dispatch => {
        dispatch({ type: appActions.GET_USER_CARDS });

        return fetch(baseUrl + '/cards', {
            method: 'POST',
            body: JSON.stringify({token: auth.token}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
                .then(__handleSuccessError)
                .then(json => dispatch(gotUserCards(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(gettingtUserCardsError(error)))
    };
};

const getUserAccountInfo = ({auth}) => {
    return dispatch => {
        dispatch({ type: appActions.GET_USER_ACCOUNT_INFO });

        return fetch(baseUrl + '/user/info', {
            method: 'POST',
            body: JSON.stringify({token: auth.token}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(__handleSuccessError)
        .then(json => dispatch(gotUserAccountInfo(json.data)))
        .then(data => console.log(data))
        .catch(error => dispatch(gettingUserAccountInfoError(error)))
    };
}

const gotUserAccountInfo   = accountInfo    => ({type: appActions.GOT_USER_ACCOUNT_INFO, accountInfo});


const deleteUserCard = ({cardRemoteId, auth}) => {
    return dispatch => {
        dispatch({ type: appActions.DELETE_USER_CARD, cardRemoteId });

        return fetch(baseUrl + '/card/delete', {
            method: 'POST',
            body: JSON.stringify({remote_card_id: cardRemoteId, token: auth.token}),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(__handleSuccessError)
            .then(json =>
                dispatch(userCardDeleted(json))
            )
            .then(data => console.log(data))
            .catch(error => dispatch(deletingUserCardError(error)))
    };
};

// todo
// const deleteUser

const chargeUserCard = ({auth, card}) => dispatch => {
    dispatch({ type: appActions.CHARGE_USER_CARD });

    return fetch(baseUrl + '/card/charge', {
        method: 'POST',
        body: JSON.stringify({customer_card_id: card.id, token: auth.token}),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(__handleSuccessError)
        // .then((json)=>{
        //     const ok = new Promise((resolve, reject) => {
        //         setTimeout(()=> {
        //             resolve(json);
        //         }, 1000)
        //     });
        //     return ok
        // })
        .then(json =>dispatch(userCardCharged(json)))
        .then(data => console.log(data))
        .catch(({error}) => dispatch(chargeUserCardError(error)));
};

const chargeNonce = ({nonce}) => dispatch => {
    dispatch({ type: appActions.CHARGE_NONCE });

    return fetch(baseUrl + '/charge', {
        method: 'POST',
        body: JSON.stringify({nonce}),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(__handleSuccessError)
        .then(json =>
            dispatch(nonceCharged(json))
    )
        .catch(({error}) => dispatch(chargeNonceError(error)));
};

const logoutUser = () => {
    return dispatch => {
        dispatch({ type: appActions.LOGOUT_USER, user });

        return fetch(baseUrl + '/user/logout', {
                    method: 'POST',
                    body: JSON.stringify({...user}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => dispatch(userLoggedOut(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(logoutUserError(error)));
	};
}

const userRemoteCreated             = remoteResponse => ({ type: appActions.REMOTE_USER_CREATED, remoteResponse });
const userRemoteUpdated             = remoteResponse => ({ type: appActions.REMOTE_USER_UPDATED, remoteResponse });
const userCreated                   = auth => ({ type: appActions.USER_CREATED, auth });
const userLoggedIn                  = auth => ({ type: appActions.USER_LOGGEDIN, auth });
const userCardCreated               = card => ({ type: appActions.USER_CARD_CREATED, card });

const createUserError               = error => ({type: appActions.CREATE_USER_ERROR, error});
const userRemoteCreateError         = error => ({type: appActions.CREATE_REMOTE_USER_ERROR, error});
const userRemoteUpdateError         = error => ({type: appActions.UPDATE_REMOTE_USER_ERROR, error});
const userLogOutError               = error => ({type: appActions.LOGOUT_USER_ERROR, error});
const chargeNonceError              = error => ({type: appActions.CHARGE_NONCE_ERROR, error});
const chargeUserCardError           = error => ({type: appActions.CHARGE_USER_CARD_ERROR, error});
const createUserCardError           = error => ({type: appActions.CREATE_USER_CARD_ERROR, error});

const logoutUserError               = error => ({type: appActions.LOGOUT_USER_ERROR, error});

const deletingUserCardError         = error => ({type: appActions.DELETING_USER_CARD_ERROR, error});
const deletingUserError             = error => ({type: appActions.DELETING_USER_ERROR, error});
const gettingtUserCardsError        = error => ({type: appActions.GETTING_USER_CARDS_ERROR, error});
const gettingUserAccountInfoError   = cards => ({type: appActions.GETTING_USER_ACCOUNT_INFO_ERROR, cards});

const gotUserCards                  = cards             => ({type: appActions.GOT_USER_CARDS, cards});
const deletedUser                   = ()                => ({type: appActions.DELETED_USER});
const userCardCharged               = success           => ({ type: appActions.USER_CARD_CHARGED, success })
const userCardDeleted               = success           => ({ type: appActions.USER_CARD_DELETED, success })
const nonceCharged                  = success           => ({ type: appActions.NONCE_CHARGED, success })
const userLoggedOut                 = (message = {})    => ({ type: appActions.USER_LOGGEDOUT, message });


const updateUser = ({userConfig, config}) => {
    return dispatch => {

        dispatch({ type: appActions.UPDATING_USER});

        return fetch(`${BASE_URL}/user/update/me`, {
            method: 'POST',
            body: JSON.stringify({...userConfig, config}),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(__handleSuccessError)
        .then(json => dispatch(userUpdated(json.data || json)))
        .then(data => console.log(data))
        .catch(error => dispatch(updatingUserError(error)))
    };
}

const userUpdated            = ({user, staged}) => ({type: appActions.USER_UPDATED, user, staged});
const updatingUserError      = error => ({type: appActions.UPDATING_USER_ERROR, error});

const requestPasswordReset = ({userConfig}) => {
    return dispatch => {
        dispatch({ type: appActions.RESET_PASSWORD_REQUEST});
        return fetch(`${BASE_URL}/user/password/reset`,{
                    method: 'POST',
                    body: JSON.stringify({...userConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => {
                    console.log(json);
                    return dispatch(passwordResetRequest(json))
                })
                .then(data => console.log(data))
                .catch((error) => dispatch(passwordResetError(error)))
	};
};

const passwordResetRequest  = message => ({ type: appActions.RESET_PASSWORD_REQUEST_SUCCESS, message});
const passwordResetError    = error   => ({ type: appActions.RESET_PASSWORD_REQUEST_ERROR, error});

const requestPasswordForgot = ({formConfig}) => {
    return dispatch => {
        dispatch({ type: appActions.RESET_PASSWORD_REQUEST});
        return fetch(`${BASE_URL}/user/password/forgot`,{
                    method: 'POST',
                    body: JSON.stringify({...formConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => {
                    console.log(json);
                    return dispatch(passwordForgotRequest(json))
                })
                .then(data => console.log(data))
                .catch((error) => dispatch(passwordForgotError(error)))
	};
};

const passwordForgotRequest  = message => ({ type: appActions.RESET_PASSWORD_REQUEST_SUCCESS, message});
const passwordForgotError    = error   => ({ type: appActions.RESET_PASSWORD_REQUEST_ERROR, error});

const requestEmailValidateResend = ({userConfig}) => {
    return dispatch => {
        dispatch({ type: appActions.EMAIL_VALIDATE_RESEND_REQUEST});
        return fetch(`${BASE_URL}/user/email/validate/resend`,{
                    method: 'POST',
                    body: JSON.stringify({...userConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(__handleSuccessError)
                .then(json => {
                    console.log(json);
                    return dispatch(validateResendRequested(json))
                })
                .then(data => console.log(data))
                .catch((error) => dispatch(validateResendError(error)))
	};
};

const validateResendRequested  = message => ({ type: appActions.VALIDATION_EMAIL_RESENT, message});
const validateResendError    = error   => ({ type: appActions.EMAIL_VALIDATE_RESEND_REQUEST_ERROR, error});


export default {
    ...cloverApi,
    createUser,
    createRemoteUser,
    updateRemoteUser,
    getUserAccountInfo,
    loginUser,
    getUserCards,
    createUserCard,
    deleteUserCard,
    logoutUser,
    chargeUserCard,
    chargeNonce,
    updateUser,
    requestPasswordReset,
    requestPasswordForgot,
    requestEmailValidateResend,
};
