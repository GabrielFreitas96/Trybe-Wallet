// Coloque aqui suas actions
export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';

export const UserAction = (email) => ({
  type: USER_INFO,
  payload: email,

});
