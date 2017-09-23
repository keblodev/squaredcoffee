import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import AppActions               from '../../../actions';

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

import {
    PAYMENT_UPDATE,
    PAYMENT_SUCCESS,
    PAYMENT_PENDING,
    PAYMENT_FAILED,
} from '../../../statics/actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Button from 'react-native-button';

class Order extends Component {
    render = () => {
        const {id, selectedShop, cart, currency, state, timestamp, transaction} = this.props.navigation.state && this.props.navigation.state.params;
        let totalCost = 0;

        const timeStampDate = timestamp && new Date(timestamp);
        const timeStampStr = timeStampDate.toDateString() + ' ' + timeStampDate.toLocaleTimeString();
        let orderStateIconName = 'clock-o';
        let orderStateString = 'Pending...'
        switch (state) {
            case PAYMENT_FAILED:
                orderStateString = 'Something went wrong :( ';
                orderStateIconName = 'exclamation-circle';
                break;
            case PAYMENT_SUCCESS:
                orderStateString = 'Processed successfully';
                orderStateIconName = 'check-circle';
                break;
        }

        const cartSummary =
            cart.ids.map((itemId,idx) => {
                const storeItem = cart.byId[itemId];
                totalCost = totalCost + (parseFloat(storeItem.price) * storeItem.qty)
                return (
                    <View
                        key={idx}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                flexGrow: 1,
                                color: 'gray',
                                textAlign: 'left',
                            }}
                        >{storeItem.title}</Text>
                        <Text
                            style={{
                                flexGrow: 1,
                                color: 'gray',
                                textAlign: 'right',
                            }}
                        > amount: {storeItem.qty}</Text>
                    </View>
                )
            });

        return (
            <View
                style={{
                    ...styles.container,
                    height: '100%',
                    justifyContent: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
            >
                <ScrollView
                        style={{
                            flex: 1
                        }}
                    >
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            padding: 20
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <AwesomeIcon name={orderStateIconName} size={60} color="grey" />
                        </Text>
                    </View>
                    {
                        state !== PAYMENT_FAILED ? <Text
                            style={{
                                ...styles.title,
                                color: 'gray',
                                fontSize: 20
                            }}
                        >Pickup at: {selectedShop && selectedShop.name}</Text> : null
                    }

                    <View
                        style={{
                            alignSelf: 'center',
                            padding: 20,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            margin: 10,
                            width: '100%',
                        }}
                    >
                        <Text
                            style={{
                                ...styles.title,
                                color: 'gray',
                                fontSize: 20
                            }}
                        >Summary:</Text>
                        {cartSummary}
                    </View>
                    <View
                        style={{
                            alignSelf: 'center',
                            padding: 20,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            margin: 10,
                            width: '100%',
                            flex: 1,
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                ...styles.title,
                                color: 'gray',
                                fontSize: 20,
                                flexGrow: 1,
                                textAlign: 'left'
                            }}
                        >Cost:</Text>
                        <Text
                            style={{
                                ...styles.title,
                                color: 'gray',
                                fontSize: 20,
                                flexGrow: 1,
                                textAlign: 'right'
                            }}
                        >{totalCost} {currency}</Text>
                    </View>
                    <View
                        style={{
                            alignSelf: 'center',
                            padding: 20,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            margin: 10,
                            width: '100%',
                            flex: 1,
                            flexDirection: 'column',
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.title,
                                    color: 'gray',
                                    fontSize: 20,
                                    flexGrow: 1,
                                    textAlign: 'left'
                                }}
                            >Status:</Text>
                            <Text
                                style={{
                                    ...styles.title,
                                    color: 'gray',
                                    fontSize: 20,
                                    flexGrow: 1,
                                    textAlign: 'right'
                                }}
                            >{orderStateString}</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                paddingTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.title,
                                    color: 'gray',
                                    fontSize: 15,
                                    flexGrow: 1,
                                    textAlign: 'left'
                                }}
                            >On:</Text>
                            <Text
                                style={{
                                    ...styles.title,
                                    color: 'gray',
                                    fontSize: 15,
                                    flexGrow: 1,
                                    textAlign: 'right'
                                }}
                            >{timeStampStr}</Text>
                        </View>
                    </View>
                    {
                        transaction ? <View
                            style={{
                                alignSelf: 'center',
                                padding: 20,
                                borderWidth: 1,
                                borderColor: 'lightgray',
                                borderRadius: 5,
                                margin: 10,
                                width: '100%',
                                flex: 1,
                                flexDirection: 'column',
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.title,
                                    color: 'gray',
                                    fontSize: 20,
                                    flexGrow: 1,
                                    textAlign: 'left'
                                }}
                            >Transaction:</Text>
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        paddingTop: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.title,
                                            color: 'gray',
                                            fontSize: 12,
                                            flexGrow: 1,
                                            textAlign: 'left'
                                        }}
                                    >id:</Text>
                                    <Text
                                        style={{
                                            ...styles.title,
                                            color: 'gray',
                                            fontSize: 12,
                                            flexGrow: 1,
                                            textAlign: 'right'
                                        }}
                                    >{transaction.id}</Text>
                                </View>
                            </View>
                        </View> : null
                    }
                </ScrollView>
            </View>
        );
    }
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(null, mapDispatch)(Order)