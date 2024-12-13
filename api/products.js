import axios from "axios";
import { API_URL } from '@env';

export const getProducts = (data) =>
{
    return axios.get(`${API_URL}/api/product/${data}/all`);
}

export const getFeaturedProducts = () => {
    return axios.get(`${API_URL}/api/product/featured`);
}

export const getManProducts = () => {
    return axios.get(`${API_URL}/api/product/man`);
}

export const getWomanProducts = () => {
    return axios.get(`${API_URL}/api/product/woman`);
}

export const getCartPoroducts = (data) => {
    return axios.post(`${process.env.API_URL}/api/cartproducts`, {data:data});
}