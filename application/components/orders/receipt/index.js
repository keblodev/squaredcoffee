import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import ReceiptWebViewWrap from '../../shared/receiptWebViewWrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

class Receipt extends Component {
    render() {
        const {order} = this.props;
        return (
            <View
                style={{
                    ...styles.container,
                    backgroundColor: 	'#1f232b',
                    height:             '100%'
                }}
            >
                <ReceiptWebViewWrap
                    id={order.id}
                />
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        order:  state.user.orders.selected,
    }
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(Receipt)
