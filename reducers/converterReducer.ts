import { Reducer } from 'react';

interface State {
  symbols: any[];
  loading: boolean;
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  conversions: any[];
  currentConversion: any;
}

interface Action {
  type:
    | 'FETCH_SYMBOLS'
    | 'FETCH_SYMBOLS_SUCCESS'
    | 'FETCH_SYMBOLS_FAILURE'
    | 'SET_FROM'
    | 'SET_TO'
    | 'SWITCH_FROM_TO'
    | 'SET_AMOUNT'
    | 'FETCH_CONVERSION'
    | 'FETCH_CONVERSION_START'
    | 'FETCH_CONVERSION_ERROR'
    | 'FETCH_SYMBOLS_ERROR';
  payload?: any;
}

export const initialState: State = {
  symbols: [],
  loading: false,
  currencyFrom: 'EUR',
  currencyTo: 'USD',
  amount: 0,
  conversions: [],
  currentConversion: {},
};

const arrayFromData = (data: any) => {
  return Object.keys(data).map((key) => ({
    code: data[key].code,
    description: data[key].description,
  }));
};

const getConversion = (payload) => ({
  date: payload.date,
  info: payload.info,
  query: payload.query,
  result: payload.result,
});

const converterReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'FETCH_SYMBOLS':
      return {
        ...state,
        loading: false,
        symbols: arrayFromData(action.payload.symbols),
      };
    case 'FETCH_SYMBOLS_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_FROM':
      return {
        ...state,
        currencyFrom: action.payload,
      };
    case 'SET_TO':
      return {
        ...state,
        currencyTo: action.payload,
      };
    case 'SWITCH_FROM_TO':
      const _from = state.currencyFrom;
      const _to = state.currencyTo;
      return {
        ...state,
        currencyFrom: _to,
        currencyTo: _from,
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        amount: action.payload,
      };
    case 'FETCH_CONVERSION_START':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_CONVERSION':
      return {
        ...state,
        loading: false,
        conversions: [getConversion(action.payload), ...state.conversions],
        currentConversion: action.payload,
      };
    case 'FETCH_CONVERSION_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default converterReducer;
