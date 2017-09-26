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

import {
    PAYMENT_UPDATE,
    PAYMENT_SUCCESS,
    PAYMENT_PENDING,
    PAYMENT_FAILED,
} from '../../../statics/actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class OrderListItem extends Component {
    render = () => {
        const {id, onOrderSelect, onOrderRemove, timestamp} = this.props;
        const orderState = this.props.state;
        const timeStampDate = timestamp && new Date(timestamp);
        const timeStampStr = timeStampDate.toDateString() + ' ' + timeStampDate.toLocaleTimeString();
        let orderStateIconName = 'clock-o';
        switch (orderState) {
            case PAYMENT_FAILED:
                orderStateIconName = 'exclamation-circle';
                break;
            case PAYMENT_SUCCESS:
                orderStateIconName = 'check-circle';
                break;
        }

        const isOrderRemovable = orderState === PAYMENT_FAILED || orderState === PAYMENT_SUCCESS;

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
                    >  <AwesomeIcon name={orderStateIconName} size={16} color="grey" /></Text>
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