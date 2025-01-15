import { IProduct } from "./IProducts";
import { IUser } from "./IUser";

export interface IOrder {
    id: number,
    date: string, 
    status: string,
    user: IUser,
    products: IProduct
}

