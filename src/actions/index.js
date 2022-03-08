import getCurrencies from '../service/service';

// Coloque aqui suas actions
export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';
export const EXPENSES_INFO = 'EXPENSES_INFO';
export const CURRENCY_FETCH = 'CURRENCY_FETCH';

export const UserAction = (email) => ({
  type: USER_INFO,
  payload: email,

});

export const ExpensesAction = (expense) => ({
  type: EXPENSES_INFO,
  payload: expense,
});

export const CurrencyAction = (currency) => ({
  type: CURRENCY_FETCH,
  payload: Object.keys(currency),
});

export const fetchCurrency = () => async (dispatch) => {
  const currencies = await getCurrencies();
  dispatch(CurrencyAction(currencies));
};
