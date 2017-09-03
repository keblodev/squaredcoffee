import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import {GEO_ACTIVE} from '../../statics/strings/geo';
// import styles from '../../statics/styles';

class User extends Component {

	componentDidUpdate() {
		const { navigation } = this.props;
		const isLoggedIn = !!this.props.user.auth;

        if (!isLoggedIn) {
			navigation.goBack();
		}
	}

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
		const isLoggedIn = !!this.props.user.auth;
		const isGeoActive = this.props.geoStatus === GEO_ACTIVE

		return (
			<View
				style={{
					...styles.container,
					height: '100%'
				}}
			>
				{
					isLoggedIn ? (
						<View>
							<Button
								style={styles.buttonStyle}
								onPress={()=>navigate('Account')}
							>
								Account Information
							</Button>
							<Button
								style={styles.buttonStyle}
								onPress={()=>navigate('PaymentMethods')}
							>
								Payment Methods
							</Button>
						</View>
					) : null
				}
				<Button
					style={styles.buttonStyle}
					onPress={()=>navigate('Checkout')}
				>
					Cart
				</Button>
				{/* <Button
					style={styles.buttonStyle}
					onPress={this.handleGeoStartStop.bind(this, isGeoActive)}
				>
					{ isGeoActive ? 'StopGeo' : 'StartGeo'}
				</Button> */}
				<Button
					style={styles.buttonStyle}
					onPress={this.handleLoginLogout.bind(this, isLoggedIn)}
				>
					{ isLoggedIn ? 'LogOut' : 'SignIn'}
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
		connect(mapState, mapDispatch)(User)


const buttonStyle = {
	padding:15,
	margin: 10,
	height:55,
	overflow:'hidden',
	borderRadius:4,
	backgroundColor: '#41495a',
	fontSize: 20,
	color: 'grey',
};

const styles = {
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
};
