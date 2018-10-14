import appActions from '../../statics/actions';

const itemsInitialState = {
    byCategoryId:   {},
    byId: 		    {},
	selected: 	    null
}

const byCategoryId = (state = itemsInitialState.byCategoryId, action) => {
    switch(action.type) {
        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                ...action.categories.reduce((acc,item,idx)=> {
                    return {
                        ...acc,
                        [item.id]: item.items.elements
                    }
                }, {})
            }
        default:
            return state;
    }
};

const byId = (state = itemsInitialState.byId, action) => {
    switch(action.type) {
        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                ...action.categories.reduce((acc,item,idx)=> {
                    return {
                        ...acc,
                        ...item.items.elements.reduce(
                            (acc,item,idx)=> {
                                return {
                                    ...acc,
                                    [item.id]: item
                                }
                            }
                            ,{})
                    }
                }, {})
            }

        default:
            return state;
    }
}

export default items = (state = itemsInitialState, action) => {
    switch(action.type) {
        case appActions.GOT_SHOP_CATEGORIES:
            return {
                ...state,
                byCategoryId: 	byCategoryId(state.byCategoryId, action),
                byId:           byId(state.byId, action)
            }
        case appActions.SHOP_CATEGORY_ITEM_SELECTED:

            const item = state.byId[action.itemId];

            const modGroups = item.modifierGroups.elements.map(group => {
                const modifiers = group.modifiers.elements;
                return {
                    ...group,
                    selectedModifier: modifiers[0]
                }
            });

            var recalculatedPrice = modGroups.reduce((acc, modGroup, idx) => {
                return acc + (modGroup && modGroup.selectedModifier && modGroup.selectedModifier.price || 0)
            }, item.price);

            return {
                ...state,
                selected: {
                    ...item,
                    priceCalculated:    recalculatedPrice,
                    selectedModifiers:  modGroups,
                }
            }
        case appActions.SHOP_CATEGORY_ITEM_MODIFIER_SELECTED:

            const selectedItem = state.selected;

            const {modifierGroupId, modifierId} = action;

            const newModGroups = selectedItem.selectedModifiers.map(group => {
                if(group.id === modifierGroupId) {
                    const modifiers = group.modifiers.elements;
                    const selectedModifierArr = modifiers.filter(modifier => modifier.id === modifierId)
                    if (selectedModifierArr.length) {
                        return {
                            ...group,
                            selectedModifier: selectedModifierArr.pop()
                        }
                    } else {
                        return group
                    }
                }

                return group
            });

            var recalculatedPrice = newModGroups.reduce((acc, modGroup, idx) => {
                return acc + (modGroup && modGroup.selectedModifier && modGroup.selectedModifier.price || 0)
            }, selectedItem.price);

            return {
                ...state,
                selected: {
                    ...selectedItem,
                    priceCalculated:    recalculatedPrice,
                    selectedModifiers: newModGroups
                }
            }
        default:
            return state;
    }
}