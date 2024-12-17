import { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { getAuthUser, login_api, logout, register_api } from "../api/auth";


export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);    
    async function auth(email, password)
    {
        const data = {
            email:email,
            password:password,
        }
        const response = await login_api(data)
        .catch((error)=>{
            console.log(error);
            return error;
        });
        
        if (response && response.status == 200)
        {
            const token = response.data;
            SecureStore.setItemAsync('token', token);
            const user = await getAuthUser(token).then((response)=>response.data).catch((error)=>console.log(error));
            SecureStore.setItemAsync('user',JSON.stringify(user));
            setUser(user);
        };
        return response.status;
    }
    async function register(data)
    {
        const response = await register_api(data)
        .catch((error)=>{
            console.log(error);
            return error;
        });
        if (response && response.status == 200)
        {
            const token = response.data;
            SecureStore.setItemAsync('token', token);
            const user = await getAuthUser(token)
            .then((response)=>response.data);
            setUser(user);
            setLoading(false);
            navigation.navigate('Home');
        }
        return response.status;
    }

    function deauth(){
        const token = SecureStore.getItem('token');
        SecureStore.deleteItemAsync('token');
        SecureStore.deleteItemAsync('user');
        setUser(null);
        logout(token)
        .catch((error)=>console.log(error));
    }

    return (
    <UserContext.Provider value={{user, setUser, auth, register, deauth}}>
        {children}
    </UserContext.Provider>
)}