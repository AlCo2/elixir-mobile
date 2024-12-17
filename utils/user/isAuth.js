import * as SecureStore from 'expo-secure-store';

export function isAuth()
{
    const token = SecureStore.getItem('token');
    if (token)
        return true;
    return false;
}