
const drinksImgs = [
	//TODO: images should come from uri
	//TODO: cache remote images
	[
		require('../../../statics/images/shopscontent/0/drinks/0.jpg'),
		require('../../../statics/images/shopscontent/0/drinks/1.jpg'),
		require('../../../statics/images/shopscontent/0/drinks/2.jpg'),
		require('../../../statics/images/shopscontent/0/drinks/3.jpg'),
	],
	[
		require('../../../statics/images/shopscontent/1/drinks/0.jpg'),
		require('../../../statics/images/shopscontent/1/drinks/1.jpg'),
		require('../../../statics/images/shopscontent/1/drinks/2.jpg'),
		require('../../../statics/images/shopscontent/1/drinks/3.jpg'),
	]
];

export default [
	[
		{
			id: 	0,
			title: 	'Americano',
			desc: 	'Your default choice',
			price:	'2.00',
			currency: 'USD',
			img:	drinksImgs[0][0]
		},
		{
			id: 1,
			title: 'Macchiato',
			desc: 'Your second choice',
			price:	'2.50',
			currency: 'USD',
			img:	drinksImgs[0][1]
		},
		{
			id: 2,
			title: 'Latte',
			desc: 'I would not mind',
			price:	'2.75',
			currency: 'USD',
			img:	drinksImgs[0][2]
		},
		{
			id: 3,
			title: 'Affogato',
			desc: 'Ice cream in coffee, or coffee in Icecream',
			price:	'3.40',
			currency: 'USD',
			img:	drinksImgs[0][3]
		}
	],
	[
		{
			id: 	0,
			title: 	'Italiano',
			desc: 	'Your default choice',
			price:	'2.00',
			currency: 'USD',
			img:	drinksImgs[1][0]
		},
		{
			id: 1,
			title: 'Laviatto',
			desc: 'Your second choice',
			price:	'2.50',
			currency: 'USD',
			img:	drinksImgs[1][1]
		},
		{
			id: 2,
			title: 'Uluwatte',
			desc: 'I would not mind',
			price:	'2.75',
			currency: 'USD',
			img:	drinksImgs[1][2]
		},
		{
			id: 3,
			title: 'GatoAffo',
			desc: 'Ice cream in coffee, or coffee in Icecream',
			price:	'3.40',
			currency: 'USD',
			img:	drinksImgs[1][3]
		}
	]
];