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
        { key: '1', title: 'Account Information' },
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
                    index: 0,
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

    handleUpdate(formState) {
        const {auth} = this.props.user;
        this.props.actions.updateUser({
            userConfig: {auth},
            config: formState
        })
    }

    handlePasswordReset() {
        //TODO
        const {auth} = this.props.user;
        this.props.actions.requestPasswordReset({userConfig: {auth}});
    }

    componentDidUpdate() {
        const { navigation } = this.props;
        const isLoggedIn = !!this.props.user.auth;
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
        const {user} = this.props;
        const isLoggedIn = !!user.auth;
        const is_verified = user.userAccount && user.userAccount.is_verified;
        //TODO -> unify routes to components
        // need to figure validation before that
        const AccountInfoRoute = () => <View style={[ styles.container ]} >
            <TypeForm
                action={{
                    actionCb:               this.handleUpdate.bind(this),
                    actionLabel:            'Change email',
                    secondaryAction:        this.handlePasswordReset.bind(this),
                    secondaryActionLabel:   'Request Password Reset'
                }}
                formDefaultValues={{
                    email: user.userAccount && user.userAccount.email
                }}
                formControls={[
                    {
                        label: 'Email Address (' + (is_verified ? "" : "not ") + 'verified)',
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

    const sceneMap = SceneMap({
        '1': AccountInfoRoute,
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
