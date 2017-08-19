
//TODO: interate on shema here
/**
 *
	const shopInitialState = {
		id,
		name: 		'Awosome Shop1',
		desc:		'bestt shop, best coffee 1',
		address: 	'Neat Street NE, Portland, 98152, OR',
		coverImg:	URL,
		lat:		'0.11',
		lan:		'-23.233',
		timezoneOffset: 8,
		schedule:	{
			yeah: [
				{
					start: '1-1',
					end: '11-1',
					type: 'NO_BUSINESS'
				},
				{
					start: '14-2',
					end: '14-2',
					type: 'NO_BUSINESS'
				}
			],
			month: [
				{
					start: 1,
					end: 1,
					type: 'NO_BUSINESS'
				}
			],
			week: [
				{
					start: 	'Mon',
					end:	'Mon',
					type: 	'BUSINESS',
					day: 	[
						{
							range, // 10:00-24:00
							type: 'BUSINESS'
						},
					]
				},
				{
					start: 	'Tue',
					end:	'Wed',
					type: 	'BUSINESS',
					day: 	[
						{
							range, // 1:00-12:00
							type: 'BUSINESS'
						},
						{
							range, // 12:00-13:00
							type: 'NO_BUSINESS'
						},
						{
							range, // 13:00-24:00
							type: 'BUSINESS'
						}
					]
				},
				{
					start: 	'Th',
					end:	'Fr',
					type: 	'BUSINESS',
					day: [
						//...day ranges
					]
				},
				{
					start: 	'Th',
					end:	'Fr',
					type: 	'BUSINESS',
					day: [
						//...day ranges
					]
				},
				{
					start: 	'Sat',
					end:	'Sun',
					type: 	'NO_BUSINESS',
					day: [
						//...day ranges
					]
				}
			],

			day: [
				{
					start: '8:00:00 December 6th, 2017',
					end: '16:00:00 December 6th, 2017',
					type: 'BOOKING' // 'NO_BUSINESS'
				}
			]

			years: [{
				months: [{
					weeks: [{
						days: [{
							start: 'mon',
							end: 'mon'
						}]
					}],
					dates: [{
						start: '1',
						end: '1'
					}]
				}],
				dates: [{
					start: '1-12',
					end: '1-12'
				}]
			}]

		},
		products: [
			{
				id: 		0,
				name: 		'Awesome Coffee 1',
				desc:		'neat coffee blend',
				basePrice: 	'5.00',
				currency: 	'USD',
				addons:		[
					{
						id:			0,
						name:		'super topping 1',
						desc:		'best life changing topping evor 1',
						price:		'0.1'

					},
				]
			}
		]
	}
 *
*/

import {
	SHOP_SELECTED,
	SHOPS_ADDED } from '../statics/actions';


const initialState = {
	ids: 		[0,1],
	byId: 		{
		0: {
			name: 		'Awosome Shop1',
			desc:		'bestt shop, best coffee 1',

		},
		1: {
			name: 		'Awosome Shop2',
			desc:		'bestt shop, best coffee 2',
		}
	},
	selected: 	null
}

const byId = (state = initialState.byId, action) => {
	switch(action.type) {
		case SHOPS_ADDED:
			return {
				...action.shops.map((item,idx)=> {
					return {
						...item
						//TODO -> enrich here
					}
				}),
				...state
			}
		default:
			return state;
	}
}

export default shops = (state = initialState, action) => {
	switch(action.type) {
		case SHOPS_ADDED:
			const byIdNew = byId(initialState.byId);
			const idsNew = Object.keys(byIdNew);
			return {
				...state,
				byId: 	byIdNew,
				ids: 	idsNew
			}
		case SHOP_SELECTED:
			return {
				...state,
				selected: {
					shopId: action.shopId,
					...state.byId[action.shopId]
				}
			}
		default:
			return state;
	}
}