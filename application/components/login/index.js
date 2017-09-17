import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import TypeForm from '../shared/typeForm';

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

	handleSignup(signupConfig) {
		this.props.actions.createUser({...signupConfig})
			.then(response => console.log(response))
	}

	handleLogin(loginConfig) {
		this.props.actions.loginUser({...loginConfig})
			.then(response => console.log(response))
	}

	handleForgot(forgotConfig) {
		//TODO
		// this.props.actions.forgotUser({...forgotConfig})
		// 	.then(response => console.log(response))
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
            <TypeForm
                action={{
                    actionCb: this.handleLogin.bind(this),
                    actionLabel: 'Log In'
                }}
				formControls={[
					{
						label: 'Email Address',
						name:  'email',
						keyboardType: 'email-address',
						pattern: new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w not a valid email.",
							"%w not a valid email.",
						]
					},
					{
						label: 'Password',
						name:  'password',
						keyboardType: 'default',
						pattern: new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
						isRequired: true,
						secureTextEntry: true,
						errorMessages: [
							"8 symbols, Aa and at least one number.",
							"don't forget the password.",
						]
					}
				]}
			/>
	</View>;
	const SignUpRoute = () => <View style={[ styles.container ]} >
			<TypeForm
				action={{
					actionCb: this.handleSignup.bind(this),
					actionLabel: 'Sign Up'
				}}
				formControls={[
					{
						label: 'Email Address',
						name:  'email',
						keyboardType: 'email-address',
						pattern: new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w is not a valid email.",
							"is required actually.",
						]
					},
					{
						label: 'Password',
						name:  'password',
                        equalToControl: 'password_confirmation',
						keyboardType: 'default',
						pattern: new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
						isRequired: true,
						secureTextEntry: true,
						errorMessages: [
							"8 symbols, Aa and at least one number.",
							"don't forget the password.",
                            "must be equal to confirmation"
						]
					},
					{
						label: 'Confirm Password',
						name:  'password_confirmation',
                        equalToControl: 'password',
						keyboardType: 'default',
						pattern: new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
						isRequired: true,
						secureTextEntry: true,
						errorMessages: [
							"8 symbols, Aa and at least one number.",
							"don't forget the password.",
                            "must be equal to password"
						],
						//todolmlm
						customValidator: (value1, value2) => value1 === value2,
						customValidatorErrorMessage: "Passwords should match"
					}
				]}
			/>
    </View>;
    const ForgotRoute = () => <View style={[ styles.container ]} >
            <TypeForm
                action={{
                    actionCb: this.handleForgot.bind(this),
                    actionLabel: 'Get Password Reset',
                    disabled: true
                }}
                formControls={[
                    {
                        label: 'Email Address',
                        name:  'email',
                        keyboardType: 'email-address',
                        pattern: new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
                        isRequired: true,
                        secureTextEntry: false,
                        errorMessages: [
                            "%w is not a valid email.",
                            "is required actually.",
                        ]
                    }
                ]}
            />
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
        backgroundColor: 	'#1f232b',
        height:             '100%',
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
