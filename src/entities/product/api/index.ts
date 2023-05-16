import { AxiosResponse } from "axios";
import { $api, type apiTypes, useFetch } from 'shared';

export const getProducts = async (): Promise<AxiosResponse<apiTypes.Products>> => await $api.get('products');

export const useFetchProducts = useFetch(getProducts);