// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { CURRENCY_FETCH, DELETE_EXPENSE, EDIT_EXPENSE, EXPENSES_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES_INFO:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case CURRENCY_FETCH:
    return { ...state, currencies: [...action.payload] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
