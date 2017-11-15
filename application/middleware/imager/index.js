
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
            case appActions.GOT_CONFIGS:
                const {data} = action;

                // for (shoId in data) {
                //     const imageId = data[shoId];
                //     // Image.prefetch(`${CLOVER_IMG_ROUTE}/${imageId}`);
                // }

                break;
        }
    });

    return next(action);
}