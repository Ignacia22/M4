/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client"


import { loginConfig } from "@/config/loginConfig";
import { useState } from "react";
import FormInputs from "./FormInputs";
import { ILoginForm } from "@/Interface/ILoginForm";
import { Toast } from "./Toast";
import { useAuth } from "@/context/AuthContext";
import { usePublic } from "@/hooks/usePublic";
import Link from "next/link";

export default function LoginForm () {
    usePublic() 
    const {login} = useAuth()



    const [form, setForm] = useState<ILoginForm>({
        email: "", 
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateForm = () => {
        const newErrors: typeof errors = {
            email: "",
            password: "",
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Invalid email address.";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(newErrors);

        // Return true if no errors
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            if(validateForm())
               try {
                await login(form)
                Toast.fire("User logged successfully", "", "success")
               } catch (error: any) {
                const errorMessage = error.response.data.message
                const messageToShow = ["User does not exist", "Invalid password"].includes(errorMessage) ? "Invalid credentials": errorMessage
                Toast.fire(messageToShow, "", "error")
               }
               
        }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({...form, [property]: value})
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
                {loginConfig.map(({ name, label, type, placeholder }) => {
                    return (
                        <div key={name}>
                            <FormInputs
                                name={name}
                                label={label}
                                type={type}
                                placeholder={placeholder}
                                value={form[name as keyof typeof form]}
                                onChange={onChange}
                            />
                            {(errors[name as keyof typeof errors] ?? "") && (
                                <p className="text-red-500 text-sm">
                                    {errors[name as keyof typeof errors]}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 flex gap-4">
            <button
                type="submit"
                className="p-2 px-44 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Login
            </button>
            
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
                ¿No estás registrado?{" "}
                <Link href="/auth/signup" className="text-white hover:underline">
                Regístrate aquí
                </Link>
                </p>
            
        </form>
    )
}