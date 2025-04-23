import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [token,setToken] = useState("")


    const state ={
        token,
        setToken
    }



    return (
        <AuthContext.Provider value={state}>
        {children}

        </AuthContext.Provider>
    )
}