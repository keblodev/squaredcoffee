import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import styles from '../../../statics/styles';

import AnimatedOverlay from 'react-native-animated-overlay';

export default class FetchOverlay extends Component {
	render() {
		const {overlayShow, msg} = this.props;
		const Overlay = ({overlayShow}) => (
			<AnimatedOverlay
				backgroundColor='#000'
				opacity={0.5}
				duration={200}
				overlayShow={overlayShow}
			/>)
		return (
			<View
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				}}
			>
				<Overlay
					overlayShow={true}
				/>
				<View
					style={stylesLocal.container}
				>
					<Text
						style={{
							color: 'white'
						}}
					>
						{ msg || 'syncing...' }
					</Text>
				</View>
			</View>
		)
	}
}

const buttonStyle = {
		padding:20,
		margin: 10,
		height:65,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: 'white',
		fontSize: 20,
		color: 'grey',
    };

const stylesLocal = StyleSheet.create({
	//dis makes android cry with Object.freeze
	// ...styles,
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.0)',
		justifyContent: 'center',
		alignItems: 'center'
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#DDDDDD',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
});