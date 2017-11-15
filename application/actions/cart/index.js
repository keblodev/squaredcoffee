import appActions from '../../statics/actions';

const cartAdd       = item => ({ type: appActions.CART_ADD, item });
const cartRemove    = item => ({ type: appActions.CART_REMOVE, item });
const selectCartItem            = uuid => ({type: appActions.CART_ITEM_SELECTED, uuid});
const selectCartItemModifier    = ({modifierGroupId, modifierId}) => ({type: appActions.CART_ITEM_MODIFIER_SELECTED, modifierGroupId, modifierId});

const toggleDriveThrough = _ => ({type: appActions.TOGGLE_DRIVE_THROUGH});

export default {
    cartAdd,
    cartRemove,
    selectCartItem,
    selectCartItemModifier,
    toggleDriveThrough,
}