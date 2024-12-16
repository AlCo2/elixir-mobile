import axios from "axios";
import { API_URL } from '@env';

export const getProducts = (data) =>
{
    return axios.get(`${API_URL}/api/product/${data}/all`);
}

export const getProductsByName = (title, sort) =>
{
    const url = `${API_URL}/api/product/search?${title?'title='+title:''}${sort?'&sort='+sort:''}`;
    return axios.get(url);
}
export const getFeaturedProducts = () =>
{
    return axios.get(`${API_URL}/api/product/featured`);
}

export const getManProducts = () =>
{
    return axios.get(`${API_URL}/api/product/man`);
}

export const getWomanProducts = () =>
{
    return axios.get(`${API_URL}/api/product/woman`);
}

export const getCartPoroducts = (data) => {
    return axios.post(`${process.env.API_URL}/api/cartproducts`, {data:data});
}