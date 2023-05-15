import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import findLast from 'lodash/findLast'; // TODO: reexport from shared utils (realization may change in future, lodash -> ramda)
import { useSelector } from "react-redux";
import { getProducts } from '../api';
import { formatProductData, aggregateData, formatAggregatedData } from '../lib';
import { type AggregateProduct } from './types';

// TODO: move
export {
  type Products,
  type Product,
  type AggregateProduct,
  ProductType,
} from './types';

export enum SelectedProduct {
  all = 'all',
  product1 = 'product1',
  product2 = 'product2',
  product3 = 'product3',
}

enum Loading {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

type ProductSliceState = {
  data: AggregateProduct[],
  selectedProduct: SelectedProduct,
  loading: Loading,
}

const initialState: ProductSliceState = {
  data: [],
  selectedProduct: SelectedProduct.all,
  loading: Loading.idle,
};

export const getSetProducts = createAsyncThunk(
  'product/fetchData',
  async () => {
    const { data } = await getProducts();
    const formattedData = formatProductData(data);
    const aggregatedData = aggregateData(formattedData)
    return formatAggregatedData(aggregatedData);
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, { payload }: { payload: AggregateProduct[]}) => {
      state.data = payload;
    },
    setSelectedProduct: (state, { payload }: { payload: SelectedProduct}) => {
      state.selectedProduct = payload;
    },
  },
  extraReducers: (builder) => {
    // TODO: use RTK [https://redux-toolkit.js.org/rtk-query/overview]
    builder.addCase(getSetProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = Loading.succeeded;
    })
    builder.addCase(getSetProducts.pending, (state) => {
      state.data = [];
      state.loading = Loading.pending;
    }),
    builder.addCase(getSetProducts.rejected, (state) => {
      state.data = [];
      state.loading = Loading.failed;
    })
  },
});

export const { setProducts, setSelectedProduct } = productSlice.actions;

export const useProducts = () =>
  useSelector((state: RootState) => state.product.data);

const calcProductsBySelectedProduct = (
  selectedProduct: SelectedProduct,
  product: Pick<AggregateProduct, 'product1' | 'product2' | 'product3'>
) => {
  const { product1, product2, product3 } = product;
  if (selectedProduct === SelectedProduct.all) {
    return product1 + product2 + product3;
  }
  return product[selectedProduct];
}

// TODO: think about better naming
// + I am not sure this function should be here, cause data is used only in BarChart.
// Maybe it's better to move this functionality to src/widgets/productBarChar/ProductBarChart.tsx
export const useProductsBySelectedProduct = () =>
  useSelector((state: RootState) => {
    const { selectedProduct, data } = state.product;
    return data.map((item) => {
      const { factoryId, date, ...rest } = item;
        return {
          factoryId,
          date,
          products: calcProductsBySelectedProduct(selectedProduct, rest),
        }
    });
  });

// TODO: think about better naming (now is 💩💩💩) + make it more general (there mught be more options in future)
// same as useProductsBySelectedProduct
export const useProductsByFactoryAndData = (factoryId: number, date: number): AggregateProduct | undefined =>
  useSelector((state: RootState) => {
    const { data } = state.product;
    return findLast(data, (item) => {
      return item.factoryId === factoryId && item.date === date;
    })
  });

export const useSelectedProduct = () =>
  useSelector((state: RootState) => {
    return state.product.selectedProduct
  });