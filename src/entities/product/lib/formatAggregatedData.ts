import { type AggregateProduct } from '../model';

const TON = 1000;

export function formatAggregatedData(data: AggregateProduct[]): AggregateProduct[] {
  return data.map((product) => {
    const { product1, product2, product3, ...rest } = product;
    return ({
      product1: Math.round(product1 / TON),
      product2: Math.round(product2 / TON),
      product3: Math.round(product3 / TON),
      ...rest
    })
  })
}