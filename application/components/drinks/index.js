import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import AppActions from '../../actions';

import ListItem from './listitem';

import DrinksMock from '../../statics/mocks/drinks';

class Drinks extends Component {

    addItem(item) {
        this.props.actions.cartAdd(item);
    }

    render = () => {

        const { navigate } = this.props.navigation;
        const { shopId } = this.props;
        return (
            <View
                style={{
                    ...styles.container,
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                >
                    {
                        shopId !== undefined && shopId !== null ? DrinksMock[shopId].map((ch, ind) => (
                            <ListItem
                                key={ch.id}
                                item={ch}
                                addItem={this.addItem.bind(this,ch)}
                                navigate={navigate}
                            />
                        )) : null
                    }
                    <View style={{height: 80}}/>
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 	0
                    }}
                >
                    <Card
                        styles={{card: {
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        <View>
                            <CardAction>
                                <Button
                                    style={{
                                        ...styles.buttonStyle,
                                        borderRadius: 22
                                    }}
                                    onPress={()=> {
                                        navigate('Checkout');
                                    }}
                                >
                                    Checkout
                                </Button>
                            </CardAction>
                        </View>
                    </Card>
                </View>
			</View>
		);
	}
};

const mapState = (state) => {
    return {
        //todo: selector
        shopId:	state.shops.selected && state.shops.selected.shopId
    };
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(Drinks)
