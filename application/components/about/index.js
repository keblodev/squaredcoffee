import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import styles from '../../statics/styles';

class About extends Component {

	static navigationOptions = {
		title: 'About',
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
				<Button
					style={styles.buttonStyle}
					onPress={::this.testClick}
				>
					TestAction #1
				</Button>
				<Button
					style={styles.buttonStyle}
					onPress={::this.testClickDva}
				>
					TestAction #2
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
		connect(mapState, mapDispatch)(About)
