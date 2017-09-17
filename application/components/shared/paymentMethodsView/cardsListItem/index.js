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

const cardsTypeIconst = {
    "VISA": "cc-visa",
    "MASTERCARD": "cc-mastercard",
    "AMEX": "cc-amex",
    "PAYPAL": "cc-paypal",

    "default": 'credit-card'
}

class CardListItem extends Component {
    render = () => {
        const {actions, idx, card_brand, id, last_4, exp_month, exp_year, isSelected} = this.props;
        return (
        <Button
            onPress={actions.selectCard.bind(this, idx)}
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
                <View>
                    <CardContent>
                        <Text
                            style={{
                                fontSize: 15
                            }}
                        >
                            <AwesomeIcon name={cardsTypeIconst[card_brand] || cardsTypeIconst.default} size={16} color="grey" />  {last_4}    {exp_month}/{exp_year}
                        </Text>
                    </CardContent>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: 8
                    }}
                >
                    <Button
                        onPress={actions.removeCard.bind(this, idx, id)}
                    >
                        <AwesomeIcon
                            name="close" size={30} color="grey" />
                    </Button>
                </View>
            </Card>
        </Button>);
	}
}

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(null, mapDispatch)(CardListItem);
