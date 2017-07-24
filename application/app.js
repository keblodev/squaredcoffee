import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNavigationHelpers } from 'react-navigation';

import Navigator from './containers/navigator';

class App extends Component {

	render () {
		return (
			<View
				style={{height:'100%',width:'100%'}}
			>
				<Navigator
					navigation={
						addNavigationHelpers({
							dispatch: 	this.props.dispatch,
							state:		this.props.nav,
						})
					}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);

