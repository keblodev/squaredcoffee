import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../actions';

import PaymentMethodsView from '../shared/paymentMethodsView';
import CheckoutSummary from './checkoutSummary';
import CartAction from './cartAction';

import CheckoutWebView from '../shared/checkoutWebView';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class Checkout extends Component {

    placeOrder = () => {
        this.props.actions.placeOrder();
    }

    render = () => {
        const { navigate } = this.props.navigation;
        const {cart, user} = this.props;

        return (
            <View
                style={{
                    ...styles.container,
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View>
                        <CheckoutSummary />
                    </View>
                    <View>
                        {
                            cart.ids.length ?
                            <View>
                                <View
                                    style={{
                                        padding: 10
                                    }}
                                >
                                    <Text style={{
                                        ...styles.title,
                                        color: 'gray',
                                        fontSize: 20
                                    }}>3. Select your payment option:</Text>
                                </View>
                                <PaymentMethodsView
                                    navigate={navigate}
                                />
                                <View
                                    style={{
                                        padding: 10
                                    }}
                                >
                                    <Text style={{
                                        ...styles.title,
                                        color: 'gray',
                                        fontSize: 20
                                    }}>4. Your pickup location:</Text>
                                </View>
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
                                                    name="info-circle" size={20} color="grey" /> Pickup location address and working hours are gonna be here
                                    </Text>
                                </View>
                            </View>
                            : null
                        }
                    </View>
                    <View style={{height: 80}}/>
                </ScrollView>

                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 	0
                    }}
                >
                    <CartAction
                        disabled={!cart.ids.length || !user.paymentInstrument}
                        placeOrderCb={this.placeOrder.bind(this)}
                    />
                </View>
                <CheckoutWebView
                    navigation={this.props.navigation}
                />

            </View>
        );
    }
};

const mapState = (state) => {
	return {
		checkoutWebViewOutput: state.webviews.checkout.output,
		user: state.user,
		cart: state.cart
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(Checkout);
