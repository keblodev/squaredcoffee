import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import ListItem from './listitem';

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
			<ScrollView>
				<ListItem
					testClick={::this.testClick}
					testClickDva={::this.testClickDva}
				/>
				<ListItem
					testClick={::this.testClick}
					testClickDva={::this.testClickDva}
				/>
				<ListItem
					testClick={::this.testClick}
					testClickDva={::this.testClickDva}
				/>
				<ListItem
					testClick={::this.testClick}
					testClickDva={::this.testClickDva}
				/>
			</ScrollView>
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
