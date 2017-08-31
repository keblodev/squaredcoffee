import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNavigationHelpers } from 'react-navigation';

import Navigator from './containers/navigator';

import StatusBarAlert from 'react-native-statusbar-alert';

import ProgressOverlay from './components/shared/progressOverlay';

class App extends Component {
	render () {
        const isLoading = !!this.props.sync.loading;
        const loadingMsg = this.props.sync.loading;
		return (
			<View
				style={{
					backgroundColor: '#2A2F3A',
					height:'100%',
					width:'100%',
				}}
			>
				<View>
					<StatusBarAlert
						visible={this.props.notification.active}
						message={this.props.notification.message}
						backgroundColor="#3CC29E"
						color="white"
						onPress={() => {
							console.log('NAV REQUESTED');
							//todo navigate here or watevor
						}}
					/>
				</View>
				<Navigator
					navigation={
						addNavigationHelpers({
							dispatch: 	this.props.dispatch,
							state:		this.props.nav,
						})
					}
				/>
                {
                isLoading ?
                    (<ProgressOverlay
                        msg={loadingMsg}
                    />) : null
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

