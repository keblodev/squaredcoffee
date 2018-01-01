import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView, Linking } from 'react-native';

import Button from 'react-native-button';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class AddressButton extends Component {
    onGoogleNavigate = (address) => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURI(address.join('+'))}`);
    }

    render = () => {
        const {address, name} = this.props;

        const addressStr = [name, address.join('\n')].join('\n');

        return (
            <View>
                <View
                    style={{
                        alignSelf: 'center',
                        padding: 10,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        margin: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            color: 'gray',
                        }}
                    >
                        <AwesomeIcon
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: 8
                            }}
                            name="info-circle" size={15} color="grey" /> press below to open in GoogleMaps
                    </Text>
                </View>
                <Button
                    onPress={this.onGoogleNavigate.bind(this, address)}
                    style={styles.buttonStyle}
                >
                        {addressStr}
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