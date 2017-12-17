
import { Image } from 'react-native';
import appActions from '../../statics/actions';
import actions from '../../actions';

let stateAndDispatch = {};

export default store => next => action => {
    Promise.resolve().then(_=> {
        const state = store.getState();
        const dispatch = store.dispatch;
        stateAndDispatch = {state, dispatch};

        switch(action.type) {
            case appActions.SUBMIT_PAYMENT_INSTRUMENT_INFO:
                const {user: {auth, orders: {selected}}} = state;
                const {cardConfig} = action;
                if (auth && selected && cardConfig) {

                    const {id, href, total} = selected;

                    const merchantIdMatch = href.match(/\/merchants\/(\w+)\/orders\//);
                    if (merchantIdMatch && merchantIdMatch.length > 1) {
                        merchant_id = merchantIdMatch.pop();

                        const payConfig = {
                            total,
                            ...cardConfig.reduce((acc, item)=>{
                                return {
                                    ...acc,
                                    [item.key]: item.value
                                }
                            },{})
                        }

                        dispatch(actions.cloverPay({auth, merchant_id, order_id: id, payConfig}));
                    }
                }
                // for (shoId in data) {
                //     const imageId = data[shoId];
                //     // Image.prefetch(`${CLOVER_IMG_ROUTE}/${imageId}`);
                // }

                break;
        }
    });

    return next(action);
}