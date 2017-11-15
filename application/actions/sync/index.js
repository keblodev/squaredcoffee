
import appTypes from '../../statics/actions';

const loadingActive = msg => ({type: appTypes.LOADING_ACTIVE, msg});
const loadingNotActive = () => ({type: appTypes.LOADING_NOT_ACTIVE});
const fetchingActive = msg => ({type: appTypes.FETCHING_ACTIVE, msg});
const fetchingNotActive = () => ({type: appTypes.FETCHING_NOT_ACTIVE});

export default {
    loadingActive,
    loadingNotActive,
    fetchingActive,
    fetchingNotActive,
}