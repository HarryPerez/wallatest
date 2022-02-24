import { EMAIL_REGEX } from '~constants/regex';

export const isValidEmail = (email) => EMAIL_REGEX.test(email);
