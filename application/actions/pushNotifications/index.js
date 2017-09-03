
import { PUSH_NOTIFY, HIDE_NOTIFY, SHOW_NOTIFY } from '../../statics/actions';

const pushNotify = msg => ({type: PUSH_NOTIFY, msg});

const hideNotify = () => ({type: HIDE_NOTIFY});

const showNotify = notifyConfig => ({type: SHOW_NOTIFY, ...notifyConfig});

export default {
	pushNotify,
	hideNotify,
	showNotify
}