import React, { Component }             from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import Button                           from 'react-native-button'
import { KeyboardAwareScrollView }      from 'react-native-keyboard-aware-scroll-view';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import CreditCard, {CardImages} from 'react-native-credit-card';
import Swiper from 'react-native-swiper';

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import AppActions               from '../../../actions';

import { Hoshi } from 'react-native-textinput-effects';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SWIPER_HEIGHT = 320;

class CreditCardView extends Component {

    initialState = {
        focused:    'number',
        index:      0,
        number:     {
            value: '',
            valid: true,
        },
        name:       {
            value: '',
            valid: true,
        },
        cvc:        {
            value: '',
            valid: true,
        },
        expiry:     {
            value: '',
            valid: true,
        },
    }

    indexMap = [
        'number',
        'name',
        'expiry',
        'cvc',
    ];

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    componentDidMount() {
        this.refs['number'].focus();
    }

    onNext = () => {
        this.swiper.scrollBy(1);
    }

    onSubmit = () => {
        validItems = this.indexMap.filter(key => {
            const item = this.state[key];
            return item && item.value && item.valid
        }).map(key => ({
            key,
            ...this.state[key],
        }))

        if (validItems.length === this.indexMap.length) {
            this.props.actions.submitPayment(validItems)
        } else {
            debugger;
            this.setState({...this.initialState})
        }
    }

    onMomentumScrollEnd = (e, state, context) => {
        this.setState({
            index:      state.index,
            focused:    this.indexMap[state.index]
        });
    }

    onInputBlur = () => {

    }

    onInputChange = () => {

    }

    render = () => {

        validItems = this.indexMap.filter(key => {
            const item = this.state[key];
            return item && item.value && item.valid
        }).map(key => ({
            key,
            ...this.state[key],
        }))

        const canPay = validItems.length === this.indexMap.length

        return (
            <View
                style={{
                    ...styles.container,
                    height:     '100%'
                }}
            >
                <ScrollView
                    style={{
                        flex:   1,
                    }}
                    keyboardShouldPersistTaps="always"
                >
                    <CreditCard
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 10,
                            marginBottom: 20,
                            elevation: 3,
                            alignSelf: 'center',
                            // position: 'absolute',
                            backgroundColor: '#41495a',
                        }}
                        type="none"
                        imageFront  ={require('../../../statics/images/card-front.png')}
                        imageBack   ={require('../../../statics/images/card-back.png')}
                        shiny={false}
                        bar={false}
                        focused={this.state.focused}
                        number={this.state.number.value}
                        name={this.state.name.value}
                        expiry={this.state.expiry.value}
                        cvc={this.state.cvc.value}/>

                    <Swiper
                        style={styles.wrapper}
                        height={SWIPER_HEIGHT}
                        // showsButtons={true}
                        loop={false}
                        keyboardShouldPersistTaps="always"
                        onMomentumScrollEnd = {this.onMomentumScrollEnd}
                        ref={(swiper) => {this.swiper = this.swiper || swiper}}
                        index={this.state.index}
                    >
                        <View style={styles.slide}>
                            <View style={styles.card}>
                                <ScrollView
                                    style={{
                                        flex:   1,
                                    }}
                                    keyboardShouldPersistTaps="always"
                                >
                                <Hoshi
                                    style={{
                                        borderBottomColor:  'gray',
                                    }}
                                    ref="number"
                                    // autoFocus={true}
                                    label="Card Number"
                                    // TextInput props
                                    maxLength={16}
                                    borderColor="transparent"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={false}
                                    autoCorrect={false}
                                    onBlur={this.onInputBlur}
                                    onChangeText={(number) => {
                                        if (!isNaN(number !== undefined && parseInt(number))) {
                                            this.setState({number: {
                                                ...this.state.number,
                                                value: parseInt(number),
                                            }})
                                        } else {
                                            this.setState({number: {
                                                ...this.state.number,
                                                value: '',
                                                valid: false,
                                            }})
                                        }
                                    }}
                                    value={""+this.state.number.value}
                                    enablesReturnKeyAutomatically={true}
                                    autoCapitalize="none"
                                    onSubmitEditing={({ nativeEvent: { key: keyValue } })=>{
                                        const {number:{value}} = this.state;
                                        const pattern = '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$';
                                        if (new RegExp(pattern, 'gi').test(value)) {
                                            this.refs[this.indexMap[this.state.index+1]].focus();
                                            this.setState({number: {
                                                value: parseInt(value),
                                                valid: true,
                                            }},()=>this.onNext())
                                        } else {
                                            this.setState({number:{
                                                value: "",
                                                valid: false,
                                            }})
                                        }
                                    }}
                                />
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.card}>
                                <Hoshi
                                    style={{
                                        borderBottomColor:  'gray',
                                    }}
                                    ref="name"
                                    autoFocus={true}
                                    label="Card Holder's Name"
                                    // TextInput props
                                    maxLength={20}
                                    borderColor="transparent"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={false}
                                    autoCorrect={false}
                                    onBlur={this.onInputBlur}
                                    onChangeText={(name) => {
                                        if (new RegExp(/^[a-z\u00C0-\u02AB'´`\s]+$/i).test(name)) {
                                            this.setState({name: {
                                                ...this.state.name,
                                                value: name,
                                            }})
                                        } else {
                                            this.setState({name: {
                                                ...this.state.name,
                                                value: '',
                                                valid: false,
                                            }})
                                        }
                                    }}
                                    value={""+this.state.name.value}
                                    enablesReturnKeyAutomatically={true}
                                    autoCapitalize="none"
                                    onSubmitEditing={({ nativeEvent: { key: keyValue } })=>{
                                        const {name:{value}} = this.state;
                                        if (new RegExp(/^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i).test(value)) {
                                            this.refs[this.indexMap[this.state.index+1]].focus();
                                            this.setState({name: {
                                                value: value,
                                                valid: true,
                                            }},()=>this.onNext())
                                        } else {
                                            this.setState({name:{
                                                value: "",
                                                valid: false,
                                            }})
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.card}>
                                <Hoshi
                                    style={{
                                        borderBottomColor:  'gray',
                                    }}
                                    ref="expiry"
                                    autoFocus={true}
                                    label="Expiry (MM/YY)"
                                    // TextInput props
                                    maxLength={4}
                                    borderColor="transparent"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={false}
                                    autoCorrect={false}
                                    onBlur={this.onInputBlur}
                                    onChangeText={(expiry) => {
                                        const pattern = '^([0-9]){1,4}$';

                                        if (new RegExp(pattern, 'gi').test(expiry)) {
                                            this.setState({expiry: {
                                                ...this.state.expiry,
                                                value: expiry,
                                            }})
                                        } else {
                                            this.setState({expiry: {
                                                ...this.state.expiry,
                                                value: '',
                                                valid: false,
                                            }})
                                        }
                                    }}
                                    value={""+this.state.expiry.value}
                                    enablesReturnKeyAutomatically={true}
                                    autoCapitalize="none"
                                    onSubmitEditing={({ nativeEvent: { key: keyValue } })=>{
                                        const {expiry:{value}} = this.state;
                                        const pattern = '^(\\d{2})(\\d{2})$';

                                        const match = value.match(new RegExp(pattern));

                                        if (match) {
                                            const month = match[1];
                                            const year  = match[2];

                                            const expDate = new Date();
                                            expDate.setFullYear(20+year,+month-1);

                                            const today = new Date()

                                            if (+month <= 12 && +month > 0
                                                // exp should be at least one month ahead
                                                && (expDate - today)/1000/60/60/24 > 30
                                            ) {
                                                this.refs[this.indexMap[this.state.index+1]].focus();
                                                this.setState({expiry: {
                                                    value: value,
                                                    valid: true,
                                                }},()=>this.onNext())
                                            } else {
                                                this.setState({expiry:{
                                                    value: "",
                                                    valid: false,
                                                }})
                                            }
                                        } else {
                                            this.setState({expiry:{
                                                value: "",
                                                valid: false,
                                            }})
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.card}>
                                <Hoshi
                                    style={{
                                        borderBottomColor:  'gray',
                                    }}
                                    ref="cvc"
                                    autoFocus={true}
                                    label="CVV/CVC Number"
                                    // TextInput props
                                    maxLength={3}
                                    borderColor="transparent"
                                    keyboardType="default"
                                    returnKeyType="done"
                                    secureTextEntry={false}
                                    autoCorrect={false}
                                    onBlur={this.onInputBlur}
                                    onChangeText={(cvc) => {
                                        if (cvc !== undefined && !isNaN(parseInt(cvc))) {
                                            this.setState({cvc: {
                                                ...this.state.cvc,
                                                value: parseInt(cvc),
                                            }})
                                        } else {
                                            this.setState({cvc: {
                                                value: '',
                                                valid: false,
                                            }})
                                        }
                                    }}
                                    value={""+this.state.cvc.value}
                                    enablesReturnKeyAutomatically={true}
                                    autoCapitalize="none"
                                    onSubmitEditing={({ nativeEvent: { key: keyValue } })=>{
                                        const {cvc:{value}} = this.state;
                                        const pattern = '^[0-9]{3}$';
                                        if (new RegExp(pattern, 'gi').test(value)) {
                                            this.setState({cvc:{
                                                value: parseInt(value),
                                                valid: true,
                                            }})
                                            // this.onSubmit()
                                        } else {
                                            this.setState({cvc:{
                                                value: "",
                                                valid: false,
                                            }})
                                        }
                                    }}
                                />
                                <View
                                    style={{
                                        position:   'absolute',
                                        bottom:     -80,
                                        left:       0,
                                        right:      0,
                                    }}
                                >
                                    <View
                                        style={{
                                            flex:1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 20,
                                            borderWidth: 1,
                                            borderColor: 'lightgray',
                                            borderRadius: 5,
                                            margin: 10,
                                        }}
                                    >
                                        {
                                            this.indexMap.map((key, idx) => {
                                                return (
                                                    <Text
                                                        key={idx}
                                                        style={{
                                                            color: 'gray',
                                                        }}
                                                    >
                                                        {key}: <AwesomeIcon name={this.state[key].valid ? "check" : "times"} size={20} style={{textAlign: 'center',}}/>
                                                    </Text>
                                                )
                                            })
                                        }
                                    </View>
                                    <Button
                                        disabled={!canPay}
                                        style={canPay ? styles.buttonStyle : styles.buttonDisabledStyle}
                                        onPress={this.onSubmit}
                                    >
                                        Pay Now
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Swiper>
                </ScrollView>
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user
    };
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(CreditCardView);

const buttonStyle = {
    padding:15,
    margin: 10,
    height:55,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: '#41495a',
    fontSize: 20,
    color: 'grey',
};

const styles = {
    container: {
        backgroundColor: 	'#1f232b',
        flex: 				1,
        justifyContent: 	'space-around',
        height:             '100%',
    },
    wrapper: {
        minHeight:         SWIPER_HEIGHT,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {

    },
    card: {
        marginHorizontal: 10,
        marginBottom: 30,
        padding: 10,
        minHeight: 180,
        height: 180,
        width:  '90%',
    },
    buttonStyle,
    buttonDisabledStyle: {
        ...buttonStyle,
        backgroundColor:    '#313744',
        borderWidth:        0,
        color:              '#525252',
    },
    textButton: {
        textAlign: 'center',
        color: '#fff'
    }
};