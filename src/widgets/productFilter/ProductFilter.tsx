import React from 'react';
import { FilterProduct } from 'features'
import styles from "./ProductFilter.module.scss";

const title = 'Фильтр по типу продукции';

export const ProductFilter = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {title}
      </div>
      <FilterProduct />
    </div>
  );
};