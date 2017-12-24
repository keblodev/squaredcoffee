export const OPEN       = 'Opened';
export const LOCKED     = 'Paid';
export const CANCELLED  = 'Cancelled';
export const ERROR      = 'Error';

// OPEN | LOCKED | ||| custom  PAID | REFUNDED
export const OPEN_TYPE   = 'open';
export const LOCKED_TYPE = 'locked';
// custom states. clover does not care about those
// except us
// and it should be... a somthing called "Payment State"
// not present in any API docs of course :)
export const CANCELLED_TYPE  = 'cancelled';
export const ERROR_TYPE      = 'error';

export default [
    OPEN_TYPE,
    LOCKED_TYPE,
    CANCELLED_TYPE,
    ERROR_TYPE,
]