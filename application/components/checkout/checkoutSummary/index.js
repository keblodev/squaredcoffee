import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import CartListItem from './cartListItem';

import styles from '../../../statics/styles';
import strings from '../../../statics/strings';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class CheckoutSummary extends Component {

    render() {
        const {cart, user} = this.props;
        let totalCost = 0;
        const currency = user.currency;

        const cartSummary =
            cart.ids.map(itemId => {
                const storeItem = cart.byId[itemId];
                totalCost = totalCost + (parseFloat(storeItem.price) * storeItem.qty)
                    return <CartListItem
                        key={itemId}
                        storeItem={storeItem}
                        onAddCartItem={this.props.actions.cartAdd.bind(this, storeItem)}
                        onRemoveCartItem={this.props.actions.cartRemove.bind(this, storeItem)}
                    />
            })

        const CartSummaryView = () => (
            <ScrollView>
                {cartSummary}
            </ScrollView>
        )

        return (
            <View>
                {
                    cart.ids.length > 0 ? (
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
                                }}>1. Your order</Text>
                            </View>
                            <View
                                style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                            >
                                <CartSummaryView />
                            </View>
                            <View
                                style={{
                                    padding: 10,
                                    flex: 1,
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderColor: 'gray',
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View>
                                    <Text style={{
                                        ...styles.title,
                                        color: 'gray',
                                        fontSize: 20
                                    }}>2. Your Total: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        ...styles.title,
                                        color: 'gray',
                                        fontSize: 20,
                                        position: 'relative',
                                        right: 0,
                                    }}>{totalCost} {currency}</Text>
                                </View>
                            </View>
                        </View>
                    ) :
                    (
                        <View
                            style={{
                                alignSelf: 'center',
                                padding: 20,
                                borderWidth: 1,
                                borderColor: 'gray',
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
                                            name="info-circle" size={20} color="grey" /> Hmm.. No new orders? Buy some more :)
                            </Text>
                        </View>
                    )
                }
            </View>
        );
    }
};

const mapState = (state) => {
	return {
        cart: state.cart,
        user: state.user,
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(CheckoutSummary);
