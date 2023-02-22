import React, { useState, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import { format } from 'date-fns';

const SimpleSwitcher = ({ items, activeItem, onActiveItemChanged }) => {
  const onItemClicked = (item) => {
    if (item === activeItem) {
      return;
    }

    onActiveItemChanged(item);
  };

  return (
    <div className="switcher">
      {items.map((item) => (
        <span
          key={item}
          className={`switcher-item${
            item === activeItem ? ' switcher-active-item' : ''
          }`}
          onClick={() => onItemClicked(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

function Chart({ from, to }) {
  const intervals = ['7D', '14D', '1M', '1Y'];
  const [dData, setDData] = useState<Promise<any>>();
  const [activeInterval, setActiveInterval] = useState(intervals[3]);

  useEffect(() => {
    const daysAgo = (days) => {
      return new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    };
    const fetchTimeSeries = async () => {
      const formatter = (d) => format(d, 'yyyy-MM-dd');
      const activeIintervalMap = {
        '7D': 7,
        '14D': 14,
        '1M': 30,
        '1Y': 365,
      };
      const base = from;
      const symbols = to;
      const start_date = formatter(daysAgo(activeIintervalMap[activeInterval]));
      const end_date = formatter(new Date());
      try {
        const params1 = new URLSearchParams({
          start_date,
          end_date,
          base,
          symbols,
        }).toString();
        const response = await fetch(
          `https://api.exchangerate.host/timeseries?${params1}`,
        );
        const data = await response.json();
        setDData(data.rates);
        return data;
      } catch (err) {
        console.log('fetch time series...');
      }
    };
    fetchTimeSeries();
  }, [activeInterval, from, to]);
  let d = [];
  if (dData) {
    for (let k in dData) {
      d = [...d, { time: k, value: dData[k][to] }];
    }
  }
  const dayData = d;

  const seriesesData = new Map([
    ['7D', dayData],
    ['14D', dayData],
    ['1M', dayData],
    ['1Y', dayData],
  ]);

  useEffect(() => {
    const chart = createChart(chartElement, {
      height: 300,
      layout: {
        backgroundColor: '#000000',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.5)',
        },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        horzLine: {
          visible: false,
        },
      },
    });

    let areaSeries = null;

    function syncToInterval(interval) {
      if (areaSeries) {
        chart.removeSeries(areaSeries);
        areaSeries = null;
      }
      areaSeries =
        chart &&
        chart.addAreaSeries({
          topColor: 'rgba(76, 175, 80, 0.56)',
          bottomColor: 'rgba(76, 175, 80, 0.04)',
          lineColor: 'rgba(76, 175, 80, 1)',
          lineWidth: 2,
        });
      areaSeries && areaSeries.setData(seriesesData.get(interval));
    }

    syncToInterval(activeInterval);

    return () => {
      if (areaSeries) {
        chart.removeSeries(areaSeries);
      }
      chart && chart.remove();
    };
  }, [activeInterval, dayData]);

  let chartElement;
  return (
    <>
      <SimpleSwitcher
        items={intervals}
        activeItem={activeInterval}
        onActiveItemChanged={setActiveInterval}
      />
      <div ref={(element) => (chartElement = element)} />
    </>
  );
}

export default Chart;
