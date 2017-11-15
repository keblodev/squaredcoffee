import appActions from '../../statics/actions';

const selectShop        = shopId => ({type: appActions.SHOP_SELECTED, shopId});
const selectCategory    = categoryId => ({type: appActions.SHOP_CATEGORY_SELECTED, categoryId});
const selectItem        = itemId => ({type: appActions.SHOP_CATEGORY_ITEM_SELECTED, itemId});
const selectModifier    = ({modifierGroupId, modifierId}) => ({type: appActions.SHOP_CATEGORY_ITEM_MODIFIER_SELECTED, modifierGroupId, modifierId});

export default {
    selectShop,
    selectCategory,
    selectItem,
    selectModifier,
};