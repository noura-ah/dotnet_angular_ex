import { createContext, useState } from "react";

const AuthContext = createContext({})

const getAuth = () => {
    const token = localStorage.getItem('token')
    const id =  localStorage.getItem('id')
    return {token, id}
}

export const setIdLocal = (id) => {
    localStorage.setItem('id',id)
}

export const setTokenLocal = (auth) => {
    localStorage.setItem('token',auth)
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
