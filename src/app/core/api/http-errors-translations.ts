export type HttpLoginError = 'INVALID_PASSWORD' | 'EMAIL_NOT_FOUND';

export const HttpErrorTranslation = {
  INVALID_PASSWORD: 'Invalid password. Please try again',
  EMAIL_NOT_FOUND: 'User with given E-mail was not found',
  EMAIL_EXISTS: 'User with this E-mail already exists',
};
