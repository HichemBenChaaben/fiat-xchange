import { useReducer, useEffect } from 'react';
import converterReducer from '../reducers/converterReducer';
import getFromLocalStorage from '../utils/getFromLocalStorage';

const useConversion = () => {
  const initialState = {
    symbols: [],
    loading: false,
    currencyFrom: 'EUR',
    currencyTo: 'USD',
    amount: null,
    conversions: getFromLocalStorage('conversions') || [],
    currentConversion: {},
  };
  const [state, dispatch] = useReducer(converterReducer, initialState);
  const { symbols, loading, currencyFrom, currencyTo } = state;

  useEffect(() => {
    fetchSymbols();
  }, []);

  const fetchSymbols = async () => {
    try {
      const response = await fetch(`/api/xchange`);
      const data = await response.json();
      dispatch({
        type: 'FETCH_SYMBOLS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_SYMBOLS_ERROR',
        payload: error,
      });
    }
  };

  useEffect(() => {
    try {
      if (state.conversions.length > 0) {
        localStorage.setItem('conversions', JSON.stringify(state.conversions));
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [state.conversions]);

  const fetchConversion = async ({ from, to, amount }) => {
    const searchParams = new URLSearchParams({ from, to, amount }).toString();
    dispatch({
      type: 'FETCH_CONVERSION_START',
    });
    try {
      const response = await fetch(`/api/xchange/conversion/?${searchParams}`);
      const data = await response.json();
      dispatch({
        type: 'FETCH_CONVERSION',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CONVERSION_ERROR',
        payload: error,
      });
    }
  };

  const setFrom = (symbol) => {
    dispatch({
      type: 'SET_FROM',
      payload: symbol,
    });
  };

  const setTo = (symbol) => {
    dispatch({
      type: 'SET_TO',
      payload: symbol,
    });
  };

  const switchFromTo = () => {
    dispatch({
      type: 'SWITCH_FROM_TO',
    });
  };

  const setAmount = (amount) => {
    dispatch({
      type: 'SET_AMOUNT',
      payload: amount,
    });
  };

  return {
    fetchConversion,
    loading,
    currencyFrom,
    currencyTo,
    fetchSymbols,
    symbols,
    setFrom,
    setTo,
    switchFromTo,
    setAmount,
    state,
  };
};

export default useConversion;
