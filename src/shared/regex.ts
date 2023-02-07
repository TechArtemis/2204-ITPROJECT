
/**
 * email pattern
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+(?:.[a-zA-Z0-9-]+)$/;

/**
  * phone number pattern
  */
export const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

/**
 * studentID pattern
 */
export const STUDENTID_REGEX = /^000\d{6}$/;

/**
 * password pattern
 */
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;