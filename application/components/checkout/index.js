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

import PaymentMethodsView   from '../shared/paymentMethodsView';
import AddressButton        from '../shared/addressButton';

import CheckoutSummary      from './checkoutSummary';
import CartAction           from './cartAction';

import CheckoutWebView from '../shared/checkoutWebView';

import { addDays } from 'date-fns';

class Checkout extends Component {

    placeOrder = () => {
        const {orders, auth} = this.props.user;
        const notClosedOrders = orders.ids.filter(id => orders.byId[id].state === 'open')

        if (notClosedOrders.length < 5) {
            const {cart, selectedShop} = this.props
            const orderConfig = {
                cart,
                selectedShop,
            }
            this.props.actions.placeOrder(cart, selectedShop);
        } else {
            var notifyConfig = {
                msg:    'too many opened',
                popup:  true,
                error:  true,
            };
            this.props.actions.showNotify(notifyConfig);
        }
    }

    componentWillMount() {
        if (!this.props.cart.ids.length) {
            this.props.navigation.goBack();
        }
    }

    render = () => {
        const {navigate}  = this.props.navigation;
        const {cart, user, selectedShop}  = this.props;
        const {orders, auth}      = user;

        let address = [];
        if(selectedShop && selectedShop.address) {
            const {address1, city, country, state, zip} = JSON.parse(selectedShop.address);
            address = [address1, city, country, state, zip];
        }

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
                        <CheckoutSummary
                            navigation={this.props.navigation}
                        />
                    </View>
                    <View>
                        {
                            cart.ids.length ?
                            <View>
                                {/* <View
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
                                /> */}
                                <View
                                    style={{
                                        padding: 10
                                    }}
                                >
                                    <Text style={{
                                        ...styles.title,
                                        color: 'gray',
                                        fontSize: 20
                                    }}>3. Your pickup location:</Text>
                                </View>
                                {
                                    address && address.length ?
                                    <AddressButton
                                        address={address}
                                        name={selectedShop.name}
                                    /> : null
                                }
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
                    {
                        //TODO AUTH
                    }
                    <CartAction
                        actionCb={auth ? this.placeOrder.bind(this) : () => navigate('Login')}
                        disabled={!cart.ids.length}
                        title={auth ? "4. Place Order" : "4. Login"}
                    />
                    {
                        //TODO AUTH
                        orders.ids.length ? (
                            <CartAction
                                actionCb={()=>{navigate('OrdersModal')}}
                                title="5. Orders History"
                            />
                        ) : null
                    }
                </View>
                {/* <CheckoutWebView
                    navigation={this.props.navigation}
                /> */}

            </View>
        );
    }
};

const mapState = (state) => {
    return {
        checkoutWebViewOutput:  state.webviews.checkout.output,
        user:                   state.user,
        cart:                   state.cart,
        selectedShop:           state.shops.selected,
    };
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(Checkout);
