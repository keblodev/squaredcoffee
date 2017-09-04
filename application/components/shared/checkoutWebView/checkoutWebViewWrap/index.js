import React, { Component } from 'react';
import { WebView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../../actions';

import {BASE_URL} from '../../../../statics/configs';

class CheckoutWebViewWrap extends Component {

	webview = null

	checkoutNewMessage = null
	checkoutLastMessageId = null

	onPostMessage = (message = {}) => {
		if (this.webview) {
			this.webview.postMessage(message);
		}
	}

	onMessageReceived = (messageEvent = {}) => {
		messageEvent.persist();//cuz it's a SynteticEvent

		//TODO: guard
		const dataResponse = JSON.parse(messageEvent.nativeEvent.data);

        this.props.actions.postCheckoutMsgOut(dataResponse);

        this.checkoutLastMessageId = null;
        this.checkoutNewMessage = null;
	}

	componentWillReceiveProps({checkoutInput}) {
		if (checkoutInput.length) {
			const msgObj = checkoutInput[0];
			if (msgObj.id !== this.checkoutLastMessageId) {
				this.checkoutNewMessage = msgObj;
                this.checkoutLastMessageId = msgObj.id;
                console.log("[webform]PostingMessage");
				this.onPostMessage(msgObj)
			}
		}
	}

	shouldComponentUpdate() {
		return !!this.webview;
	}

	render() {
		const {onMessageCb} = this.props;
		const patchPostMessageJsCode = `(${String(function() {
				var originalPostMessage = window.postMessage
				var patchedPostMessage = function(message, targetOrigin, transfer) {
					originalPostMessage(message, targetOrigin, transfer)
				}
				patchedPostMessage.toString = function() {
					return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
				}
				window.postMessage = patchedPostMessage
				})})();`;

		//cuz there's an <Text> item error
		return <WebView
				source={{
						//html: this.htmlTxt
						uri: BASE_URL
					}}
				//localhost renders properly on emulator, but full address not
				//most likely due to ATS
				ref={webview => { this.webview = webview; }}
				mixedContentMode='always'
				scrollEnabled={true}
				javaScriptEnabled={true}
				startInLoadingState={true}
				scalesPageToFit={true}
				injectedJavaScript={patchPostMessageJsCode}
				onMessage={this.onMessageReceived.bind(this)}
			/>
	}
}

const mapState = (state) => {
	return {
		checkoutInput: state.webviews.checkout.input
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
	connect(mapState, mapDispatch)(CheckoutWebViewWrap);