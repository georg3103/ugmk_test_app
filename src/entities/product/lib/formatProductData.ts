import { type apiTypes, transformDateToMonth } from 'shared';
import { type Product } from '../model';

type FormattedProduct = Omit<Product, 'date'> & {
  date: number;
} 

const keyMapper = {
  id: 'id',
  factory_id: 'factoryId',
  date: 'date',
  product1: 'product1',
  product2: 'product2',
  product3: 'product3'
} as unknown as Product;

// TODO: move to valueMapper
const formatDate = (key: keyof apiTypes.Product, value: any) =>  {
  if (key === 'date') {
    return value ? transformDateToMonth(value) : value;
  }
  return value;
};

export function formatProductData(data: apiTypes.Products): FormattedProduct[] {
 return data
    .filter((product) => !!product.date)
    .map((product) => Object.fromEntries(
      Object.entries(product).map(([key, value]) => [
        keyMapper[key as keyof typeof keyMapper],
        formatDate(key as keyof apiTypes.Product, value)
      ])
    ));
}