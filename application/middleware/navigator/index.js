
import appActions   from '../../statics/actions';
import actions      from '../../actions';

import { NavigationActions } from 'react-navigation'

let stateAndDispatch = {};

export default store => next => action => {
    Promise.resolve().then(_=> {
       const state = store.getState();
       const dispatch = store.dispatch;
       stateAndDispatch = {state, dispatch};

       const auth = state.user.auth;

       switch(action.type) {
            case appActions.GOT_NEW_ORDER_PLACED:
                const {id} = action.order;
                dispatch(actions.selectOrder(id));
                dispatch(NavigationActions.navigate({ routeName: 'Order' }));
                break;

            case appActions.ORDER_IS_PAYED:
                if(auth) {
                    dispatch(NavigationActions.back());
                }
                break;
        }
    });

    return next(action);
}