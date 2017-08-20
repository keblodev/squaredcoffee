import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button'

import About from '../about';
import Drinks from '../drinks';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import {GEO_ACTIVE} from '../../statics/strings/geo';

import HomeListItem from './homelistitem';

const staticImagesBullShit = [
	//TODO: images should come from uri
	//TODO: cache remote images
	[
		require('../../statics/images/shopscontent/0/home/about.jpg'),
		require('../../statics/images/shopscontent/0/home/drinks.jpg'),
		require('../../statics/images/shopscontent/0/home/food.jpg'),
	],
	[
		require('../../statics/images/shopscontent/1/home/about.jpg'),
		require('../../statics/images/shopscontent/1/home/drinks.jpg'),
		require('../../statics/images/shopscontent/1/home/food.jpg'),
	]
];

class Home extends Component {

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.title}`,
	})

	handleLoginLogout(isLoggedIn) {
		if (isLoggedIn) {
			this.props.actions.logoutUser();
		} else {
			//TODO: this currently signs up
			this.props.actions.createUser({some: 'config'})
				.then(response => console.log(response))
		}
	}

	handleGeoStartStop(isGeoActive) {
		if (isGeoActive) {
			this.props.actions.stopGeo();
		} else {
			this.props.actions.startGeo();
		}
	}

	render = () => {
		const { navigate } = this.props.navigation;
		const { shopId } = this.props.navigation.state.params;
		const isLoggedIn = !!this.props.user.auth;
		const isGeoActive = this.props.geoStatus === GEO_ACTIVE
		return (
			<View style={styles.container}>
				<ScrollView
					scrollEnabled={false}
					centerContent={true}
				>
					<HomeListItem
						shopImg={staticImagesBullShit[shopId][0]}
						navToRouteId='About'
						navRouteTitle='About Us'
						navigate={navigate}
					/>
					<HomeListItem
						shopImg={staticImagesBullShit[shopId][1]}
						navToRouteId='Drinks'
						navRouteTitle='Coffee?'
						navigate={navigate}
					/>
					<HomeListItem
						disabled={true}
						shopImg={staticImagesBullShit[shopId][2]}
						navToRouteId='Foods'
						navRouteTitle='Something to eat'
						navigate={navigate}
					/>
				</ScrollView>
				<Button
					style={styles.buttonStyle}
					onPress={() =>
						navigate('Checkout', { name: 'Jane' })
					}
				>
					Checkout
				</Button>

				<Button
					style={styles.buttonStyle}
					onPress={this.handleLoginLogout.bind(this, isLoggedIn)}
				>
					{ isLoggedIn ? 'LogOut' : 'SignIn'}
				</Button>
				<Button
					style={styles.buttonStyle}
					onPress={this.handleGeoStartStop.bind(this, isGeoActive)}
				>
					{ isGeoActive ? 'StopGeo' : 'StartGeo'}
				</Button>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		user: 		state.user,
		geoStatus: 	state.geo.status
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(Home)

const buttonStyle = {
		padding:20,
		margin: 10,
		height:65,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: '#41495a',
		fontSize: 20,
		color: 'grey',
    };

const styles = StyleSheet.create({
	container: {
		alignItems: 		'center',
		backgroundColor: 	'#1f232b',
		flex: 				1,
		justifyContent: 	'center',
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#313744',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
});
