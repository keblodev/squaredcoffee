import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

class Drinks extends Component {

	static navigationOptions = {
		title: 'Coffee and stuff',
	};

	testClick() {
		this.props.actions.appTestAction('some text');
	}

	testClickDva() {
		this.props.actions.appTestActionDva('some text');
	}

	render = () => {
		return (
			<View>
				<Text> Some DRINKS </Text>
				<Button
				onPress={::this.testClick}
				title='ok'
				>
				</Button>
				<Button
				onPress={::this.testClickDva}
				title='okDva'
				>
				</Button>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		justAWholeState: state.testReducer
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
	// withRouter(
		connect(mapState, mapDispatch)(Drinks)
	// );