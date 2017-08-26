import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../../actions';

import styles from '../../../statics/styles';

class Payments extends Component {

	testClick() {
		this.props.actions.appTestAction('some text');
	}

	render = () => {
		return (
			<View
				style={{
					...styles.container,
					height: '100%'
				}}
			>
				<Button
					style={styles.buttonStyle}
					onPress={this.testClick.bind(this)}
				>
					TestAction #1
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
		connect(mapState, mapDispatch)(Payments)
