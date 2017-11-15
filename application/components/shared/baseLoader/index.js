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
            <View
                style={{
                    backgroundColor: 'transparent'
                }}
            >
                <Animated.View
                    style={[{
                        transform: [{rotate: this.state.rotation.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg']
                        })}],
                    }]}
                >
                    <AwesomeIcon
                            style={{
                                textAlign: 'center',
                                paddingTop:     20,
                                paddingBottom:  20,
                                backgroundColor: 'transparent'
                            }}
                            name="refresh"
                            size={20} color="gray"
                    />
                </Animated.View>
            </View>
        )
    }
}