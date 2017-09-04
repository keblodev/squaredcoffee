import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import CheckBox from 'react-native-check-box';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SaveCardOptionBox extends Component {
    render = () => {
        const {style, isLoggedIn, isRemoteAuthorized, checkboxCb, persistPaymentMethod, navigate} = this.props;

        return (isRemoteAuthorized ?
            (<CheckBox
                style={style}
                onClick={checkboxCb}
                isChecked={persistPaymentMethod}
                leftText="Save card?"
            /> ):
            (<View
                style={style}
            >
                <View
                    style={{
                        padding: 5,
                        borderWidth: 1,
                        margin: 5,
                        borderColor: 'gray',
                        borderRadius: 5,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'gray'
                        }}
                    >
                                   <AwesomeIcon
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: 8
                                    }}
                                    name="info-circle" size={15} color="grey" /> {isLoggedIn ? 'Fill in the billing info pls to save a card' : 'login to save a card'}
                    </Text>
                </View>
                <Button
                    style={styles.buttonStyle}
                    onPress={()=> isLoggedIn ? navigate('AccountModal', {tabRoutesToShow: [1]}) : navigate('Login')}
                >
                    {isLoggedIn ? 'add billing info' : 'login'}
                </Button>
            </View>)
        )
    }
};