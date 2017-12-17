import appActions from '../statics/actions';
import {uuid} from '../utils';

const initialState = {
    byUuid:         {},
    ids:            [],
    isDriveThrough: false,
    selected:       null,
};

const byUuid = (state = initialState.byUuid, action) => {
    const update_item = state[action.item.id] || {...action.item};

    switch (action.type) {
        case appActions.CART_ADD:
            const itemUuid = uuid();

            const {item} = action;

            const priceCalculated = item.price;

            const defaultModGroups = item.modifierGroups.elements.map(group => {
                const modifiers = group.modifiers.elements;
                return {
                    ...group,
                    selectedModifier: modifiers[0]
                }
            });

            const recalculatedPrice = defaultModGroups.reduce((acc, modGroup, idx) => {
                return acc + (modGroup && modGroup.selectedModifier && modGroup.selectedModifier.price || 0)
            }, item.price);

            return {
                ...state,
                [itemUuid] : {
                    ...item,
                    priceCalculated:   item.priceCalculated     || recalculatedPrice,
                    selectedModifiers: item.selectedModifiers   || defaultModGroups,
                    uuid: itemUuid,
                }
            };
        case appActions.CART_REMOVE:
            var {item} = action;
            return Object.keys(state).filter(itemUuid => itemUuid !== item.uuid).reduce((acc,uuid)=>({...acc, [uuid]:state[uuid]}),{});

        default:
            return state;
    }
}

export default cart = (state = initialState, action) => {
	switch (action.type) {
        case appActions.TOGGLE_DRIVE_THROUGH:
            return {
                ...state,
                isDriveThrough: !state.isDriveThrough
            }

        case appActions.DROP_CART:
        // case NONCE_CHARGED:
        // case appActions.ORDER_PLACED:
        case appActions.USER_CARD_CHARGED:
            //clearing the cart on success purchase
            return initialState;
        case appActions.CART_ADD:
        case appActions.CART_REMOVE:
            const byUuidState = byUuid(state.byUuid, action);
            return {
                ...state,
                byUuid: 	byUuidState,
                ids:        Object.keys(byUuidState)
            }

        case appActions.CART_ITEM_SELECTED:
            return {
                ...state,
                selected: {
                    uuid: action.uuid,
                    ...state.byUuid[action.uuid]
                }
            }
        case appActions.CART_ITEM_MODIFIER_SELECTED:
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

            const recalculatedPrice = newModGroups.reduce((acc, modGroup, idx) => {
                return acc + (modGroup && modGroup.selectedModifier && modGroup.selectedModifier.price || 0)
            }, selectedItem.price);

            const newItemState = {
                ...selectedItem,
                priceCalculated:    recalculatedPrice,
                selectedModifiers: newModGroups
            };

            return {
                ...state,
                byUuid: {
                    ...state.byUuid,
                    [selectedItem.uuid]: newItemState
                },
                selected: newItemState,
            }
        default:
            return state;
    }
}