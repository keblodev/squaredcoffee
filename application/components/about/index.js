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

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class About extends Component {

    render = () => {
        return (
            <View
                style={{
                    ...styles.container,
                    justifyContent: 'center',
                    height: '100%'
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        padding: 20,
                        borderWidth: 1,
                        borderColor: 'lightgray',
                        borderRadius: 5,
                        margin: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'gray',
                        }}
                    >
                         <AwesomeIcon
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: 8
                                    }}
                                    name="info-circle" size={20} color="grey" /> There's gonna be some text about coffee shop, pictures, working hours and maybe reviews
                    </Text>
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
		connect(mapState, mapDispatch)(About)
