import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import styles from '../../statics/styles';

class About extends Component {

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
                <Card>
                    <CardContent>
                        <Text style={{textAlign: 'center'}}>We are the coffe shop</Text>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Text style={{textAlign: 'center'}}>Mon   1pm - 3pm</Text>

                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Text style={{textAlign: 'center'}}>Your best coffe shop out there</Text>
                    </CardContent>
                </Card>
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
