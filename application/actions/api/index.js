import * as types from '../../statics/actions/api';

import {BASE_URL} from '../../statics/configs';

const baseUrl = BASE_URL;

const createUser = userConfig => {

	return dispatch => {
		dispatch({ type: types.CREATE_USER, userConfig });

		return fetch(baseUrl + '/signup', {
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

		return fetch(baseUrl + '/signup_remote', {
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

const loginUser = loginConfig => {

	return dispatch => {
		dispatch({ type: types.LOGIN_USER, loginConfig });
        let cookie = '';
		return fetch(baseUrl + '/login',{
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

const userRemoteCreated = auth => ({ type: types.REMOTE_USER_CREATED, auth });
const userCreated = auth => ({ type: types.USER_CREATED, auth });
const userLoggedIn = auth => ({ type: types.USER_LOGGEDIN, auth });
const userCardCreated = card => ({ type: types.USER_CARD_CREATED, card });

const createUserError = error => ({type: types.CREATE_USER_ERROR, error});
const userRemoteCreateError = error => ({type: types.CREATE_REMOTE_USER_ERROR, error});
const userLoginError = error => ({type: types.LOGIN_USER_ERROR, error});
const userLogOutError = error => ({type: types.LOGOUT_USER_ERROR, error});
const chargeNonceError = error => ({type: types.CHARGE_NONCE_ERROR, error});
const chargeUserCardError = error => ({type: types.CHARGE_USER_CARD_ERROR, error});
const createUserCardError = error => ({type: types.CREATE_USER_CARD_ERROR, error});

const logoutUserError = error => ({type: types.LOGOUT_USER_ERROR, error});


const userCardCharged = success => ({ type: types.USER_CARD_CHARGED, success })
const nonceCharged = success => ({ type: types.NONCE_CHARGED, success })

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

		return fetch(baseUrl + '/logout', {
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

const userLoggedOut = (message = {}) => ({ type: types.USER_LOGGEDOUT, message });

export default {
    createUser,
    createRemoteUser,
	loginUser,
	createUserCard,
	logoutUser,
	chargeUserCard,
	chargeNonce
};
