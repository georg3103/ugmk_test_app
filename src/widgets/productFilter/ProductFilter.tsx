import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectedProduct, useSelectedProduct, setSelectedProduct } from 'entities/product';
import { Select } from 'shared/ui';
import styles from "./ProductFilter.module.scss";

const title = 'Фильтр по типу продукции';
const productOptions = [
  { label: 'Все продукты', value: SelectedProduct.all },
  { label: 'Продукт 1', value: SelectedProduct.product1 },
  { label: 'Продукт 2', value: SelectedProduct.product2 },
  { label: 'Продукт 3', value: SelectedProduct.product3 },
];

// TODO: move filter functionality to features
export const ProductFilter = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelectedProduct();
  const [value] = productOptions.filter((product) => product.value === selectedProduct)
  const onChange = (value: string): void => {
    dispatch(setSelectedProduct(value as SelectedProduct)); // TODO: fix
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {title}
      </div>
      <Select
        options={productOptions}
        value={value.value}
        onChange={onChange}
      />
    </div>
  );
};