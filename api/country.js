import axios from "axios";
import { API_URL } from '@env';

export const fetchCountries_api = () =>{
    return axios.get(`${API_URL}/api/countries`);
}