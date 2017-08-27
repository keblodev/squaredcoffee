import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../../actions';

// import styles from '../../statics/styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hoshi } from 'react-native-textinput-effects';

class AccountInfo extends Component {

	handleLoginLogout(isLoggedIn) {
		if (isLoggedIn) {
			this.props.actions.logoutUser();
		} else {
			//TODO: this currently signs up
			this.props.actions.createUser({some: 'config'})
				.then(response => console.log(response))
		}
	}

	componentDidUpdate() {
		const { navigation } = this.props;
		const isLoggedIn = !!this.props.user.auth;

		if (isLoggedIn) {
			navigation.goBack();
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
		const { navigation } = this.props;
		const isLoggedIn = !!this.props.user.auth;

		return (
			<View
				style={{
					...styles.container,
				}}
			>
				<ScrollView
					contentContainerStyle={{
						...styles.container,
					}}
					style={{
						height: '100%',
						width: '100%'
					}}
				>
					<View
						style={{
							width: '90%',
							overflow: 'hidden',
						}}
					>
						<View
							style={{
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<Hoshi
								style={{
									borderBottomColor: 'gray',
								}}
								defaultValue="test@mail.com"
								label={'Email Address'}
								iconClass={AwesomeIcon}
								iconColor={'gray'}
								// TextInput props
								borderColor={'#313744'}
								autoCapitalize={'none'}
								autoCorrect={false}
							/>
						</View>
						<View
								style={{
									marginTop: 10,
									marginBottom: 10
								}}
						>
							<Hoshi
								style={{
									borderBottomColor: 'gray',
								}}
								defaultValue="Password123"
								label={'Password'}
								iconClass={AwesomeIcon}
								iconColor={'gray'}
								borderColor={'#313744'}
								autoCorrect={false}
							/>
						</View>
					</View>
				</ScrollView>
				<View>
					<Button
						style={{
							...styles.buttonStyle,

						}}
					>
						Save
					</Button>
				</View>
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
		connect(mapState, mapDispatch)(AccountInfo)

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
