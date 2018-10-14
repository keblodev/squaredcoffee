import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button'

import StoreListItem from './storelistitem';

import AppActions from '../../actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class StoreSelect extends Component {
    actionCb = shopId => this.props.actions.selectShop(shopId);

    __getAppInitials = () => {
        const {assetsRoute} = this.props.appConfig;
        this.props.actions.getAuthorizedShops();
    }

	render = () => {
        const { navigate }      = this.props.navigation;
        const {shops, images}   = this.props;
        const {assetsRoute}     = this.props.appConfig;
        const isFetching        = !!this.props.sync.fetching;
        const isLoading         = !!this.props.sync.loading;
        return (
            <View
                style={styles.container}>
                    <ScrollView
                        scrollEnabled={false}
                        centerContent={true}
                    >
                        {
                            this.props.shops.ids.length ? this.props.shops.ids.map((shopId, key) => {
                                const shop = this.props.shops.byId[shopId];
                                const {id, remoteId} = shop;
                                const url = images[remoteId] && `${assetsRoute}/${images[remoteId]}`;

                                if (shop) {
                                    return (
                                        <StoreListItem
                                            key={key}
                                            actionCb={this.actionCb.bind(this, shopId)}
                                            shop={shop}
                                            shopId={shopId}
                                            imgUrl={url}
                                            navigate={navigate}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            }) : (
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
                                            name="info-circle" size={20} color="grey" /> {(isFetching || isLoading) ? "Loading..." : "No shops available."}
                                    </Text>
                                    {
                                        !isFetching && !isLoading ? (
                                            <Button
                                                style={styles.buttonStyle}
                                                onPress={this.__getAppInitials}
                                            >
                                                Fetch Available Shops
                                            </Button>
                                        ) : null
                                    }
                                </View>
                            )
                        }
                    </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = ({shops, images, appConfig, sync}) => ({shops, images, appConfig, sync});

const mapDispatchToProps = dispatch => ({
	actions: Object.assign({dispatch: dispatch}, bindActionCreators(AppActions, dispatch))
});

export default
        connect(mapStateToProps, mapDispatchToProps)(StoreSelect)

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
