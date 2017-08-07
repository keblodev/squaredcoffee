
import { PUSH_NOTIFY, HIDE_NOTIFY, SHOW_NOTIFY } from '../../statics/actions';

const pushNotify = notification => ({type: PUSH_NOTIFY, notification});

const hideNotify = notification => ({type: HIDE_NOTIFY});

const showNotify = notification => ({type: SHOW_NOTIFY});

export default {
	pushNotify,
	hideNotify,
	showNotify
}