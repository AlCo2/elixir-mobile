import axios from "axios";
import { API_URL } from '@env';

export const getFavouritProducts = (token) =>{
    return axios.post(`${API_URL}/api/favourite/products`, null, {headers: {Authorization: `Bearer ${token}`}})
}

export const addProductToFavourit = (token, product_id) =>
{
    return axios.post(`${API_URL}/api/favourite`, {product_id:product_id}, {headers: {Authorization: `Bearer ${token}`}})
}