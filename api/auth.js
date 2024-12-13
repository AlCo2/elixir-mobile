import axios from "axios";
import { API_URL } from '@env';

export const getAuthUser = (token) =>{
    return axios.get(`${API_URL}/api/user`, {headers: {Authorization: `Bearer ${token}`}})
}
export const logout = (token) =>{
    return axios.post(`${API_URL}/api/logout`, null,{headers: {Authorization: `Bearer ${token}`}});
}