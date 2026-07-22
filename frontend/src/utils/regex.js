// Mirrors backend/src/constants/index.js REGEXP — keep both in sync.
export const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
export const PASSWORD_REGEXP = /^[!-~]{8,64}$/;
export const NAME_REGEXP = /^[ -~]{2,32}$/;
