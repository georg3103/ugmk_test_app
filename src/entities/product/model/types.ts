import { type apiTypes } from 'shared';

export type Product = Omit<apiTypes.Product, 'factory_id'> & {
  factoryId: number;
}

export type Products = Product[];

export type AggregateProduct = {
  factoryId: number;
  date: number;
  product1: number;
  product2: number;
  product3: number;
}

export enum ProductType {
  all = 'all',
  product1 = 'product1',
  product2 = 'product2',
  product3 = 'product3',
}