import { type Product } from '../model';

export type FormattedProduct = Omit<Product, 'date'> & {
  date: number;
} 