export interface Product {
  id: number;
  factory_id: number;
  date?: string;
  product1?: number;
  product2?: number;
  product3?: number;
}

export type Products = Product[];