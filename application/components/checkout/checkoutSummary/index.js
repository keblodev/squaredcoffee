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

import CheckBox from 'react-native-check-box';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import CartListItem from './cartListItem';

import styles from '../../../statics/styles';
import strings from '../../../statics/strings';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class CheckoutSummary extends Component {

    onItemSelected = item => {
        this.props.actions.selectCartItem(item.uuid);
        const { navigate } = this.props.navigation;
        navigate && navigate("CartItemDetails", {title: item.name});
    };

    render() {

        const {cart, user} = this.props;
        let totalCost = 0;
        let totalTax = 0;

        const currency = 'USD';//sorry but only USD for clover

        const cartSummary =
            cart.ids.map(itemUuid => {
                const storeItem = cart.byUuid[itemUuid];
                totalCost = totalCost + (parseFloat(storeItem.priceCalculated));
                const itemTaxRate = storeItem.taxRates.elements || []
                const itemTaxPers = itemTaxRate.reduce((acc, taxRate) => acc + taxRate.rate /100000,0);
                totalTax += parseFloat(storeItem.priceCalculated) * itemTaxPers/100
                    return <CartListItem
                        key={itemUuid}
                        storeItem={storeItem}
                        onSelectCb={this.onItemSelected.bind(this, storeItem)}
                        onAddCartItem={this.props.actions.cartAdd.bind(this, storeItem)}
                        onRemoveCartItem={this.props.actions.cartRemove.bind(this, storeItem)}
                    />
            });

        const CartSummaryView = () => (
            <ScrollView>
                {cartSummary}
            </ScrollView>
        );

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
                                    }}>2. Sub Total: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        ...styles.title,
                                        color: 'gray',
                                        fontSize: 20,
                                        position: 'relative',
                                        right: 0,
                                    }}>{(Math.round(totalCost)/100).toFixed(2)} {currency} {(totalTax > 0 ?" + tax " + (Math.round(totalTax)/100).toFixed(2) + ` ${currency}` : "")} </Text>
                                </View>
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
                                            fontSize: 30
                                        }}>Total: </Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            ...styles.title,
                                            color: 'gray',
                                            fontSize: 30,
                                            position: 'relative',
                                            right: 0,
                                        }}>{(Math.round(totalCost+totalTax)/100).toFixed(2)} {currency} </Text>
                                    </View>
                                </View>
                                <Card
                                        styles={{
                                            card: {
                                                marginTop:  10,
                                                minHeight:  45,
                                            }
                                        }}
                                >
                                    <View
                                        style={{
                                            height: '100%',
                                            width:  '100%'
                                        }}
                                    >
                                        <CheckBox
                                            style={{
                                                flex:       1,
                                                padding:    10,
                                                width:      '100%'
                                            }}
                                            onClick={this.props.actions.toggleDriveThrough}
                                            isChecked={cart.isDriveThrough}
                                            leftText={"Drive-Through"}
                                        />
                                    </View>
                                </Card>
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
                                    name="info-circle" size={20} color="grey" /> Well what can I say... Your cart really is EMPTY.
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
