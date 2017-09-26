import React, { Component } from 'react';
import { Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default ({actionCb, disabled, title}) => {
    return (
        <Card
            styles={{
                card: {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <View>
                <CardAction>
                    <Button
                        disabled={disabled}
                        style={
                            {
                                ...(disabled ?
                                styles.buttonDisabledStyle :
                                styles.buttonStyle),
                                borderRadius: 22
                            }
                        }
                        onPress={actionCb}
                    >
                        {title}
                    </Button>
                </CardAction>
            </View>
        </Card>
    );
}

