import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button'

import About from '../about';
import Drinks from '../drinks';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions';

import {GEO_ACTIVE} from '../../statics/strings/geo';

import HomeListItem from './homelistitem';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const userIcon = (<AwesomeIcon name="user-o" size={30} color="grey" />)
const cartIcon = (<AwesomeIcon name="shopping-cart" size={30} color="grey" />)

const matIcon1 = (<MaterialIcon name="face" size={30} color="grey"/>);

const staticImagesBullShit = [
	//TODO: images should come from uri
	//TODO: cache remote images
	[
		require('../../statics/images/shopscontent/0/home/about.jpg'),
		require('../../statics/images/shopscontent/0/home/drinks.jpg'),
		require('../../statics/images/shopscontent/0/home/food.jpg'),
	],
	[
		require('../../statics/images/shopscontent/1/home/about.jpg'),
		require('../../statics/images/shopscontent/1/home/drinks.jpg'),
		require('../../statics/images/shopscontent/1/home/food.jpg'),
	]
];

class Home extends Component {

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.title}`,
    })

    componentWillMount() {
        this.props.actions.dropCart();
    }

	render = () => {
		const { navigate } = this.props.navigation;
		const { shopId } = this.props.navigation.state.params;
		const isLoggedIn = !!this.props.user.auth;
		return (
			<View style={styles.container}>
				<ScrollView
					scrollEnabled={false}
					centerContent={true}
				>
					<HomeListItem
						shopImg={staticImagesBullShit[shopId][0]}
						navToRouteId='About'
						navRouteTitle='About Us'
						navigate={navigate}
					/>
					<HomeListItem
						shopImg={staticImagesBullShit[shopId][1]}
						navToRouteId='Drinks'
						navRouteTitle='Coffee?'
						navigate={navigate}
					/>
					{/* <HomeListItem
						disabled={true}
						shopImg={staticImagesBullShit[shopId][2]}
						navToRouteId='Foods'
						navRouteTitle='Something to eat'
						navigate={navigate}
					/> */}
				</ScrollView>
				<View
					style={{
						flexDirection: 'row'
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
										paddingLeft: 80,
										paddingRight: 80,
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
										paddingLeft: 80,
										paddingRight: 80,
									}}
								>
									<Text
										style={{
											fontSize: 20,
											color: 'grey',
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
								paddingLeft: 80,
								paddingRight: 80,
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
		user: 		state.user
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
