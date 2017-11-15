import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Button from 'react-native-button';

import { StackNavigator, DrawerButton } from 'react-navigation';

import Home             from '../components/home';
import About            from '../components/about';
import CategoryStore    from '../components/categoryStore';
import CategoryItemDetails     from '../components/categoryStore/categoryItemDetails';
import CartItemDetails         from '../components/checkout/checkoutSummary/cartItemDetails';
import Checkout         from '../components/checkout';
import StoreSelect      from '../components/storeselect'

import User             from '../components/user';
import Account          from '../components/user/account';
import PaymentMethods   from '../components/user/paymentmethods';
import Orders           from '../components/orders';
import Order            from '../components/orders/order';
import Receipt          from '../components/orders/receipt';

import Login    from '../components/login';

import styles   from '../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const backIcon = (<Text><AwesomeIcon name="chevron-up" size={20} color="grey" /></Text>);

const flexHeaderAmount = 0.1

const BackButton= ({navigation}) => (
            <Button
                style={{
                    flex: 1,

                }}
                onPress={()=>{
                    navigation.goBack();
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    {backIcon}
                </View>
            </Button>
)

export const MainCardNavigator = StackNavigator({
    User: {
        screen: User,
        navigationOptions: {
            // header: null
            title: 'Account Info'
        }
    },

    Account: {
        screen: Account,
        navigationOptions: {
            title: 'Account information'
        }
    },

    Orders: {
        screen: Orders,
        navigationOptions: {
            title: 'Orders History'
        }
    },

    PaymentMethods: {
        screen: PaymentMethods,
        navigationOptions: {
            title: 'Payment Methods'
        }
    },

    StoreSelect: {
        screen: StoreSelect,
        navigationOptions: {
            // header: null
            title: 'Select a store'
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#2A2F3A',
            }
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            title: 'About',
        }
    },
    CategoryStore: {
        screen: CategoryStore
    },
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#2A2F3A',
            //TODO: this not really working
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,   //remove shadow on iOS
        },
        headerTintColor: '#8393b1',
    }
});


export default StackNavigator({
	MainCardNavigator: { screen: MainCardNavigator },

	Checkout: {
		screen: Checkout,
		navigationOptions: {
			title: 'Checkout',

			header: ({navigation}) => (
				<View
					style={{
						backgroundColor: 	'#2A2F3A',
						//TODO: to be removed this whole thing
						flex: 				flexHeaderAmount,
						justifyContent: 	'center',
					}}
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
	},
	CategoryItemDetails: {
		screen: CategoryItemDetails,
		navigationOptions: {
			title: 'Checkout',

			header: ({navigation}) => (
				<View
					style={{
						backgroundColor: 	'#2A2F3A',
						//TODO: to be removed this whole thing
						flex: 				flexHeaderAmount,
						justifyContent: 	'center',
					}}
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
    },

    CartItemDetails: {
		screen: CartItemDetails,
		navigationOptions: {

			header: ({navigation}) => (
				<View
					style={{
						backgroundColor: 	'#2A2F3A',
						//TODO: to be removed this whole thing
						flex: 				flexHeaderAmount,
						justifyContent: 	'center',
					}}
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
	},

	Login: {
		screen: Login,
		navigationOptions: {
			title: 'Login',

			header: ({navigation}) => (
				<View
					style={{
						backgroundColor: 	'#2A2F3A',
						//TODO: to be removed this whole thing
						flex: 				flexHeaderAmount,
						justifyContent: 	'center',
					}}
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
    },

    AccountModal: {
        screen: Account,
        navigationOptions: {
            title: 'Account information',

            header: ({navigation}) => (
                <View
                    style={{
                        backgroundColor: 	'#2A2F3A',
                        //TODO: to be removed this whole thing
                        flex: 				flexHeaderAmount,
                        justifyContent: 	'center',
                    }}
                >
                <BackButton
                    navigation={navigation}
                />
                </View>
            )
        }
    },

    ReceiptModal: {
        screen: Receipt,
        navigationOptions: {
            title: 'Receipt',

            header: ({navigation}) => (
                <View
                    style={{
                        backgroundColor: 	'#2A2F3A',
                        //TODO: to be removed this whole thing
                        flex: 				flexHeaderAmount,
                        justifyContent: 	'center',
                    }}
                >
                <BackButton
                    navigation={navigation}
                />
                </View>
            )
        }
    },

    Order: {
        screen: Order,
        navigationOptions: {
            title: 'Order',

            header: ({navigation}) => (
                <View
                    style={{
                        backgroundColor: 	'#2A2F3A',
                        //TODO: to be removed this whole thing
                        flex: 				flexHeaderAmount,
                        justifyContent: 	'center',
                    }}
                >
                <BackButton
                    navigation={navigation}
                />
                </View>
            )
        }
    },

    OrdersModal: {
        screen: Orders,
        navigationOptions: {
            title: 'Orders',

            header: ({navigation}) => (
                <View
                    style={{
                        backgroundColor: 	'#2A2F3A',
                        //TODO: to be removed this whole thing
                        flex: 				flexHeaderAmount,
                        justifyContent: 	'center',
                    }}
                >
                <BackButton
                    navigation={navigation}
                />
                </View>
            )
        }
    },

},{
	mode: 'modal',
	initialRouteName:'MainCardNavigator',
	navigationOptions: {
		header: null
	}
}
);
