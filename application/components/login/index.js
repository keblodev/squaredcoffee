import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

// import styles from '../../statics/styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hoshi } from 'react-native-textinput-effects';

class TabbedLogin extends PureComponent {
  state = {
    index: 1,
    routes: [
      { key: '1', title: 'Forgot' },
	  { key: '2', title: 'Login' },
	  { key: '3', title: 'Sign Up' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar
  	style={{
		  backgroundColor: 'transparent'
	  }}
	indicatorStyle={{
		backgroundColor: 'gray'
	}}
  {...props} />

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

  render() {
	const { navigation } = this.props;
	const isLoggedIn = !!this.props.user.auth;
	//TODO -> unify routes to components
	// need to figure validation before that
	const LoginRoute = () => <View style={[ styles.container ]} >
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

							label={'Password'}
							iconClass={AwesomeIcon}
							iconColor={'gray'}
							borderColor={'#313744'}
							autoCorrect={false}
						/>
					</View>
				</View>
				<View>
					<Button
						style={{
							...styles.buttonStyle,

						}}
						onPress={this.handleLoginLogout.bind(this, isLoggedIn)}
					>
						Log In
					</Button>
				</View>
			</ScrollView>
	</View>;
	const SignUpRoute = () => <View style={[ styles.container ]} >
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

						label={'Password'}
						iconClass={AwesomeIcon}
						iconColor={'gray'}
						borderColor={'#313744'}
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

						label={'Confirm password'}
						iconClass={AwesomeIcon}
						autoCapitalize={'none'}
						borderColor={'#313744'}
						autoCorrect={false}
					/>
				</View>
			</View>
			<View>
				<Button
					style={{
						...styles.buttonStyle,

					}}
					onPress={this.handleLoginLogout.bind(this, isLoggedIn)}
				>
					Sign Up
				</Button>
			</View>
		</ScrollView>
	</View>;
	const ForgotRoute = () => <View style={[ styles.container ]} >
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

						label={'Email Address'}
						iconClass={AwesomeIcon}
						iconColor={'gray'}
						// TextInput props
						borderColor={'#313744'}
						autoCapitalize={'none'}
						autoCorrect={false}
					/>
				</View>
			</View>
			<View>
				<Button
					style={{
						...styles.buttonStyle,

					}}
					onPress={this.handleLoginLogout.bind(this, isLoggedIn)}
				>
					Submit
				</Button>
			</View>
		</ScrollView>
	</View>;

    return (

		<TabViewAnimated
			style={styles.tabContainer}
			navigationState={this.state}
			renderScene={SceneMap({
				'1': ForgotRoute,
				'2': LoginRoute,
				'3': SignUpRoute,
			})}
			renderFooter={this._renderHeader}
			onIndexChange={this._handleIndexChange}
		/>
    );
  }
}

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
		connect(mapState, mapDispatch)(TabbedLogin)

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
	tabContainer: {
		flex: 1,
		backgroundColor: 	'#1f232b',
	},
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
