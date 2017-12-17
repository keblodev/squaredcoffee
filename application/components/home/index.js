import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import {GEO_ACTIVE} from '../../statics/strings/geo';

import HomeListItem from './homelistitem';

import AwesomeIcon  from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const userIcon = (<AwesomeIcon
    style={{
        textShadowColor: 	'rgba(0,0,0, .7)',
		textShadowRadius: 	4,
		textShadowOffset: 	{
				height: 1,
				width: 1,
			}
    }}
    name="user" size={30} color="grey" />)
const cartIcon = (<AwesomeIcon
    style={{
        textAlign:          'center',
        textShadowColor: 	'rgba(0,0,0, .7)',
		textShadowRadius: 	2,
		textShadowOffset: 	{
				height: 1,
				width: 1,
			}
    }}
    name="shopping-cart" size={30} color="grey"/>)

class Home extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
    })

    componentWillMount() {
        this.props.actions.dropCart();
    }

    onCategorySelected = categoryId => this.props.actions.selectCategory(categoryId);

    render = () => {
        const { navigate }      = this.props.navigation;
        const { shopId }        = this.props.navigation.state.params;
        const {images, categories}  = this.props;
        const {assetsRoute}         = this.props.appConfig;
        const shopCategories = categories && categories.byShopId[shopId] || [];
        const isLoggedIn = !!this.props.user.auth;

        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 110
                    }}
                    // contentInset={{top: 0, left: 0, bottom: 110, right: 0}}
                    contentOffset={{x:0,y:0}}
                >
                    <HomeListItem
                        imgUrl={`${assetsRoute}/${images[shopId+'about']}`}
                        navToRouteId='About'
                        navRouteTitle='About Us'
                        navigate={navigate}
                    />
                    {
                        shopCategories.sort((a,b) => a.sortOrder - b.sortOrder).map((category, idx) => {
                            const url = images[category.id] && `${assetsRoute}/${images[category.id]}`;

                            return (
                                <HomeListItem
                                    imgUrl={url}
                                    key={idx}
                                    navToRouteId='CategoryStore'
                                    navRouteTitle={category.name}
                                    navigate={navigate}
                                    actionCb={this.onCategorySelected.bind(this, category.id)}
                                />
                            )
                        })
                    }
                    </ScrollView>
                    <View
                        style={{
                            backgroundColor:    'transparent',
                            position:           'absolute',
                            bottom:             0,
                            flexDirection:      'row',
                        }}
                    >
                        {
                        isLoggedIn ? (
                            <Button
                                style={styles.buttonStyle}
                                onPress={()=>navigate('User')}
                            >
                                <View
                                    style={{
                                        padding:40,
                                        paddingLeft: 60,
                                        paddingRight: 60,

                                    }}
                                >
                                    {userIcon}
                                </View>
                            </Button>
						) : (
							<Button
								onPress={()=>navigate('Login')}
							>
								<View
									style={{
										padding:40,
										paddingLeft: 60,
										paddingRight: 60,
									}}
								>
									<Text
										style={{
											fontSize: 20,
											color: 'grey',
                                            textAlign: 'center',
                                            textShadowColor: 	'rgba(0,0,0, .7)',
                                            textShadowRadius: 	4,
                                            textShadowOffset: 	{
                                                    height: 1,
                                                    width: 1,
                                                }
										}}
									>Login/Sign Up</Text>
								</View>
							</Button>
						)
					}
					<Button
						style={styles.buttonStyle}
						onPress={()=>navigate('Checkout')}
					>
						<View
							style={{
								padding:40,
								paddingLeft: 60,
								paddingRight: 60,
							}}
						>
							{cartIcon}
						</View>
					</Button>
				</View>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
        user:           state.user,
        categories:     state.shops.categories,
        images:         state.images,
        appConfig:      state.appConfig,
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(Home)

const buttonStyle = {
		padding:20,
		margin: 10,
		height:65,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: '#41495a',
		fontSize: 20,
		color: 'grey',
    };

const styles = {
	container: {
		alignItems: 		'center',
		backgroundColor: 	'#1f232b',
		flex: 				1,
		justifyContent: 	'center',
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#313744',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
};
