import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default ({itemId, storeItem, onSelectCb, onRemoveCartItem, onAddCartItem}) => {

    const itemModifiersFormatted = storeItem.selectedModifiers.map(mod => ({
        name:       mod.name,
        selected:   mod.selectedModifier.name,
    }))
    const itemCost = storeItem.priceCalculated/100;
    const currency = 'USD'; //thanks Clover :\

    return (
        <View
            style={{
                marginBottom: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                borderRadius: 2,
                backgroundColor: 'white',
                width: '100%'
            }}
        >
            <Button
                onPress={() => {
                        onSelectCb && onSelectCb();
                        // navigate("CategoryItemDetails", {title: item.name});
                    }
                }
            >
                <CardContent>
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    color: 'gray',
                                }}
                            >{storeItem.name} - {(itemCost).toFixed(2)} {currency} </Text>
                            {
                                itemModifiersFormatted.map((mod, idx) => {
                                    return (
                                        <Text
                                            key={idx}
                                            style={{
                                                marginLeft: 10,
                                                color:      'gray',
                                            }}
                                        >{mod.name}: {mod.selected}</Text>
                                    )
                                })
                            }
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                flex: 1,
                                flexDirection: 'row',
                            }}
                        >
                            <Button
                                onPress={onRemoveCartItem}
                            >
                                <View
                                    style={{
                                        padding: 5
                                    }}
                                ><AwesomeIcon name="minus" size={30} color="grey" /></View>
                            </Button>
                            <Button
                                onPress={onAddCartItem}
                            >
                                <View
                                    style={{
                                        padding: 5
                                    }}
                                ><AwesomeIcon name="plus" size={30} color="grey" /></View>
                            </Button>
                        </View>
                    </View>
                </CardContent>
            </Button>
        </View>
    )
}
