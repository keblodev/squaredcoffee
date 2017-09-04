import React, { Component } from 'react';
import { Text, View, ScrollView, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';

import AnimatedOverlay from 'react-native-animated-overlay';

import AppActions from '../../../actions';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class PopupNotifyOverlay extends Component {

    static INOUT_TIMEOUT        = 700
    static ANIMATION_TIMEOUT    = 300

    __timeoutIn = null;

    constructor(props) {
        super(props);
        this.state = {
            overlayActive: 	true,
            top:            new Animated.Value(50),
            width:	        new Animated.Value(0),
            height:	        new Animated.Value(0),
            fadeOut: 	    new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.__resetTimpouts();
        this.animateIn()
    }

    componentWillReceiveProps() {
        this.__resetTimpouts();
        this.__setAnimationOut();
    }

    componentWillUnmount() {
        this.__resetTimpouts();
    }

    __setAnimationOut() {
        this.__timeoutIn = setTimeout(() => {
            this.animateOut();
        }, PopupNotifyOverlay.INOUT_TIMEOUT)
    }

    __resetTimpouts() {
        clearTimeout(this.__timeoutIn);
        this.__timeoutIn = null;
    }

	animateIn() {
		Animated.sequence([
			Animated.parallel([
				Animated.timing(
					this.state.fadeOut,
					{
						toValue: 	1,
						duration: 	PopupNotifyOverlay.ANIMATION_TIMEOUT,
					}
                ),
				Animated.timing(
					this.state.top,
					{
						toValue: 	0,
						duration: 	PopupNotifyOverlay.ANIMATION_TIMEOUT,
						easing: 	Easing.out(Easing.cubic)
					}
                ),
    			Animated.timing(
					this.state.height,
					{
						toValue: 	80,
						duration: 	PopupNotifyOverlay.ANIMATION_TIMEOUT,
						easing: 	Easing.out(Easing.cubic)
					}
				),
			])
		]).start(()=> {
            this.__setAnimationOut();
        });
    }

    animateOut() {
        this.setState({
            overlayActive: false
        })
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.fadeOut,
                    {
                        toValue: 	0,
                        duration: 	PopupNotifyOverlay.ANIMATION_TIMEOUT,
                    }
                ),
                Animated.timing(
                    this.state.top,
                    {
                        toValue: 	30,
                        duration: 	PopupNotifyOverlay.ANIMATION_TIMEOUT,
                        easing: 	Easing.out(Easing.cubic)
                    }
                )
            ])
        ]).start(()=> {
            this.props.actions.hideNotify();
        });
    }

    processEllipsis (msg, maxLimit = 20) {
        return ((msg).length > maxLimit) ?
            (((msg).substring(0,maxLimit-3)) + '...') :
            msg
    }

	render() {
        const {msg, isError} = this.props;

		let animatedStyles = [styles.loadingScreen, {
			position:   'relative',
            top:        this.state.top,
            height:     this.state.height,
            opacity:    this.state.fadeOut
        }];

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
                    overlayShow={this.state.overlayActive}
                />
                <View style={styles.container}>
                    <Animated.View style={animatedStyles}>
                        <View
                            style={{
                                backgroundColor: 'rgba(224, 224, 224, .9)',
                                borderRadius: 40,
                                overflow:   'hidden',
                            }}
                        >
                                {
                                    isError ? (
                                    <View
                                            style={{
                                                flex:   1,
                                                flexDirection:  'row',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                alignItems:     'center',
                                                height: 75,
                                            }}
                                        >
                                        <AwesomeIcon
                                            style={{
                                                textAlign: 'center',
                                                marginRight: 10,
                                                marginLeft: 5,
                                            }}
                                            name="times-circle"
                                            size={80} color="rgb(214, 62, 62)"
                                        />
                                        <Text style={{
                                            position: 'relative',
                                            textAlign: 'center',
                                            fontSize: 20,
                                            marginRight: 10,
                                            maxWidth:       200,
                                            maxHeight:      50,
                                            overflow:       'hidden',
                                        }}>{ msg && this.processEllipsis(msg) || 'too bad. try again.' }</Text>
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            flex:   1,
                                            flexDirection:  'row',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems:     'center',
                                            height: 75,
                                        }}
                                    >
                                        <AwesomeIcon
                                            style={{
                                                textAlign: 'center',
                                                marginRight: 10,
                                                marginLeft: 5,
                                            }}
                                            name="check-circle-o"
                                            size={80} color="rgb(67, 177, 67)"
                                        />
                                        <Text style={{
                                            position: 'relative',
                                            textAlign: 'center',
                                            fontSize: 20,
                                            marginRight: 10,
                                            maxWidth:       200,
                                            maxHeight:      50,
                                            overflow:       'hidden',
                                        }}>{ msg && this.processEllipsis(msg) || 'good job!' }</Text>
                                    </View>
                                )
                                }
                        </View>
                    </Animated.View>
                </View>
			</View>
		)
	}
}

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(null, mapDispatch)(PopupNotifyOverlay)

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

const styles = {
	//dis makes android cry with Object.freeze
	// ...styles,
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.0)',
		justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
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
};