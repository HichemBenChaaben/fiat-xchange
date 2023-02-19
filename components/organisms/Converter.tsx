import { useContext, useState, useRef, useEffect } from 'react';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import AppCtx from '../../contexts/app';
import Modal from '../atoms/Modal';
import CurrencySearch from '../molecules/CurrencySearch';
import CurrencyAmount from '../atoms/CurrencyAmount.tsx';
import debounce from 'lodash/debounce';
import IconSwap from '../icons/swap';
import IconArrowDown from '../icons/arrowDown';
import ConversionRate from '../atoms/ConversionRate';
import { formatCurrency } from '../../utils';
import CopyToClipboardButton from '../molecules/copyToClipBoardButton';
import { useRouter } from 'next/router';

const Converter = () => {
  const {
    symbols,
    setFrom,
    setTo,
    currencyFrom,
    currencyTo,
    switchFromTo,
    setAmount,
    fetchConversion,
    state,
    loading,
  } = useContext(AppCtx);

  const [currentConversion, setCurrentConversion] = useState(null);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [changeMode, setChangeMode] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const ref1 = useRef(null);
  const router = useRouter();
  const { from, to, amount } = router.query;

  useEffect(() => {
    ref1.current.focus();
    ref1.current.value = state.amount;
  }, []);

  const initializeConverterWithParams = () => {
    // set input fields value
    setFrom(from);
    setTo(to);
    setAmount(amount);
    ref1.current.value = amount;
    setIsDirty(false);
    // dispatch fetchConversion action
    fetchConversion({ from, to, amount });
  };

  useEffect(() => {
    if (from && to && amount) {
      initializeConverterWithParams();
    }
  }, [router.query]);

  const debouncedOnChange = debounce((value) => {
    setAmount(value);
  }, 300);

  const handleAmountChange = (e) => {
    const { value } = e.target;
    debouncedOnChange(value);
    setIsDirty(true);
  };

  const handleChangeMode = (change) => {
    setChangeMode(change);
    setShowCurrencies(true);
    setIsDirty(true);
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    switchFromTo();
    setIsDirty(true);
  };

  const onClickSelected = (code) => {
    setShowCurrencies(false);
    if (changeMode === 'from') {
      setFrom(code);
    }
    if (changeMode === 'to') {
      setTo(code);
    }
    setIsDirty(true);
  };

  const handleConversion = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    const { currencyFrom, currencyTo, amount } = state;
    fetchConversion({ from: currencyFrom, to: currencyTo, amount });
    setIsDirty(false);
  };
  return (
    <div>
      {showCurrencies && (
        <Modal onClose={() => setShowCurrencies(false)}>
          <CurrencySearch
            from={currencyFrom}
            to={currencyTo}
            currentConversion={currentConversion}
            onClickSelected={onClickSelected}
            symbols={symbols}
            changeMode={changeMode}
          />
        </Modal>
      )}
      <form onSubmit={handleConversion}>
        <div className="convert-box">
          <div className="convert-box-inputs">
            <div className="convert-box-input">
              <CurrencyAmount
                ref={ref1}
                min="0"
                handleChange={handleAmountChange}
                name="from"
                placeholder="0.00"
              />
              <div className="convert-box-current-selected">
                <button type="button" onClick={() => handleChangeMode('from')}>
                  <span style={{ paddingRight: '6px' }}>
                    {currencyFrom && getUnicodeFlagIcon(currencyFrom)}
                    {currencyFrom}
                  </span>
                  <IconArrowDown />
                </button>
              </div>
            </div>

            <div className="convert-box-switch">
              <button type="button" onClick={handleSwitch}>
                <IconSwap />
              </button>
            </div>

            <div className="convert-box-input">
              <ConversionRate
                rate={isDirty ? null : state.currentConversion.info?.rate}
              />
              <CurrencyAmount
                value={
                  state.amount !== '' && (isDirty || loading)
                    ? ''
                    : formatCurrency(
                        state?.currentConversion?.result | 0,
                        state.currencyTo,
                      )
                }
                type="text"
                readOnly
                handleChange={handleAmountChange}
                name="from"
              />
              <CopyToClipboardButton
                canCopy={
                  !loading && !isDirty && state?.currentConversion?.result
                }
                text={state?.currentConversion?.result}
                className="convert-box-input-copy-clipboard"
              />
              <div className="convert-box-current-selected">
                <button type="button" onClick={() => handleChangeMode('to')}>
                  <span style={{ paddingRight: '6px' }}>
                    {currencyTo && getUnicodeFlagIcon(currencyTo)}
                    {currencyTo}
                  </span>
                  <IconArrowDown />
                </button>
              </div>
            </div>
          </div>
          <div className="convert-box-convert-btn">
            <button
              type="submit"
              disabled={state.amount === '' || state.amount === null || loading}
              onClick={handleConversion}
            >
              {loading ? 'loading...' : '⚡️ shazam'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Converter;
