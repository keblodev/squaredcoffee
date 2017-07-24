import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
					style={styles.buttonStyle}
					onPress={() =>
						navigate('About', { name: 'Jane' })
					}
				>
					About
				</Button>
				<Button
					style={styles.buttonStyle}
					onPress={() =>
						navigate('Drinks', { name: 'Jane' })
					}
				>
					Drinks
				</Button>
				<Button
					disabled={true}
					style={styles.buttonDisabledStyle}
					onPress={() =>
						navigate('Drinks', { name: 'Jane' })
					}
				>
					Foods
				</Button>
				<Button
					disabled={true}
					style={styles.buttonDisabledStyle}
					onPress={() =>
						navigate('Drinks', { name: 'Jane' })
					}
				>
					Checkout
				</Button>
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

const buttonStyle = {
		padding:10,
		margin: 10,
		height:45,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: 'white',
		fontSize: 20,
		color: 'grey'
    };

const styles = StyleSheet.create({
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#DDDDDD',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
});
