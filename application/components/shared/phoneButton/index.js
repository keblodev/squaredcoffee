import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView, Linking } from 'react-native';

import call from 'react-native-phone-call';

import Button from 'react-native-button';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class PhoneButton extends Component {
    onGoogleNavigate = (phoneNumber) => {
        const args = {
            number: phoneNumber,
            prompt: true
          }

        call(args).catch(console.error)
    }

    render = () => {
        const {phoneNumber} = this.props;

        return (
            <View>
                <Button
                    onPress={this.onGoogleNavigate.bind(this, phoneNumber)}
                    style={styles.buttonStyle}
                >
                        call {phoneNumber}
                </Button>
            </View>
        )
    }
}

const buttonStyle = {
	padding:15,
	margin: 10,
	overflow:'hidden',
	borderRadius:4,
    backgroundColor: '#41495a',
	fontSize: 20,
	color: 'grey',
};

const styles = {
	container: {
		alignItems: 		'center',
		backgroundColor: 	'#1f232b',
		flex: 				1,
		justifyContent: 	'center',
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#313744',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
};