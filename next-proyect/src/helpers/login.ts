import { ILoginForm } from "@/Interface/ILoginForm";
import axios from "axios";

export default async function login(loginForm: ILoginForm) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, loginForm)
    console.log(response.data)
}