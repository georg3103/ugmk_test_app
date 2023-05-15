import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { type AggregateProduct } from 'entities/product';

type Props = {
  data: Omit<AggregateProduct, 'date'> & { date: string };
}

export const PieChart: React.FC<Props> = ({ data }) => {
  const chartRef = React.useRef<any>(null); // TODO: fix
  // TODO: move to hook
  const containerWidth = chartRef.current?.offsetWidth;
  const chartWidth = containerWidth ? containerWidth * 0.8 : 800;
  
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      width: chartWidth,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          connectorWidth: 0,
        },
        showInLegend: true,
      },
    },
    series: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {
        name: 'Products',
        data: [
          {
            name: '',
            y: data?.product1 || 0,
            description: 'Продукт 1',
            color: 'green',
          },
          {
            name: '',
            y: data?.product2 || 0,
            description: 'Продукт 2',
            color: 'orange',
          },
          {
            name: '',
            y: data?.product3 || 0,
            description: 'Продукт 3',
            color: 'brown',
          },
        ],
      },
    ],
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemMarginTop: 10,
      itemMarginBottom: 10,
      itemStyle: {
        fontWeight: 'normal',
        fontSize: '12px',
      },
      labelFormatter: function () {
        const point = this as Highcharts.Point;
        return `<span style="color: ${point.color};">${point.options.description}`;
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef}/>;
};
