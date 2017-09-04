import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';

import Button from 'react-native-button';

import styles from '../../../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class FetchOverlay extends Component {

    static ANIMATION_TIMEOUT    = 300

    constructor(props) {
        super(props);
        this.state = {
            bottom:         new Animated.Value(-100),
            fadeOut: 	    new Animated.Value(0),
            rotation:       new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.animateIn()
    }

    componenWillUnmount() {
        this.state.rotation.stopAnimation();
    }

    animateIn() {
        this.animateRotation();
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.fadeOut,
                    {
                        toValue: 	1,
                        duration: 	FetchOverlay.ANIMATION_TIMEOUT,
                    }
                ),
                Animated.timing(
                    this.state.bottom,
                    {
                        toValue: 	20,
                        duration: 	FetchOverlay.ANIMATION_TIMEOUT,
                        easing: 	Easing.out(Easing.cubic)
                    }
                ),
            ])
        ]).start();
    }

    animateRotation() {
        this.state.rotation.setValue(0)
        Animated.timing(
            this.state.rotation,
            {
                toValue: 	360,
                duration: 	FetchOverlay.ANIMATION_TIMEOUT+800,
                easing: 	Easing.out(Easing.cubic)
            }
        ).start((anim)=> {
            if (anim.finished) {
                this.animateRotation();
            }
        });
    }

    render() {
        const {overlayShow, msg} = this.props;
        const rotate = { rotate: this.state.rotation + 'deg'}
        return (
            <Animated.View
                style={[{
                    position:           'absolute',
                    bottom:             this.state.bottom,
                    left:               20,
                    right:              0,
                    flex:               1,
                    alignItems:         'center',
                    opacity:            this.state.fadeOut,
                    width:              '40%'
                }]}
            >
                <View
                    style={{
                        ...stylesLocal.container,
                        borderRadius:       40,
                        backgroundColor:    'rgba(0,0,0, .2)',
                        flex:               1,
                        flexDirection:      'row',
                        padding:            10,
                        width:              '100%',
                    }}
                >
                    <Animated.View
                        style={[{
                            transform: [{rotate: this.state.rotation.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg']
                            })}
                            ],
                        }]}
                    >
                        <AwesomeIcon
                                style={{
                                    textAlign: 'center',
                                    //marginRight: 10,
                                    //marginLeft: 5,
                                }}
                                name="refresh"
                                size={20} color="rgb(67, 177, 67)"
                        />
                    </Animated.View>
                    <View
                        style={{
                            marginLeft: 5
                        }}
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
            </Animated.View>
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

const stylesLocal = {
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
};