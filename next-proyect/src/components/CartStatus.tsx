"use client"

import { useCart } from "@/context/CartContext"



export default function CartStatus() {
    const {items} = useCart()

    return <p>Products: {items.length}</p>
}