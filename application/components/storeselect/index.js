import React, { Component } from 'react';
import { View, ScrollView, FlatList, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StoreListItem from './storelistitem';

import AppActions from '../../actions';

class StoreSelect extends Component {
	actionCb = shopId => this.props.actions.selectShop(shopId);

	render = () => {
        const { navigate }      = this.props.navigation;
        const {shops, images}   = this.props;
        const {assetsRoute}     = this.props.appConfig;
        return (
            <View
                style={styles.container}>
                    <ScrollView
                        scrollEnabled={false}
                        centerContent={true}
                    >
                        {
                            this.props.shops.ids.map((shopId, key) => {
                                const shop = this.props.shops.byId[shopId];
                                const {id, remote_id} = shop;
                                if (shop && images[remote_id]) {
                                    return (
                                        <StoreListItem
                                            key={key}
                                            actionCb={this.actionCb.bind(this, shopId)}
                                            shop={shop}
                                            shopId={shopId}
                                            imgUrl={`${assetsRoute}/${images[remote_id]}`}
                                            navigate={navigate}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })
                        }
                    </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = ({shops, images, appConfig}) => ({shops, images, appConfig});

const mapDispatchToProps = dispatch => ({
	actions: Object.assign({dispatch: dispatch}, bindActionCreators(AppActions, dispatch))
});

export default
		connect(mapStateToProps, mapDispatchToProps)(StoreSelect)

const styles = {
	container: {
		alignItems: 		'center',
		backgroundColor: 	'#1f232b',
		flex: 				1,
		justifyContent: 	'center',
	},

	cardStyle: {
		backgroundColor: 	'#41495a',
		height: 			200,
		width: 				'100%'
    }
};
