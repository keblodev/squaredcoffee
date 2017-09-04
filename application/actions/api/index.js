import * as types from '../../statics/actions/api';

import {BASE_URL} from '../../statics/configs';

const baseUrl = BASE_URL;

const createUser = userConfig => {
    return dispatch => {
        dispatch({ type: types.CREATE_USER, userConfig });

        return fetch(baseUrl + '/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({...userConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(json => dispatch(userCreated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(createUserError(error)))
	};
};

const createRemoteUser = remoteUserConfig => {

    return dispatch => {
        dispatch({ type: types.CREATE_REMOTE_USER, remoteUserConfig });

        return fetch(baseUrl + '/user/signup_remote', {
                    method: 'POST',
                    body: JSON.stringify({...remoteUserConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(json => dispatch(userRemoteCreated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(userRemoteCreateError(error)))
	};
};

const updateRemoteUser = remoteUserConfig => {

    return dispatch => {
        dispatch({ type: types.UPDATE_REMOTE_USER, remoteUserConfig });

        return fetch(baseUrl + '/user/update_remote', {
                    method: 'POST',
                    body: JSON.stringify({...remoteUserConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(json => dispatch(userRemoteUpdated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(userRemoteUpdateError(error)))
	};
};

const loginUser = loginConfig => {
    return dispatch => {
        dispatch({ type: types.LOGIN_USER, loginConfig });
        let cookie = '';
        return fetch(baseUrl + '/user/login',{
                    method: 'POST',
                    body: JSON.stringify({...loginConfig}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    //todo
                    //cookie = response.headers.map['set-cookie'];
                    return response.json();
                })
                .then(json => dispatch(userLoggedIn(
                    json.data,
                    //  cookie
                    )))
                .then(data => console.log(data))
                .catch(error => dispatch(createUserError(error)))
	};
};

const createUserCard = ({nonce, auth}) => {
    return dispatch => {
        dispatch({ type: types.CREATE_USER_CARD, nonce });

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
                .then(response => response.json())
                .then(json => dispatch(userCardCreated(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(createUserCardError(error)))
    };
};

const getUserCards = ({auth}) => {
    return dispatch => {
        dispatch({ type: types.GET_USER_CARDS });

        return fetch(baseUrl + '/cards', {
            method: 'POST',
            body: JSON.stringify({token: auth.token}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
                .then(response => response.json())
                .then(json => dispatch(gotUserCards(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(gettingtUserCardsError(error)))
    };
};

const getUserAccountInfo = ({auth}) => {
    return dispatch => {
        dispatch({ type: types.GET_USER_ACCOUNT_INFO });

        return fetch(baseUrl + '/user/info', {
            method: 'POST',
            body: JSON.stringify({token: auth.token}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
                .then(response => response.json())
                .then(json => dispatch(gotUserAccountInfo(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(gettingUserAccountInfoError(error)))
    };
}

const deleteUserCard = ({cardRemoteId, auth}) => {
    return dispatch => {
        dispatch({ type: types.DELETE_USER_CARD, cardRemoteId });

        return fetch(baseUrl + '/card/delete', {
            method: 'POST',
            body: JSON.stringify({remote_card_id: cardRemoteId, token: auth.token}),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
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
    dispatch({ type: types.CHARGE_USER_CARD });

    return fetch(baseUrl + '/card/charge', {
        method: 'POST',
        body: JSON.stringify({customer_card_id: card.id, token: auth.token}),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(json =>
            dispatch(userCardCharged(json))
        )
        .then(data => console.log(data))
        .catch(error => dispatch(chargeUserCardError(error)));
};

const chargeNonce = ({nonce}) => dispatch => {
    dispatch({ type: types.CHARGE_NONCE });

    return fetch(baseUrl + '/charge', {
        method: 'POST',
        body: JSON.stringify({nonce}),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(json =>
            dispatch(nonceCharged(json))
    )
        .catch(error => dispatch(chargeNonceError(error)));
};

const logoutUser = () => {
    return dispatch => {
        dispatch({ type: types.LOGOUT_USER, user });

        return fetch(baseUrl + '/user/logout', {
                    method: 'POST',
                    body: JSON.stringify({...user}),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(json => dispatch(userLoggedOut(json.data)))
                .then(data => console.log(data))
                .catch(error => dispatch(logoutUserError(error)));
	};
}

const userRemoteCreated             = remoteResponse => ({ type: types.REMOTE_USER_CREATED, remoteResponse });
const userRemoteUpdated             = remoteResponse => ({ type: types.REMOTE_USER_UPDATED, remoteResponse });
const userCreated                   = auth => ({ type: types.USER_CREATED, auth });
const userLoggedIn                  = auth => ({ type: types.USER_LOGGEDIN, auth });
const userCardCreated               = card => ({ type: types.USER_CARD_CREATED, card });

const createUserError               = error => ({type: types.CREATE_USER_ERROR, error});
const userRemoteCreateError         = error => ({type: types.CREATE_REMOTE_USER_ERROR, error});
const userRemoteUpdateError         = error => ({type: types.UPDATE_REMOTE_USER_ERROR, error});
const userLoginError                = error => ({type: types.LOGIN_USER_ERROR, error});
const userLogOutError               = error => ({type: types.LOGOUT_USER_ERROR, error});
const chargeNonceError              = error => ({type: types.CHARGE_NONCE_ERROR, error});
const chargeUserCardError           = error => ({type: types.CHARGE_USER_CARD_ERROR, error});
const createUserCardError           = error => ({type: types.CREATE_USER_CARD_ERROR, error});

const logoutUserError               = error => ({type: types.LOGOUT_USER_ERROR, error});

const deletingUserCardError         = error => ({type: types.DELETING_USER_CARD_ERROR, error});
const deletingUserError             = error => ({type: types.DELETING_USER_ERROR, error});
const gettingtUserCardsError        = error => ({type: types.GETTING_USER_CARDS_ERROR, error});
const gettingUserAccountInfoError   = cards => ({type: types.GETTING_USER_ACCOUNT_INFO_ERROR, cards});

const gotUserCards                  = cards             => ({type: types.GOT_USER_CARDS, cards});
const gotUserAccountInfo            = accountInfo       => ({type: types.GOT_USER_ACCOUNT_INFO, accountInfo});
const deletedUser                   = ()                => ({type: types.DELETED_USER});
const userCardCharged               = success           => ({ type: types.USER_CARD_CHARGED, success })
const userCardDeleted               = success           => ({ type: types.USER_CARD_DELETED, success })
const nonceCharged                  = success           => ({ type: types.NONCE_CHARGED, success })
const userLoggedOut                 = (message = {})    => ({ type: types.USER_LOGGEDOUT, message });

export default {
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
    chargeNonce
};
