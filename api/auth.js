import axios from "axios";
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
export const getAuthUser = () =>{
    const token = SecureStore.getItem('token');
    return axios.get(`${API_URL}/api/user`, {headers: {Authorization: `Bearer ${token}`}})
}

export const login_api = (data) => {
    return axios.post(`${API_URL}/api/login`, data)
}
export const register_api = (data) => {
    return axios.post(`${API_URL}/api/register`, data);
}
export const logout = () =>{
    const token = SecureStore.getItem('token');
    return axios.post(`${API_URL}/api/logout`, null,{headers: {Authorization: `Bearer ${token}`}});
}