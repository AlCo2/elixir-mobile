import * as SecureStore from 'expo-secure-store';
import { getAuthUser } from '../../api/auth';

export function setUserFromJson(setUser)
{
    const data = SecureStore.getItem('user');
    if (data)
    { 
        setUser(JSON.parse(data));
    }else
    {
        const token = SecureStore.getItem('token');
        if (token)
        {
            const user = getAuthUser(token).then((response)=>response.status==200?response.data:null);
            SecureStore.setItemAsync('user',JSON.stringify(user));
            setUser(user);
        }
    }
}