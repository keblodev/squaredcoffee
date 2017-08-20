import * as types from '../../statics/actions/api';

const baseUrl = 'https://superroman.localtunnel.me'

const createUser = userConfig => {

	return dispatch => {
		dispatch({ type: types.CREATE_USER, userConfig });

		return fetch(baseUrl + '/signup')
				.then(response => response.json())
				.then(json => dispatch(userCreated(json.data)))
	};
};

const userCreated = auth => ({ type: types.CREATED_USER, auth });
const userCardCreated = card => ({ type: types.CREATED_USER_CARD, card });

const createUserCard = ({nonce, auth}) => {

	return dispatch => {
		dispatch({ type: types.CREATE_USER_CARD, nonce });

		return fetch(baseUrl + '/card/new', {
			method: 'POST',
			body: JSON.stringify({nonce, token: auth.token}),
			headers: { 'Content-Type': 'application/json' },
		})
				.then(response => response.json())
				.then(json => dispatch(userCardCreated(json.data)))
	};
};

const purchaseSuccess = success => ({ type: types.PURCHASE_SUCCESS, success});
const purchaseFail = error => ({ type: types.PURCHASE_ERROR, error});

const chargeUserCard = ({auth, card}) => dispatch => {
	dispatch({ type: types.CHARGE_USER_CARD });

	return fetch(baseUrl + '/card/charge', {
		method: 'POST',
		body: JSON.stringify({customer_card_id: card.id, token: auth.token}),
		headers: { 'Content-Type': 'application/json' },
	})
		.then(response => response.json())
		.then(json => dispatch(purchaseSuccess(json)))
};

const chargeNonce = ({nonce}) => dispatch => {
	dispatch({ type: types.CHARGE_NONCE });

	return fetch(baseUrl + '/charge', {
		method: 'POST',
		body: JSON.stringify({nonce}),
		headers: { 'Content-Type': 'application/json' },
	})
		.then(response => response.json())
		.then(json => dispatch(purchaseSuccess(json)))
};

const logoutUser = () => ({ type: types.LOGOUT_USER})

export default {
	createUser,
	createUserCard,
	logoutUser,
	chargeUserCard,
	chargeNonce
};
