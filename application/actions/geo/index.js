import { GEO_START_WATCH, GEO_END_WATCH } from '../../statics/actions/geo';

const startGeo = options => ({type: GEO_START_WATCH, options});
const stopGeo = options => ({type: GEO_END_WATCH, options});

export default {
	startGeo,
	stopGeo
}