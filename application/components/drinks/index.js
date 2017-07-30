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

	addItem(item) {
		this.props.actions.cartAdd(item);
	}

	checkoutItem(item) {
		this.props.actions.cartAdd(item);

		const { navigate } = this.props.navigation;
		navigate('Checkout');
	}

	onSelect(data) {
		alert(data);
	}

	render = () => {

		const items = [1,2,3,4].map((val,ind) => ({
			id: val,
			title: 'some_title_' + ind,
			desc: 'some_description_' + ind
		}));

		return (
			<View>
				<ScrollView>
					{
						items.map((ch, ind) => (
							<ListItem
								key={ch.id}
								item={ch}
								addItem={this.addItem.bind(this,ch)}
								checkoutItem={this.checkoutItem
								.bind(this, ch)}
							/>
						))
					}
				</ScrollView>
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
		connect(mapState, mapDispatch)(Drinks)
