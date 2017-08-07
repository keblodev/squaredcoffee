
import { GEO_START_WATCH, GEO_END_WATCH } from '../../statics/actions/geo';

import actions from '../../actions';

class GeoOperator {

	geo = navigator.geolocation

	deltaLat 		= 10
	deltaLon 		= 10

	watchPosTimeout = 15000

	watcherId 		= null;

	getCurrent() {
		console.log('[GeoOperator] CURRENT POS REQUESTED');
		this.geo.getCurrentPosition(currPos => {
			console.log(currPos);
		},
		err => {
			console.log(err);
		});
	}

	startWatch() {
		console.log('[GeoOperator] START REQUESTED');
		this.watcherId = this.geo.watchPosition(
			newPos => {
				console.log(newPos);
				this.__notify('HEY HOW!!');
				// believe there should be
				// daily promotions fetch
				// so no need to fetch every time
				// this.__fetchRemote()
				// 	.then( res => {
				// 		const {closestShop} = res;
				// 		if (closestShop) {
				// 			/**
				// 			 * closestShow : {
				// 			 * 		geo: {lat, lon}
				// 			 * 		promotions: [
				// 			 * 			{
				// 			 * 				id,
				// 			 * 				notification,
				// 			 * 				promotionUrl
				// 			 * 			}
				// 			 * 		]
				// 			 * }
				// 			 *
				// 			*/
				// 			this.__notify(closestShop)
				// 		}
				// 	})
			},
			err => {
				console.log(err);
			},
			{
				  timeout: this.watchPosTimeout,
				  maximumAge: 500 //will reduce power consumption -> needs experimentation
			}
		)
	}

	endWatch() {
		console.log('[GeoOperator] STOP REQUESTED');
		this.geo.clearWatch(this.watcherId);
	}

	__fetchRemote(currentPos) {
		//fetch shops here
	}

	__notify(message) {
		stateAndDispatch.dispatch(actions.pushNotify(message));
	}
}

let stateAndDispatch = {};

const geoPerator = new GeoOperator();

export default store => next => action => {
	Promise.resolve().then(_=> {
		const state = store.getState();
		const dispatch = store.dispatch;
		stateAndDispatch = {state, dispatch};

		switch(action.type) {
			case GEO_START_WATCH:
				geoPerator.startWatch();
				break;
			case GEO_END_WATCH:
				geoPerator.endWatch();
				break;
		}
	});

	return next(action);
}