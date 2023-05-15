import React from 'react';
import { useHistory } from "react-router-dom";
import { useProductsBySelectedProduct } from 'entities/product';
import { translateMonthToRussian, capitalizeString } from 'shared';
import { BarChart } from './BarChart';
import styles from "./ProductBarChart.module.scss";

const dateFormatter = (monthIndex: number): string => {
  return capitalizeString(translateMonthToRussian(monthIndex)).slice(0, 3);
}

export const ProductBarChart: React.FC = () => {
  const history = useHistory();
  const data = useProductsBySelectedProduct();
  const formattedData = data
    .map(({ date, factoryId, products }) => {
      return {
        factoryId,
        products,
        date,
      };
    })
    .sort((a, b) => a.date - b.date);

  const handleBarClick = (factoryId: number, date: string) => {
    history.push(`details/${factoryId}/${date}`);
  };

  return (
    <div className={styles.wrapper}>
      <BarChart
        data={formattedData}
        dateFormatter={dateFormatter}
        onBarClick={handleBarClick}
      />
    </div>
  );
};