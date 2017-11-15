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

class CategoryStore extends Component {

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.title}`,
    })

    addItem(item) {
        this.props.actions.cartAdd(item);
    }

    onItemSelected = itemId => this.props.actions.selectItem(itemId);

    render = () => {
        const { navigate } = this.props.navigation;
        const { shopId, cart, category, images } = this.props;
        const {assetsRoute} = this.props.appConfig;
        let items = [];
        if (category && category.items) {
            items = category.items.elements
        }
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
                        shopId !== undefined && shopId !== null ? items.map((item, idx) => {
                            const inCartCount = cart.ids.reduce((acc, uuid) => {
                                return acc + (item.id === cart.byUuid[uuid].id ? 1 : 0)
                            },0);
                            const url = images[item.id] && `${assetsRoute}/${images[item.id]}`;
                            return ( <ListItem
                                key={idx}
                                item={item}
                                inCartCount={inCartCount}
                                // inCartCount={cart.byId[idx]}
                                imgUrl={url}
                                addItem={this.addItem.bind(this,item)}
                                navigate={navigate}
                                actionCb={this.onItemSelected.bind(this, item.id)}
                            />
                        )}) : null
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
        cart:       state.cart,
        shopId:	    state.shops.selected && state.shops.selected.shopId,
        images:     state.images,
        category:   state.shops.categories.selected,
        appConfig:  state.appConfig,
    };
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(CategoryStore)
