import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

import Button from 'react-native-button'

import ModalDropdown from 'react-native-modal-dropdown';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../../actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const cartIcon = (<AwesomeIcon name="shopping-cart" size={20} style={{textAlign: 'center',}}/>)

import BaseLoader from '../../../shared/baseLoader';

class CartItemDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 	true,
        }
    }

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.title}` || "",
    })

    componentWillMount() {
        const {assetsRoute} = this.props.appConfig;

        const imgId = this.props.item && this.props.images[this.props.item.id];

        imgId && Image.prefetch(`${assetsRoute}/${imgId}`)
            .then(ok => {
                this.setState({
                    loading:false
                })
            })
    }


    onGroupModifierSelect = (modifierGroupId, modifiersArray, idx, text) => {
        const selectedItem = modifiersArray[idx];
        const modifierId = selectedItem.id;
        this.props.actions.selectCartItemModifier({modifierGroupId, modifierId});
        console.log(selectedItem);
        // TODO:
    }

    render = () => {
        const {navigate}            = this.props.navigation;
        const {cart, item, images}  = this.props;
        const imgId = item && images[item.id];
        const {assetsRoute}         = this.props.appConfig;
        // const cartItem              = cart.byUuid[item && item.id];

        const disabled = false;

        if (item) {
            const price = item && item.priceCalculated/100;
            // well lovely clover has no currency, so it's always USD now
            const currency = 'USD';

            const modifierGroups = item && item.modifierGroups && item.modifierGroups.elements || [];
            return (
                <View
                    style={{
                        ...styles.container,
                        height: '100%'
                    }}
                >
                    <ScrollView>

                            {
                                !this.state.loading || !imgId ? (
                                    <Card
                                        styles={{
                                            card: {
                                                backgroundColor: '#41495a',
                                                overflow: 'hidden'
                                            }
                                        }}
                                    >
                                        {
                                            imgId ? <Image
                                                style={itemStyles.image}
                                                source={{uri:`${assetsRoute}/${images[item.id]}`}}
                                            /> : null
                                        }
                                        <View
                                            style={
                                                disabled ?
                                                    {
                                                        ...itemStyles.card,
                                                        ...itemStyles.cardDisabled
                                                    } : itemStyles.card
                                            }
                                        >
                                            <CardTitle
                                                styles={{
                                                    cardTitle: {
                                                        height: 130
                                                    }
                                                }}
                                            >
                                                <Text style={{
                                                    ...itemStyles.title,
                                                    alignSelf: 'center',
                                                    maxWidth:   '90%',
                                                }}>{item.name}</Text>
                                            </CardTitle>
                                            <CardTitle
                                                styles={{
                                                    cardTitle: {
                                                        position: 'absolute',
                                                        right: 	0,
                                                        top: 	0,
                                                        bottom: 0,
                                                    }
                                            }}>
                                                <View
                                                    style={{
                                                        alignSelf: 'center',
                                                    }}
                                                >
                                                    <Text style={{
                                                        ...itemStyles.title,
                                                    }}>{(price).toFixed(2)}</Text>
                                                    <Text style={{
                                                        ...itemStyles.title,
                                                        fontSize: 	20,
                                                        textAlign: 	'right'
                                                    }}>{currency}</Text>
                                                    {/* {
                                                        cartItem ?
                                                        <Text
                                                            style={{
                                                                ...itemStyles.title,
                                                                textAlign: 'right',
                                                                fontSize: 15,
                                                            }}
                                                        >{cartIcon} {cartItem.qty}</Text>
                                                        : null
                                                    } */}
                                                </View>
                                            </CardTitle>
                                        </View>
                                    </Card>
                                ) : <BaseLoader />
                            }
                            <Card
                                    styles={{
                                        card: {
                                            overflow: 'hidden'
                                        }
                                    }}
                                >
                                    <View
                                        style={{
                                            padding: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: 'gray',
                                            }}
                                        >
                                        {item.alternateName}
                                        </Text>
                                    </View>
                                    {
                                        modifierGroups.map((modifierGroup, idx) => {

                                            const inSelectedModifierGroup = item.selectedModifiers.filter(mod => mod.id === modifierGroup.id).pop();
                                            const modifiersArray = modifierGroup.modifiers.elements;
                                            const selectedModifier = modifiersArray
                                                .filter((modifier) => modifier.id === inSelectedModifierGroup.selectedModifier.id)
                                                .reduce((acc, item, idx)=> ({...item, idx}),{});

                                            return (
                                                <View
                                                    key={idx}
                                                    style={{
                                                        alignSelf:      'center',
                                                        flex:           1,
                                                        alignItems:     'center',
                                                        justifyContent: 'space-between',
                                                        flexDirection: 'row',
                                                        padding:        20,
                                                        borderWidth:    1,
                                                        borderColor:    'lightgray',
                                                        borderRadius:   5,
                                                        margin:         10,
                                                        width:          '95%',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 20,
                                                            color: 'gray',
                                                        }}
                                                    >
                                                        {modifierGroup.name}
                                                    </Text>
                                                    <ModalDropdown
                                                        textStyle={{
                                                            fontSize: 16,
                                                            color: 'gray',
                                                        }}
                                                        dropdownTextStyle={{
                                                            fontSize: 16,
                                                            color: 'gray',
                                                        }}
                                                        dropdownStyle={{
                                                            height:         200,
                                                            borderRadius:   5,
                                                            width:          200,
                                                            overflow:       'hidden',
                                                            shadowColor:    '#000',
                                                            shadowOffset:   { width: 0, height: 2 },
                                                            shadowOpacity:  0.6,
                                                            shadowRadius:   10,
                                                        }}
                                                        defaultIndex={selectedModifier.idx}
                                                        defaultValue={selectedModifier.name}
                                                        options={modifiersArray.map((modifier, idx) => modifier.name)}
                                                        onSelect={this.onGroupModifierSelect.bind(this,modifierGroup.id, modifiersArray)}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                            </Card>
                    </ScrollView>
                </View>
            );
        } else {
            this.props.navigation.goBack();
            return (
                <View
                    style={{
                        ...styles.container,
                        height: '100%'
                    }}
                >
                    <View
                        style={{
                            alignSelf: 'center',
                            padding: 20,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 5,
                            margin: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'gray',
                            }}
                        >
                            <AwesomeIcon
                                        style={{
                                            position: 'absolute',
                                            left: 10,
                                            top: 8
                                        }}
                                        name="info-circle" size={20} color="grey" /> Well what can I say... Your cart really is EMPTY.
                        </Text>
                    </View>
                </View>
            )
        }
	}
};

const mapState = (state) => {
    return {
        cart:       state.cart,
        item:       state.cart.selected,
        images:     state.images,
        appConfig:  state.appConfig,
    };
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(CartItemDetails)

const itemStyles = {
	...styles,
	card: {
		backgroundColor: 'transparent',
		width: '100%'

	},
	cardViewContent: {
		backgroundColor: 	'rgba(0,0,0, .6)',
		borderRadius:		2,
		padding:			10,
	},
	image: {
		height: 	'100%',
		flex: 		1,
		position: 	'absolute',
		width: 		'100%',
	},
	text: {
		color: 				'white',
		textAlign: 			'left',
		textShadowColor: 	'rgba(0,0,0, .5)',
		textShadowRadius: 	2,
		textShadowOffset: 	{
				height: 1,
				width: 1,
			}
	},
	titleView: {
		backgroundColor: 	'rgba(0,0,0, .6)',
		borderRadius:		2,
		width:				'100%'
	},
	title: {
		color:		 		'white',
		fontSize:		 	40,
		textAlign:		 	'left',
		textShadowColor: 	'rgba(0,0,0, .5)',
		textShadowRadius: 	2,
		textShadowOffset: 	{
				height: 1,
				width: 1,
			}
	},
	titleDisabled: {
		color: 	'rgba(255,255,255, .6)',
	},
	cardDisabled: {
		backgroundColor: 	'rgba(0,0,0, .6)',
	}
};