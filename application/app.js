import React, { Component } from 'react';
import { View, BackHandler, Platform } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNavigationHelpers } from 'react-navigation';

import Navigator from './containers/navigator';

import StatusBarAlert from 'react-native-statusbar-alert';

import ProgressOverlay      from './components/shared/progressOverlay';
import FetchOverlay         from './components/shared/fetchOverlay';
import PopupNotifyOverlay   from './components/shared/popupNotifyOverlay';


class App extends Component {

    androidBackButtonListener = null;

    componentWillUnmount() {
        if (Platform.OS === "android" && this.androidBackButtonListener !== null) {
            BackHandler.removeEventListener("hardwareBackPress", this.androidBackButtonListene);
        }
    }

    __handleBackAndroid = (globalNavigator) => {
        globalNavigator.goBack();
        return true;
    }

	render () {
        const isLoading = !!this.props.sync.loading;
        const isFetching = !!this.props.sync.fetching;
        const isPopupNotification = !!this.props.notification.active;

        const loadingMsg = this.props.sync.loading;
        const fetchMsg = this.props.sync.fetching;

        const globalNavigator = addNavigationHelpers({
            dispatch: 	this.props.dispatch,
            state:		this.props.nav,
        });

        if (Platform.OS === "android" && this.androidBackButtonListener === null) {
            this.androidBackButtonListener = BackHandler.addEventListener("hardwareBackPress", this.__handleBackAndroid.bind(this, globalNavigator));
        }

        return (
            <View
                style={{
                    backgroundColor: '#2A2F3A',
                    height:'100%',
                    width:'100%',
                }}
            >
                <Navigator
                    navigation={globalNavigator}
                />
                {
                    isLoading ?
                    (<ProgressOverlay
                        msg={loadingMsg}
                    />) : null
                }
                {   isFetching ?
                    (<FetchOverlay
                        msg={fetchMsg}
                    />) : null
                }
                {
                    isPopupNotification ?
                    (
                        <PopupNotifyOverlay
                            msg={this.props.notification.msg}
                            isError={this.props.notification.error}
                        />
                    ) : null
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
  nav: 			state.nav,
  sync:         state.sync,
  notification: state.notification
});

export default connect(mapStateToProps)(App);

