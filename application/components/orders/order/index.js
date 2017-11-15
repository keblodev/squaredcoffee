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
        let totalCost = 0;

        // TODO
        const transaction = null;

        const { navigate }      = this.props.navigation;
        const {order, shops}    = this.props;
        const {href, id, clientCreatedTime, state, total, note, lineItems, currency = "USD"} = order;

        totalCost = Math.round(total)/100

        let shopId = "";
        let address = [];
        // cuz again -> clover is so awesome with their api that they don't tell you
        // who's the owner of the order)
        const shopIdMatch = href.match(/\/merchants\/(\w+)\/orders\//);
        if (shopIdMatch && shopIdMatch.length > 1) {
            shopId = shopIdMatch.pop();

            if(shops.byId[shopId] && shops.byId[shopId].address) {
                const {address1, city, country, state, zip} = JSON.parse(shops.byId[shopId].address);
                address = [shops.byId[shopId].name, address1, city + " " + state + " " + zip];
            }
        }

        const isDriveThrough = note.match("DRIVE THROUGH");


        const timeStampDate = clientCreatedTime && new Date(clientCreatedTime);
        const timeStampStr = timeStampDate.toDateString() + ' ' + timeStampDate.toLocaleTimeString();
        let orderStateIconName = 'clock-o';
        let orderStateString = 'open';
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
            lineItems.elements.map((lineItem,idx) => {
                const {modifications} = lineItem;
                const mods = modifications && modifications.elements || []
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
                        >{lineItem.name} </Text>
                        <View>
                            {
                                mods.map((mod, idx) => {
                                    return <Text
                                        key={idx}
                                        style={{
                                            flexGrow: 1,
                                            color: 'gray',
                                            textAlign: 'right',
                                        }}
                                    > {mod.name} </Text>
                                })
                            }
                        </View>
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
                        >Order Number:</Text>
                        <Text
                            style={{
                                ...styles.title,
                                color: 'gray',
                                fontSize: 20
                            }}
                        >{order.id}</Text>
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
                        >Total with tax:</Text>
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
                    {
                        address.length ? (
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
                                >Ordered at:
                                </Text>
                                {
                                    address.map((addr, idx) => {
                                        return (
                                            <View
                                                key={idx}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        color: 'gray',
                                                    }}
                                                    key={idx}
                                                >
                                                    {addr}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        ): null
                    }
                    {
                        isDriveThrough ? (
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
                                    >Drive Through pickup</Text>
                                </View>
                            </View>
                        ) : null
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
                    <View>
                        <Button
                            style={{
                                padding:            15,
                                margin:             10,
                                height:             55,
                                overflow:           'hidden',
                                borderRadius:       4,
                                backgroundColor:    '#41495a',
                                fontSize:           20,
                                color:              'grey',
                            }}
                            onPress={()=>navigate('ReceiptModal')}
                        >
                            Get Receipt
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const mapState = (state) => {
    return {
        auth:   state.user,
        order:  state.user.orders.selected,
        shops:  state.shops,
    }
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(Order)