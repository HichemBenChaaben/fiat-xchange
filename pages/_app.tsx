import './styles.css';
import AppCtx from '../contexts/app';
import useConversion from '../hooks/useConversion';
export default function MyApp({ Component, pageProps }) {
  const {
    loading,
    symbols,
    setFrom,
    setTo,
    currencyFrom,
    currencyTo,
    switchFromTo,
    fetchConversion,
    setAmount,
    state,
  } = useConversion();
  return (
    <AppCtx.Provider
      value={{
        loading,
        symbols,
        setFrom,
        setTo,
        currencyFrom,
        currencyTo,
        switchFromTo,
        setAmount,
        fetchConversion,
        state,
      }}
    >
      <Component {...pageProps} />
    </AppCtx.Provider>
  );
}
