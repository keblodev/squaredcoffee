import geo          from './geo';
import checkout     from './checkout';
import notifier     from './notifier';
import syncnotifier from './syncnotifier';
import sync         from './sync';
import imager       from './imager';
import navigator    from './navigator';

export default [
    geo,
    notifier,
    syncnotifier,
    sync,
    imager,
    navigator,
    ...checkout,
]