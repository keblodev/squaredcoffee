import React, { Component } from 'react';
import { View, ScrollView, FlatList, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StoreListItem from './storelistitem';

import AppActions from '../../actions';

const staticImagesBullShit = [
	//TODO: images should come from uri
	//TODO: cache remote images
	require('../../statics/images/shops/0.jpg'),
	require('../../statics/images/shops/1.jpg'),
]

class StoreSelect extends Component {
	actionCb = shopId => this.props.actions.selectShop(shopId);

	render = () => {
		const { navigate } = this.props.navigation;
		return (
			<View
				style={styles.container}>
					<ScrollView
						scrollEnabled={false}
						centerContent={true}
					>
						{
							this.props.shops.ids.map((shopId, key) => {
								const shop = this.props.shops.byId[shopId];
								if (shop) {
									//TODO: fetch or get from cache imges here
									const shopImg = staticImagesBullShit[shopId];

									return (
										<StoreListItem
											key={key}
											actionCb={this.actionCb.bind(this, shopId)}
											shop={shop}
											shopId={shopId}
											shopImg={shopImg}
											navigate={navigate}
										/>
									);
								} else {
									return null;
								}
							})
						}
					</ScrollView>
			</View>
		);
	}
};

const mapState = ({shops}) => ({shops});

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(StoreSelect)

const styles = {
	container: {
		alignItems: 		'center',
		backgroundColor: 	'#1f232b',
		flex: 				1,
		justifyContent: 	'center',
	},

	cardStyle: {
		backgroundColor: 	'#41495a',
		height: 			200,
		width: 				'100%'
    }
};
