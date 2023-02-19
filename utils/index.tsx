export const getLatestUsedCurrencies = (currencyRates) => {
  const currencyCodes = new Set();
  currencyRates
    .filter((obj) => Object.keys(obj).length !== 0)
    .forEach((rate) => {
      const { from, to } = rate?.query;
      currencyCodes.add(from);
      currencyCodes.add(to);
    });
  return Array.from(currencyCodes);
};

export function formatCurrency(number, currency = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return formatter.format(number);
}

export const getFromLocalStorage = (key: string): any[] => {
  let values = [];
  try {
    values = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log(err);
  }
  return values;
};

export const arrayFromData = (data: any) => {
  return Object.keys(data).map((key) => ({
    code: data[key].code,
    description: data[key].description,
  }));
};

export const getConversion = (payload) => ({
  date: payload.date,
  info: payload.info,
  query: payload.query,
  result: payload.result,
});
