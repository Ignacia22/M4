import { ISignUpForm } from "@/Interface/ISignUpForm";
import axios from "axios";

export default async function signup(signUpForm: ISignUpForm) {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, signUpForm)
}