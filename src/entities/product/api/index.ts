import { AxiosResponse } from "axios";
import { Nothing } from "immer/dist/internal";
import { $api, type apiTypes, hocs } from 'shared';

export const getProducts = async (): Promise<AxiosResponse<apiTypes.Products>> => await $api.get('products');

export const useFetchProducts = hocs.useFetch(getProducts);