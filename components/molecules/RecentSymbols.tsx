import getUnicodeFlagIcon from 'country-flag-icons/unicode';

const RecentSymbols = ({ symbols = [], onClick, symbolToExclude }) => {
  if (symbols.length === 0) {
    return null;
  }
  return (
    <div className="recent-symbols">
      {symbols.map((code, index) => {
        return (
          <button
            disabled={symbolToExclude === code}
            style={{ marginLeft: '4px' }}
            onClick={() => onClick(code)}
            key={index}
          >
            <div className="recent-symbol">
              {getUnicodeFlagIcon(code)}
              <span>{code}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RecentSymbols;
