import { useContext } from 'react';
import Layout from '../components/layouts/Layout';
import AppCtx from '../contexts/app';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import HistoryFilter from '../components/atoms/HistoryFilter';
import Link from 'next/link';

const History = (): JSX.Element => {
  const { state } = useContext(AppCtx);
  const hasConversion = state.conversions.length;
  const { conversions } = state;
  const _currentConversions = conversions.filter(
    (c) => Object.keys(c).length !== 0,
  );

  function filterByDate(items, date) {
    // Convert date string to Date object
    const currentDate = new Date(date);

    // Get date 7 days ago
    const weekAgo = new Date(currentDate);
    weekAgo.setDate(currentDate.getDate() - 7);

    // Filter items by date
    const filteredItems = items.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= weekAgo && itemDate <= currentDate;
    });

    return filteredItems;
  }
  const handleChange = (e) => {
    const dateNow = new Date();
    const filtered = filterByDate(state.conversions, dateNow);
  };

  const getPararms = ({ from, to, amount }): string =>
    new URLSearchParams({ from, to, amount }).toString();

  return (
    <Layout title="Currency converter | Next.js + TypeScript Example">
      <h1>Conversion history</h1>
      <div>
        <HistoryFilter handleChange={handleChange} />
      </div>
      <div className="container">
        <div>
          {!hasConversion && <div>You don't have conversions yet.</div>}
          {_currentConversions?.map((item, index) => {
            return (
              <div className="card-item" key={`${index}-conversions`}>
                {/* <code>{JSON.stringify(item, null, 2)}</code> */}
                <Link
                  href={`/?${getPararms({
                    from: item?.query?.from,
                    to: item?.query?.to,
                    amount: item?.query?.amount,
                  })}`}
                >
                  View
                </Link>
                <div>
                  {getUnicodeFlagIcon(item?.query?.from)} {item?.query?.from}{' '}
                  {'  '}
                  to {getUnicodeFlagIcon(item?.query?.to)} {item?.query?.to}{' '}
                  {'  '}
                </div>
                <div>
                  result {item?.result} {'  '}
                  rate {item?.info?.rate} {'  '}
                  date {item?.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default History;
