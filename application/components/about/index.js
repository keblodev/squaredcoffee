import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button';
import format from 'date-fns/format';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import AddressButton from '../shared/addressButton';
import PhoneButton from '../shared/phoneButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import styles from '../../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class About extends Component {

    render = () => {
        const {selectedShop} = this.props
        const {desc} = selectedShop;

        let address = [];
        let storePhoneNumber = '';

        if(selectedShop && selectedShop.address) {
            const {address1, address2, city, country, state, zip, phoneNumber} = JSON.parse(selectedShop.address);
            storePhoneNumber = phoneNumber;
            address = [address1, address2, city, country, state, zip].filter(val=>!!val);
        }

        let schedule = [];
        let daysDic = ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'];

        if(selectedShop.opening_hours) {
            const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = JSON.parse(selectedShop.opening_hours);
            schedule = [monday,tuesday,wednesday,thursday,friday,saturday,sunday]
            .map(day => {
                return day.elements.map(range => {
                    return {
                        start: format(new Date().setHours(range.start/100,range.start%100,0,0), 'hh:mm A'),
                        end:format(new Date().setHours(range.end/100,range.end%100,0,0), 'hh:mm A'),
                    }
                })
            });
        }

        return (
            <View
                style={{
                    ...styles.container,
                    justifyContent: 'center',
                    height: '100%'
                }}
            >
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >

                    {
                        desc ? (
                            <View
                                style={{
                                    alignSelf: 'center',
                                    padding: 20,
                                    borderWidth: 1,
                                    borderColor: 'lightgray',
                                    borderRadius: 5,
                                    margin: 10,
                                    width: '90%'
                                }}
                            >
                            <Text
                                    style={{
                                        fontSize: 20,
                                        color: 'gray',
                                        width: '100%',
                                    }}
                                >
                                    {desc}
                                </Text>
                            </View>
                        ) : null
                    }

                    <AddressButton
                        address={address}
                        name={selectedShop.name}
                    />
                    {
                        storePhoneNumber ?
                        <PhoneButton
                            phoneNumber={storePhoneNumber}
                        /> : null
                    }
                    <Text
                        style={{
                            fontSize:   20,
                            color:      'gray',
                            textAlign:  'center',
                            width:      '100%',
                        }}
                    >
                        Weekly Schedule
                    </Text>
                    <View
                        style={{
                            alignSelf: 'center',
                            padding: 20,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            margin: 10,
                            width: '90%'
                        }}
                    >
                            {
                                schedule.map((day, idx) => {
                                    return (
                                        <View
                                            key={idx}
                                            style={{
                                                // flex:           1,
                                                // flexDirection:  'row',
                                                // alignContent:   'space-between',
                                                position: 'relative'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    left: 5,
                                                    zIndex: 20,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        color: 'gray',
                                                        width: '100%',
                                                    }}
                                                >
                                                    {daysDic[idx]}:
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    backgroundColor: 'transparent'
                                                }}
                                            >
                                                {
                                                    day.length ? day.map((range, idx) => {
                                                        return (
                                                            <Text
                                                                style={{
                                                                    fontSize:   20,
                                                                    color:      'gray',
                                                                    textAlign:  'right',
                                                                    width:      '100%',
                                                                }}
                                                                key={idx}
                                                            >
                                                                {range.start} - {range.end}
                                                            </Text>
                                                        )
                                                    }) : (
                                                        <Text
                                                            style={{
                                                                fontSize:   20,
                                                                color:      'gray',
                                                                textAlign:  'right',
                                                                width:      '100%',
                                                            }}
                                                        >
                                                            Closed
                                                        </Text>
                                                    )
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const mapState = (state) => {
    return {
        selectedShop: state.shops.selected
    };
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(About)
