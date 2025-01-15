/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client"

import { signupConfig } from "@/config/signupConfig";
import { useState } from "react"
import FormInputs from "./FormInputs";
import signup from "@/helpers/signup";
import { Toast } from "./Toast";
import { useRouter } from "next/navigation";
import { ISignUpForm } from "@/Interface/ISignUpForm";
import { usePublic } from "@/hooks/usePublic";
import Link from "next/link";




const initialForm: ISignUpForm = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
}


export default function SignUpForm () {
    usePublic()
    const [form, setForm] = useState<ISignUpForm>(initialForm);
    const router = useRouter()

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });


    const validateForm = () => {
        const newErrors: typeof errors = {
            name: "",
            email: "",
            password: "",
            address: "",
            phone: "",
        };

        if (!form.name.trim()) {
            newErrors.name = "Name is required.";
        } else if (form.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long.";
        }

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

        if (!form.address.trim()) {
            newErrors.address = "Address is required.";
        }

        const phoneRegex = /^\d{10}$/;
        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(form.phone)) {
            newErrors.phone = "Phone number must be 10 digits long.";
        }

        setErrors(newErrors);

        // Retorna true si no hay errores
        return Object.values(newErrors).every((error) => error === "");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(validateForm())
            try {
                await signup(form)
                Toast.fire("User create successfully", "", "success")
                router.replace("/auth/login")
            } catch (error: any) {
                Toast.fire(error.response.data.message, "", "error")
            }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({...form, [property]: value})
    }




    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
                {signupConfig.map(({ name, label, type, placeholder }) => {
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
                Sign Up
            </button>
            </div>
            <p className="mt-8 my-6 text-center text-sm text-gray-500">
                ¿Ya estas registrado?{" "}
                <Link href="/auth/login" className="text-white hover:underline">
                Ingresa aqui
                </Link>
            </p>
        </form>
    )
}



