import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import AppActions from '../../actions';

import ListItem from './listitem';

class Drinks extends Component {

	addItem(item) {
		this.props.actions.cartAdd(item);
	}

	render = () => {

		const items = [1,2,3,4].map((val,ind) => ({
			id: val,
			title: 'some_title_' + ind,
			desc: 'some_description_' + ind
		}));

		const { navigate } = this.props.navigation;

		return (
			<View
				style={{
					...styles.container,
					flex: 1,
					justifyContent: 'center',
				}}
			>
				<ScrollView
					style={{flex: 1}}
				>
					{
						items.map((ch, ind) => (
							<ListItem
								key={ch.id}
								item={ch}
								addItem={this.addItem.bind(this,ch)}
							/>
						))
					}
				</ScrollView>
				<View
					style={{flex: 0.15}}
				>
					<Card>
						<View>
							<CardAction>
								<Button
									style={styles.buttonStyle}
									onPress={()=> {
										navigate('Checkout');
									}}
								>
									Checkout
								</Button>
							</CardAction>
						</View>
					</Card>
				</View>
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
