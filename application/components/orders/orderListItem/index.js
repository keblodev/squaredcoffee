import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

import Button from 'react-native-button';

import * as OrderStates from '../../../statics/strings/orders';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class OrderListItem extends Component {
    render = () => {
        const {id, onOrderSelect, onOrderRemove, clientCreatedTime} = this.props;
        const orderState = this.props.state;

        // OPEN | LOCKED | ||| custom  PAID | REFUNDED | CANCELLED

        const timeStampDate = clientCreatedTime && new Date(clientCreatedTime);
        const timeStampStr = timeStampDate.toDateString() + ' ' + timeStampDate.toLocaleTimeString();
        let orderStateIconName = 'clock-o';
        let stateString = OrderStates.OPEN;

        switch (orderState) {
            case OrderStates.ERROR_TYPE:
                orderStateIconName = 'exclamation-circle';
                stateString = OrderStates.ERROR;
                break;
            case OrderStates.LOCKED_TYPE:
                orderStateIconName = 'check';
                stateString = OrderStates.LOCKED;
                break;
            case OrderStates.CANCELLED_TYPE:
                orderStateIconName  = 'ban';
                stateString         = OrderStates.CANCELLED_TYPE;
                break;
        }

        const isOrderRemovable =
            orderState === OrderStates.ERROR_TYPE ||
            orderState === OrderStates.LOCKED_TYPE ||
            orderState === OrderStates.CANCELLED_TYPE;

        return (
            <Button
                onPress={onOrderSelect}
            >
                <Card
                    styles={{
                        card: {
                            flex:           1,
                            flexDirection:  'row',
                            padding:        10,
                            alignItems:     'center',
                            justifyContent: 'center',
                        }
                    }}
                >
                    <Text
                        style={{
                            flexGrow:   1,
                            textAlign: 'left'
                        }}
                    >  <AwesomeIcon name={orderStateIconName} size={16} color="grey" /> {stateString} </Text>
                    <Text
                        style={{
                            fontSize:   15,
                            flexGrow:   1,
                            textAlign:  'right',
                            marginRight:    10,
                        }}
                    >{timeStampStr}</Text>
                    {
                        isOrderRemovable ?
                        <Button
                        style={{
                            flexGrow:   1,
                            marginLeft: 30,
                        }}
                        onPress={onOrderRemove}
                        >
                            <Text>
                                <AwesomeIcon
                                    name="close" size={30} color="grey" />
                            </Text>
                        </Button> : null
                    }
                </Card>
            </Button>
        )
    }
};