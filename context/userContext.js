import { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';


export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
)}