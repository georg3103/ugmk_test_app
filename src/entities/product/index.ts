// TODO: sort by selectors, action, types, ui components (sth like actions.setProducts ...)

export {
  getProducts,
  useFetchProducts
} from './api';

export { 
  setProducts,
  setSelectedProduct,
  useProducts,
  useSelectedProduct,
  useProductsBySelectedProduct,
  useProductsByFactoryAndData,
  getSetProducts, 
  productSlice,
  ProductType,
  SelectedProduct,
  type AggregateProduct,
} from './model';

export { 
  WithProducts,
} from './ui';
