import axios from "axios";
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export const getFavouritProducts = () =>{
    const token = SecureStore.getItem('token');
    return axios.post(`${API_URL}/api/favourite/products`, null, {headers: {Authorization: `Bearer ${token}`}})
}

export const addProductToFavourit = (product_id) =>
{
    const token = SecureStore.getItem('token');
    return axios.post(`${API_URL}/api/favourite`, {product_id:product_id}, {headers: {Authorization: `Bearer ${token}`}})
}