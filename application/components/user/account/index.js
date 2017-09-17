import React, { PureComponent }                 from 'react';
import { Text, View, ScrollView }               from 'react-native';
import { TabViewAnimated, TabBar, SceneMap }    from 'react-native-tab-view';

import Button from 'react-native-button'

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';

import AppActions from '../../../actions';

import TypeForm from '../../shared/typeForm';

class TabbedLogin extends PureComponent {

    tabRoutes = [
        { key: '1', title: 'Account' },
        { key: '2', title: 'Billing' },
        { key: '3', title: 'Password' },
    ]

    state = {

    };

    componentWillMount = () => {
        const {auth} = this.props.user;
        this.props.actions.getUserAccountInfo({auth});
        const {params} = this.props.navigation.state;
        if (params) {
            const {tabRoutesToShow} = params;
            this.setState({
                index: 0,
                routes: this.tabRoutes.filter((val,idx) => tabRoutesToShow.indexOf(idx) > -1)
            })
        } else {
            this.setState(
                {
                    index: 1,
                    routes: this.tabRoutes,
                }
            )
        }
    }

    componentWillUpdate = () => {
        //in cases there are params in nav
        //we treat form as one action thing
        //so on update -> going back
        //TODO: curretnly bound to billing sync
        const {params} = this.props.navigation.state;
        if (params && this.props.user.billing) {
            this.props.navigation.goBack();
        }
    }

    _handleIndexChange = index => this.setState({ index });

  	_renderHeader = props => <TabBar
		style={{
			backgroundColor: 'transparent'
		}}
		indicatorStyle={{
			backgroundColor: 'gray'
		}}
		{...props}
	/>

	handleBillingUpdate(remoteUserConfig) {
        const {token} = this.props.user.auth;
        const remoteUserConfigEnriched = {
            billing: remoteUserConfig,
            token
        }

        if (this.props.user.billing) {
            this.props.actions.updateRemoteUser({...remoteUserConfigEnriched})
        } else {
            this.props.actions.createRemoteUser({...remoteUserConfigEnriched})
        }
	}

	handleUpdate(loginConfig) {
		// this.props.actions.loginUser({...loginConfig})
		// 	.then(response => console.log(response))
	}

	handleForgot(forgotConfig) {
		//TODO
		// this.props.actions.forgotUser({...forgotConfig})
		// 	.then(response => console.log(response))
	}

	componentDidUpdate() {
		const { navigation } = this.props;
		const isLoggedIn = !!this.props.user.auth;

		// if (isLoggedIn) {
		// 	navigation.goBack();
		// }
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
        const AccountInfoRoute = () => <View style={[ styles.container ]} >
            <TypeForm
                action={{
                    actionCb: this.handleUpdate.bind(this),
                    disabled: true,
                    actionLabel: 'Change email'
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
                    }
                ]}
            />
    </View>;
    const BillingInforRoute = () => {
        let formValues = null;
        if (this.props.user.billing) {
            const {given_name, family_name, email_address, address, phone_number} = this.props.user.billing;
            formValues = {
                given_name, family_name, email_address, ...address, phone_number
            };
        }

        return (<View style={[ styles.container ]} >
			<TypeForm
				action={{
					actionCb: this.handleBillingUpdate.bind(this),
					actionLabel: 'Save'
				}}
                formDefaultValues={formValues}
				formControls={[
					{
						label: 'First Name',
						name:  'given_name',
						keyboardType: 'default',
						pattern: new RegExp(/.+/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"is required.",
							"is required.",
						]
					},
					{
						label: 'Last Name',
						name:  'family_name',
						keyboardType: 'default',
						pattern: new RegExp(/.+/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"is required.",
							"is required.",
						]
					},
					{
						label: 'Email',
						name:  'email_address',
						keyboardType: 'default',
						pattern: new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w is not a valid email.",
							"is required.",
						]
					},
					{
						label: 'Address Line 1',
						name:  'address_line_1',
						keyboardType: 'default',
						pattern: new RegExp(/.+/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"is required.",
							"is required.",
						]
					},
					{
						label: 'Address Line 2',
						name:  'address_line_2',
						keyboardType: 'default',
						pattern: new RegExp(/.+/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"is required.",
							"is required.",
						]
					},
					{
						label: 'City',
						name:  'locality',
						keyboardType: 'default',
						pattern: new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w is not a valid city.",
							"is required.",
						]
					},
					{
						label: 'State',
						name:  'administrative_district_level_1',
						keyboardType: 'default',
						pattern: new RegExp(/^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w is not a valid state.",
							"is required.",
						]
					},
					{
						label: 'Postal Code',
						name:  'postal_code',
						keyboardType: 'default',
						pattern: new RegExp(/^[0-9]+$/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w is not a valid code.",
							"is required.",
						]
					},
					{
						label: 'Country',
						name:  'country',
						keyboardType: 'default',
						pattern: new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w  is not a valid country.",
							"is required.",
						]
					},
					{
						label: 'Phone Number',
						name:  'phone_number',
						keyboardType: 'default',
						pattern: new RegExp(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/),
						isRequired: true,
						secureTextEntry: false,
						errorMessages: [
							"%w is not a valid phone.",
							"is required.",
						]
					},
				]}
			/>
	    </View>)
    };
const PasswordChangeRoute = () => <View style={[ styles.container ]} >
			<TypeForm
				action={{
					actionCb: this.handleUpdate.bind(this),
					actionLabel: 'Change Password',
                    disabled: true,
				}}
				formControls={[
					{
						label: 'Current Password',
						name:  'password',
						keyboardType: 'default',
						pattern: new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
						isRequired: true,
						secureTextEntry: true,
						errorMessages: [
							"8 symbols, Aa and at least one number.",
							"don't forget the password.",
						]
					},
					{
						label: 'New Password',
						name:  'new_password',
                        equalToControl: 'password',
						keyboardType: 'default',
						pattern: new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
						isRequired: true,
						secureTextEntry: true,
						errorMessages: [
							"8 symbols, Aa and at least one number.",
							"this is obviously required too.",
						],
						//todolmlm
						customValidator: (value1, value2) => value1 === value2,
						customValidatorErrorMessage: "Passwords should match"
					}
				]}
			/>
	</View>;

    const sceneMap = SceneMap({
        '1': AccountInfoRoute,
        '2': BillingInforRoute,
        '3': PasswordChangeRoute
    });

    return (
        <TabViewAnimated
            style={styles.tabContainer}
            navigationState={this.state}
            renderScene={sceneMap}
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
