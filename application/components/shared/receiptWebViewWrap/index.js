import React, { Component } from 'react';
import { WebView } from 'react-native';

import {BASE_URL} from '../../../statics/configs';

export default class ReceiptWebViewWrap extends Component {

	webview = null

    render() {
        const {id} = this.props;
        return <WebView
                source={{
                        //html: this.htmlTxt
                        uri: `${BASE_URL}/shops/clover/orders/${id}/receipt`
                    }}
                //localhost renders properly on emulator, but full address not
                //most likely due to ATS
                ref={webview => { this.webview = webview; }}
                mixedContentMode='always'
                scrollEnabled={true}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                // injectedJavaScript={patchPostMessageJsCode}
                // onMessage={this.onMessageReceived.bind(this)}
            />
    }
}
