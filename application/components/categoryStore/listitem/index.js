import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const cartIcon = (<AwesomeIcon name="shopping-cart" size={20} style={{textAlign: 'center',}}/>)

import BaseLoader from '../../shared/baseLoader';

class CategoryListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 	true,
        }
    }

    componentWillMount() {
        const {imgUrl} = this.props;
        imgUrl && Image.prefetch(imgUrl)
            .then(ok => {
                this.setState({
                    loading:false
                })
            })
    }

    render = () => {
        const {item, addItem, imgUrl, actionCb, disabled, navigate, inCartCount, cartItem} = this.props;
    // well lovely clover has no currency, so it's always USD now
    item.currency = 'USD';

        return (
            <View
            >
                <Button
                    disabled={disabled}
                    onPress={() => {
                            actionCb && actionCb();
                            navigate("CategoryItemDetails", {title: item.name});
                        }
                    }
                >
                    {
                        !this.state.loading || !imgUrl ? (
                            <Card
                                styles={{
                                    card: {
                                        backgroundColor: '#41495a',
                                        overflow: 'hidden'
                                    }
                                }}
                            >
                                { imgUrl ? (
                                    <Image
                                        style={itemStyles.image}
                                        source={{uri:imgUrl}}
                                    />
                                ) : null}
                                <View
                                    style={{
                                        ...(disabled ?
                                            {
                                                ...itemStyles.card,
                                                ...itemStyles.cardDisabled
                                            } : itemStyles.card),
                                    }}
                                >
                                    <Text style={{
                                        ...itemStyles.title,
                                        fontSize:       28,
                                        paddingTop:     15,
                                        paddingLeft:    15,
                                        maxWidth:       '90%',
                                        flex:1,
                                        flexWrap:'wrap'
                                    }}
                                    numberOfLines={3}
                                    // workaround due to line wrap bug in RN
                                    >{item.name + "              \u2060  \u2060"}</Text>
                                    <CardTitle
                                        styles={{
                                            cardTitle: {
                                                position: 'absolute',
                                                right: 	0,
                                                top: 	0
                                            }
                                    }}>
                                    <View>
                                        <Text style={{
                                            ...itemStyles.title,
                                            fontSize:  28,
                                        }}>{(item.price/100).toFixed(2)}</Text>
                                        <Text style={{
                                            ...itemStyles.title,
                                            fontSize: 	20,
                                            textAlign: 	'right'
                                        }}>{item.currency}</Text>
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
                                    <CardAction >
                                        <Button
                                        style={itemStyles.buttonStyle}
                                        onPress={addItem}
                                        >
                                            + to Cart
                                        </Button>
                                    </CardAction>
                                </View>
                            </Card>
                        ) : <BaseLoader />
                    }
                </Button>
            </View>
            );
    }
}

const mapState = (state) => {
    return {
        appConfig: state.appConfig,
    };
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
        connect(mapState, mapDispatch)(CategoryListItem);

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
            },
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
            },
	},
	titleDisabled: {
		color: 	'rgba(255,255,255, .6)',
	},
	cardDisabled: {
		backgroundColor: 	'rgba(0,0,0, .6)',
	}
};