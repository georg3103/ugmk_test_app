import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

type BarChatData = {
  factoryId: number;
  products: number;
  date: number;
}

type BarChartProps = {
  data: BarChatData[];
  dateFormatter: (monthIndex: number) => string;
  onBarClick: (factoryId: number, date: string) => void;
}

enum Colors {
  red = 'red',
  blue = 'blue',
}

export const BarChart: React.FC<BarChartProps> = ({ data, onBarClick, dateFormatter }) => {
  const chartRef = React.useRef<any>(null); // TODO: fix
  // TODO: move to hook
  const containerWidth = chartRef.current?.offsetWidth;
  const chartWidth = containerWidth ? containerWidth * 0.8 : 800;

  const getUniqueDates = (data: BarChartProps['data']) => {
    const uniqueDates = data.reduce((dates: string[], entry) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!dates.includes(entry.date)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dates.push(entry.date);
      }
      return dates;
    }, []);

    return uniqueDates;
  };

  const getSeriesData = (data: BarChartProps['data']) => {
    const series = {};
  
    data.forEach((entry) => {
      const { products, factoryId, date } = entry;
      
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!series[factoryId]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        series[factoryId] = {
          name: `Фабрика ${factoryId}`,
          data: [],
          color: factoryId === 1 ? Colors.red : Colors.blue, // TODO: change to plotOptions in options
        };
      }
      
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      series[factoryId].data.push([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getUniqueDates(data).indexOf(date),
        products,
      ]);
    });
  
    return Object.values(series);
  };

  const handleBarClick = (event: any) => {
    const { series, x } = event.point;
    const factoryId = parseInt(series.name.split(' ')[1]);
    const date = getUniqueDates(data)[x];

    onBarClick(factoryId, date);
  };

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      width: chartWidth,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: getUniqueDates(data),
      labels: {
        formatter: ({ value }) => {
          if (typeof value === 'number') {
            return dateFormatter(value);
          }
          return value;
        }
      }
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    plotOptions: {
      column: {
        events: {
          click: handleBarClick,
        },
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    series: getSeriesData(data),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
};