import React from 'react';
import { useProductsByFactoryAndData } from 'entities/product';
import { translateMonthToRussian, capitalizeString } from 'shared';
import { PieChart } from './ProductPieChart';

type Props = {
  factoryId: number;
  date: number
}

const dateFormatter = (monthIndex: number): string => {
  return capitalizeString(translateMonthToRussian(monthIndex)).slice(0, 3);
}

export const ProductDetails: React.FC<Props> = ({ factoryId, date }) => {
  const data = useProductsByFactoryAndData(factoryId, date);
  if (!data) {
    return <>Нет данных</>;
  }

  const { product1, product2, product3 } = data;

  const formattedData = {
    factoryId,
    date: dateFormatter(date),
    product1,
    product2,
    product3,
  }

  return (
    <PieChart
      data={formattedData}
    />
  );
};