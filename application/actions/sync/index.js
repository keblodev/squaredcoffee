
import {
    LOADING_ACTIVE,
    LOADING_NOT_ACTIVE,
    FETCHING_ACTIVE,
    FETCHING_NOT_ACTIVE
}                           from '../../statics/actions';

const loadingActive = msg => ({type: LOADING_ACTIVE, msg});
const loadingNotActive = () => ({type: LOADING_NOT_ACTIVE});
const fetchingActive = msg => ({type: FETCHING_ACTIVE, msg});
const fetchingNotActive = () => ({type: FETCHING_NOT_ACTIVE});

export default {
    loadingActive,
    loadingNotActive,
    fetchingActive,
    fetchingNotActive,
}