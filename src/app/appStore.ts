import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { productSlice } from "entities/product";

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [productSlice.name],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({ 
  product: productSlice.reducer,
});

export function makeStore() {
  const store = configureStore({
    reducer: persistReducer<ReturnType<typeof rootReducer>>(
      rootPersistConfig,
      rootReducer
    ) as unknown as typeof rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })
  return store;
}

export const appStore = makeStore();
export const persistedStore = persistStore(appStore);
export const AppDispatch = typeof appStore.dispatch;