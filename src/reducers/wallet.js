// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { WALLET_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_INFO:
    return state;
  default:
    return state;
  }
};

export default wallet;
