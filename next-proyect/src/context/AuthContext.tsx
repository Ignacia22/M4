/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"


import { ILoginForm } from "@/Interface/ILoginForm";
import { IUser } from "@/Interface/IUser";
import axios from "axios";
import { useRouter } from "next/navigation";

import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from "./CartContext";



interface AuthContextType {
    user: IUser | null,
    login: (form: ILoginForm) => void,
    logout: () => void,
    isAuthenticated: boolean,
    token: string | null,
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: (form: ILoginForm) => {},
    logout: () => {},
    isAuthenticated: false,
    token: null,
})


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter();
    const { emptyCart } = useCart();
    
    
    const checkLocalStorage = () => {
        const storedUser = localStorage.getItem("user")
        const storedToken = localStorage.getItem("token")
        if(storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
            setIsAuthenticated(true)
        } else {
            setUser(null)
            setToken(null)
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkLocalStorage()
    }, [])



    const login = async (form: ILoginForm) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, form);
            const userData = response.data.user;
            const tokenData = response.data.token;
            
            setUser(userData)
            setToken(tokenData)
            setIsAuthenticated(true)
            
            localStorage.setItem("user", JSON.stringify(userData))
            localStorage.setItem("token", tokenData)
            
            router.push("/Home")
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error)
            throw error;
        }
    }

    const logout = async () => {
        if (user) {
           localStorage.removeItem("favorites");
        }
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        emptyCart();
        router.replace("/Home")
    }




    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated, token}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext)

    return context;
}