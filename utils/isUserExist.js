import * as SecureStore from 'expo-secure-store';

export function isUserExist(setUser)
{
    const data = SecureStore.getItem('user');
    if (data)
    {
        setUser(JSON.parse(data));
        return true;
    }
    else
        return false;
}