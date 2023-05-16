import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectedProduct, useSelectedProduct, setSelectedProduct } from 'entities/product';
import { Select } from 'shared/ui';

const productOptions = [
  { label: 'Все продукты', value: SelectedProduct.all },
  { label: 'Продукт 1', value: SelectedProduct.product1 },
  { label: 'Продукт 2', value: SelectedProduct.product2 },
  { label: 'Продукт 3', value: SelectedProduct.product3 },
];

export const FilterProduct = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelectedProduct();
  const [value] = productOptions.filter((product) => product.value === selectedProduct)
  const onChange = (value: string): void => {
    dispatch(setSelectedProduct(value as SelectedProduct));
  };

  return (
    <Select
      options={productOptions}
      value={value.value}
      onChange={onChange}
    />
  );
};