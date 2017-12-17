import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Linking } from 'react-native';

import Button from 'react-native-button'

import ModalDropdown from 'react-native-modal-dropdown';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const cartIcon = (<AwesomeIcon name="shopping-cart" size={20} style={{textAlign: 'center',}}/>)
const dropDownIcon = (<AwesomeIcon name="caret-down" size={20} style={{textAlign: 'center',}}/>)

import BaseLoader from '../../shared/baseLoader';

class CategoryItemDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 	true,
        }
    }

    onGroupModifierSelect = (modifierGroupId, modifiersArray, idx, text) => {
        const selectedItem = modifiersArray[idx];
        const modifierId = selectedItem.id;
        this.props.actions.selectModifier({modifierGroupId, modifierId});
        console.log(selectedItem);
        // TODO:
    }

    componentWillMount() {
        const {assetsRoute} = this.props.appConfig;

        const imgId = this.props.images[this.props.item.id];

        imgId && Image.prefetch(`${assetsRoute}/${this.props.images[this.props.item.id]}`)
            .then(ok => {
                this.setState({
                    loading:false
                })
            })
    }

    render = () => {
        const {navigate}            = this.props.navigation;
        const {cart, item, images}  = this.props;
        const imgId = images[this.props.item.id];
        const {assetsRoute} = this.props.appConfig;

        if (!item) {
            this.props.navigation.goBack()
        }

        const inCartCount = cart.ids.reduce((acc, uuid) => {
            return acc + (item.id === cart.byUuid[uuid].id ? 1 : 0)
        },0);
        // const cartItem              = cart.byUuid[item && item.id];

        const disabled = false;

        const price = item && item.priceCalculated/100 || 0;
        // well lovely clover has no currency, so it's always USD now
        const currency = 'USD';
        const modifierGroups = item && item.modifierGroups && item.modifierGroups.elements || [];
        return item ? (
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
                                                maxWidth:   '85%',
                                                maxHeight:  120,
                                            }}>{item.name}</Text>
                                        </CardTitle>
                                        <CardTitle
                                            styles={{
                                                cardTitle: {
                                                    position: 'absolute',
                                                    right:  0,
                                                    top:    0,
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
                                                }}>{(price)}</Text>
                                                <Text style={{
                                                    ...itemStyles.title,
                                                    fontSize:   20,
                                                    textAlign:  'right'
                                                }}>{currency}</Text>
                                                    {
                                                        inCartCount ?
                                                        <Text
                                                            style={{
                                                                ...itemStyles.title,
                                                                textAlign: 'right',
                                                                fontSize: 15,
                                                            }}
                                                        >{cartIcon} {inCartCount}</Text>
                                                        : null
                                                    }
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
                                                    paddingLeft:    20,
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
                                                <View
                                                    style={{
                                                        flex:           1,
                                                        flexGrow:       1,
                                                        justifyContent: 'flex-end',
                                                        flexDirection: 'row',
                                                        width:          '5%',
                                                        alignItems:     'center',
                                                    }}
                                                >
                                                    <ModalDropdown
                                                        style={{
                                                            height:          '100%',
                                                        }}
                                                        textStyle={{
                                                            fontSize:       16,
                                                            color:          'gray',
                                                            padding:        20,
                                                            paddingRight:   30,
                                                            paddingLeft:    40,
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
                                                    <Text
                                                        style={{
                                                            fontSize:       16,
                                                            color:          'gray',
                                                            paddingRight:   10,
                                                            position:       'absolute',
                                                            backgroundColor:'transparent',
                                                        }}
                                                    >{dropDownIcon}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }

                                <CardAction >
                                    <Button
                                        style={itemStyles.buttonStyle}
                                        onPress={this.props.actions.cartAdd.bind(this, item)}
                                    >
                                        + to Cart
                                    </Button>
                                </CardAction>
                        </Card>
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right:  0
                    }}
                >
                    <Card
                        styles={{card: {
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        <View>
                            <CardAction>
                                <Button
                                    style={{
                                        ...styles.buttonStyle,
                                        borderRadius: 22
                                    }}
                                    onPress={()=> {
                                        navigate('Checkout');
                                    }}
                                >
                                    Checkout
                                </Button>
                            </CardAction>
                        </View>
                    </Card>
                </View>
            </View>
        ) : (
            <View
                style={{
                    ...styles.container,
                    height: '100%'
                }}
            ></View>
        );
	}
};

const mapState = (state) => {
    return {
        cart:       state.cart,
        item:       state.shops.items.selected,
        images:     state.images,
        appConfig:  state.appConfig,
    };
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(CategoryItemDetails)

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
		fontSize:		 	30,
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