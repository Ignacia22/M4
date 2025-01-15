
import { IProducts } from "@/Interface/IProducts"
import axios from "axios"

export const getProducts = async (): Promise<IProducts[]> => {
    const fetch = await axios.get(`${process.env.API_URL}/products`)
    return fetch.data
}