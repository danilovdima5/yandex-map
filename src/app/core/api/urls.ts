const apiKey = 'AIzaSyCJP01740dWqmcW4CBkZI7958QLZTN82a4';

export const URLS = {
  signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
  signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
  baseRtDb: 'https://yandexmap-3f0c0-default-rtdb.firebaseio.com/',
  refreshUrl: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
};
