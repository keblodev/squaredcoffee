
import appActions from '../../statics/actions';

import categories, {categoriesInitialState} from './categories';
import items, {itemsInitialState} from './items';

const initialState = {
	ids: 		[],
    byId: 		{},
    categories: categoriesInitialState,
    items:      itemsInitialState,
	selected: 	null
}

const byId = (state = initialState.byId, action) => {
    switch(action.type) {
        case appActions.GOT_AUTHORIZED_SHOPS:
            return action.shops.reduce((acc,item,idx)=> {
                    return {
                        ...acc,
                        [item.remoteId]: item
                    }
                }, {})

        default:
            return state;
    }
}

export default shops = (state = initialState, action) => {
	switch(action.type) {

        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                categories: categories(state.categories, action),
                items:      items(state.items, action),
            }

        case appActions.SHOP_CATEGORY_SELECTED:
            return {
                ...state,
                categories: categories(state.categories, action)
            }

        case appActions.SHOP_CATEGORY_ITEM_MODIFIER_SELECTED:
        case appActions.SHOP_CATEGORY_ITEM_SELECTED:
            return {
                ...state,
                items: items(state.items, action)
            }

        case appActions.GOT_AUTHORIZED_SHOPS:
            const byIdNew = byId(state.byId, action);
            const idsNew = Object.keys(byIdNew);
            return {
                ...state,
                byId: 	byIdNew,
                ids: 	idsNew
            }
        case appActions.SHOP_SELECTED:
            return {
                ...state,
                selected: {
                    shopId: action.shopId,
                    ...state.byId[action.shopId]
                }
            }
        default:
            return state;
    }
}