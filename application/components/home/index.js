import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import About from '../about';
import Drinks from '../drinks';

// import  ListPopover from 'react-native-list-popover';

const coffeshops = ['shop1', 'shop2'];

class Home extends Component {

	componentWillMount() {
		this.setState({
			item: "Select Item",
			isVisible: false,
		})
	}

	static navigationOptions = {
		title: 'Welcome',
	};

	testClick() {
		this.props.actions.appTestAction('some text');
	}

	testClickDva() {
		this.props.actions.appTestActionDva('some text');
	}

	showPopover() {
		this.setState({isVisible: true});
	}

	closePopover() {
		this.setState({isVisible: false});
	}

	setItem(item) {
		this.setState({item: item});
	}

	render = () => {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
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
					style={styles.buttonStyle}
					onPress={() =>
						navigate('Checkout', { name: 'Jane' })
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
		padding:20,
		margin: 10,
		height:65,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: 'white',
		fontSize: 20,
		color: 'grey',
    };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
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
