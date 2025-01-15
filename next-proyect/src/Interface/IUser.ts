export interface IUser {
    id: string,
    name: string,
    email: string,
    address: string,
    phone: string,
    role: string,
    credential: {
        id: number,
        password: string,
    },
    orders: []
}


