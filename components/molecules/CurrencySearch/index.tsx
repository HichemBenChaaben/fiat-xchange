import { useContext, useState, useRef, ChangeEvent } from 'react';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import AppCtx from '../../../contexts/app';
import { getLatestUsedCurrencies } from '../../../utils';
import RecentSymbols from '../RecentSymbols';

const CurrencySearch = ({ symbols, onClickSelected, changeMode }) => {
  const { state } = useContext(AppCtx);
  const { conversions } = state;
  const recentlyUsed =
    conversions && getLatestUsedCurrencies(conversions).slice(0, 5);
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [symbolIems, setSymbolIems] = useState(symbols);
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const symbolToExclude =
    changeMode === 'from' ? state.currencyTo : state.currencyFrom;

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' && highlightedIndex > 0) {
      setHighlightedIndex(highlightedIndex - 1);
    } else if (
      event.key === 'ArrowDown' &&
      highlightedIndex < symbolIems.length - 1
    ) {
      setHighlightedIndex(highlightedIndex + 1);
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      inputRef.current.value = symbolIems[highlightedIndex].code;
      setHighlightedIndex(-1);
      onClickSelected(inputRef.current.value);
    }
    const selected = selectRef?.current?.querySelector('.highlighted');
    if (selected) {
      selected?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered = symbols?.filter(({ code, description }) => {
      return (
        code.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setSymbolIems(filtered);
  };

  return (
    <div className="currency-search">
      <h4>Select a currency</h4>
      <input
        autoFocus
        name="search"
        placeholder="USD"
        autoComplete="off"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <RecentSymbols
        symbolToExclude={symbolToExclude}
        symbols={recentlyUsed}
        onClick={onClickSelected}
      />
      <div className="currency-search-list" ref={selectRef}>
        {symbolIems.map((symbol, index) => {
          if (symbol.code === symbolToExclude) {
            return (
              <p
                className="currency-search-list-item"
                style={{
                  marginTop: '4px',
                  marginBottom: '4px',
                  textDecoration: 'line-through',
                  textAlign: 'left',
                }}
              >
                {getUnicodeFlagIcon(symbol.code)} {symbol.description}{' '}
                {symbol.code}
              </p>
            );
          }
          return (
            <div
              className={`currency-search-list-item ${
                index === highlightedIndex ? 'highlighted' : ''
              }`}
              key={`symbols-${index}`}
              onClick={() => onClickSelected(symbol.code)}
            >
              {getUnicodeFlagIcon(symbol.code)} {symbol.description}{' '}
              {symbol.code}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencySearch;
