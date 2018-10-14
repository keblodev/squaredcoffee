import appActions from '../../statics/actions';

export const categoriesInitialState = {
    byShopId:   {},
    byId: 		{},
	selected: 	null,
}

const byShopId = (state = categoriesInitialState.byShopId, action) => {
    switch(action.type) {
        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                [action.id]: action.categories
            }
        default:
            return state;
    }
};

const byId = (state = categoriesInitialState.byId, action) => {
    switch(action.type) {
        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                ...action.categories.reduce((acc,item,idx)=> {
                    return {
                        ...acc,
                        [item.id]: item
                    }
                }, {})
            }

        default:
            return state;
    }
}

export default categories = (state = categoriesInitialState, action) => {
    switch(action.type) {
        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                byShopId: 	byShopId(state.byShopId, action),
                byId:       byId(state.byId, action)
            }
        case appActions.SHOP_CATEGORY_SELECTED:
            return {
                ...state,
                selected: {
                    categoryId: action.categoryId,
                    ...state.byId[action.categoryId]
                }
            }
        default:
            return state;
    }
}