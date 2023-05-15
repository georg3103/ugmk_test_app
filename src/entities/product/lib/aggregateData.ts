import { type AggregateProduct } from '../model';
import { type FormattedProduct } from './types';

export function aggregateData(data: FormattedProduct[]): AggregateProduct[] {
  const transformed: AggregateProduct[] = [];

  for (const item of data) {
    const existing = transformed.find((t) => {
      return t.factoryId === item.factoryId && t.date === item.date;
    });
    if (existing) {
      existing.product1 += item.product1 ? item.product1 : 0;
      existing.product2 += item.product2 ? item.product2 : 0;
      existing.product3 += item.product3 ? item.product3 : 0;
    } else {
      transformed.push({
        factoryId: item.factoryId,
        date: item.date,
        product1: item.product1 ? item.product1 : 0,
        product2: item.product2 ?  item.product2 : 0,
        product3: item.product3 ? item.product3 : 0,
      });
    }
  }

  return transformed;
}