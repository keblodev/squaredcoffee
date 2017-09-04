import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../../actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../../statics/styles';

class CardListItem extends Component {
    render = () => {
        const {actions, isSelected} = this.props;
        return (
            <View>
                <Button
                    onPress={actions.setOneTimePayment}
                >
                    <Card>
                        {
                            isSelected ? (
                                <AwesomeIcon
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: 8
                                    }}
                                    name="check" size={30} color="grey" />
                            ) : null
                        }
                        <View
                            style={{
                                padding: 15
                            }}
                        >
                            <Text>
                                Set One Time Payment
                            </Text>
                        </View>
                    </Card>
            </Button>
        </View>
);
    }
}

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(null, mapDispatch)(CardListItem);
