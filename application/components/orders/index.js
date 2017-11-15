import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../actions';

import OrderListItem from './orderListItem';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class Orders extends Component {

    onOrderSelect(id) {
        const {navigate} = this.props.navigation;
        this.props.actions.selectOrder(id);
        navigate('Order');
    }

    onOrderRemove(orderId) {
        this.props.actions.removeOrder(orderId);
    }

    componentWillMount() {
        const auth = this.props.auth;
        if (auth) {
            this.props.actions.getUserOrders({auth});
        } else {
            this.props.navigation.goBack();
        }
    }

    render() {
        const {orders, navigate, auth} = this.props;
        return (
            <View
                style={{
                    ...styles.container,
                    height: '100%'
                }}
            >
                <ScrollView>

                    {
                        orders.ids.length ? orders.ids.map((orderId, idx) => {
                            const order = orders.byId[orderId];
                            return <OrderListItem
                                key={idx}
                                {...order}
                                idx={idx}
                                onOrderSelect={this.onOrderSelect.bind(this, order.id)}
                                onOrderRemove={this.onOrderRemove.bind(this, order.id)}
                            />
                        }) : <View
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
                                            name="info-circle" size={20} color="grey" /> Hmm.. No new orders? Buy some stuff :)
                            </Text>
                        </View>
                    }
                    {
                        // TODO auth only
                        !auth ? (
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
                                            name="info-circle" size={20} color="grey" /> As a not logged in user you can store not more than 3 orders </Text>
                        </View>
                        ): null
                    }
                </ScrollView>
            </View>
        );
    }
};

const mapState = (state) => {
    const {orders, auth, currency} = state.user;
    return {orders, auth, currency};
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(Orders);
