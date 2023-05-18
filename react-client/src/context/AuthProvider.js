import { createContext, useState } from "react";

const AuthContext = createContext({})

const getAuth = () => {
    return JSON.parse(localStorage.getItem('auth')) || ''
}

export const setAuthLocal = (auth) => {
    localStorage.setItem('auth',JSON.stringify(auth))
}


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState( getAuth() )
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
