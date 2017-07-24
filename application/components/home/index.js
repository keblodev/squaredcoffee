import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { Route, Link } from 'react-router-native';

import AppActions from '../../actions';

import About from '../about';
import Drinks from '../drinks';

class Home extends Component {

	static navigationOptions = {
		title: 'Welcome',
	};

	testClick() {
		this.props.actions.appTestAction('some text');
	}

	testClickDva() {
		this.props.actions.appTestActionDva('some text');
	}

	render = () => {
		const { navigate } = this.props.navigation;
		return (
			<View>

		      <Button
		        title="About"
		        onPress={() =>
		          navigate('About', { name: 'Jane' })
		        }
		      />
		      <Button
		        title="Drinks"
		        onPress={() =>
		          navigate('Drinks', { name: 'Jane' })
		        }
		      />

			</View>
		);
	}
};


const mapState = (state, ownProps) => {
	return {
		justAWholeState: state.testReducer
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
	// withRouter(
		connect(mapState, mapDispatch)(Home)
	// );