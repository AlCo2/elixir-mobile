import axios from "axios";
import { API_URL } from '@env';

export const createOrder = (data) =>{
    return axios.post(`${API_URL}/api/order`, data);
}