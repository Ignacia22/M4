/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { IProducts, IProduct } from "@/Interface/IProducts";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface CartContextProps {
    items: IProduct[];  
    addItemToCart: (item: IProducts) => void;  
    removeItemFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    emptyCart: () => void;
    countItems: (id: number) => number
    getCartTotal: () => number;
}

const CartContext = createContext<CartContextProps>({
    items: [],
    addItemToCart: (item: IProducts) => {},
    removeItemFromCart: (id: number) => {},
    updateItemQuantity: (id: number, quantity: number) => {},
    emptyCart: () => {},
    countItems: (id: number) => 0,
    getCartTotal: () => 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<IProduct[]>([]);

    useEffect(() => {
        const savedItems = localStorage.getItem('cart');
        if(savedItems) return setItems(JSON.parse(savedItems))
            setItems([])
    }, []);

    const addItemToCart = (item: IProducts) => {
        setItems([...items, item])
        localStorage.setItem("cart", JSON.stringify([...items, item]))
    };

    const removeItemFromCart = (id: number) => {
        const filtered = items.filter((e) => e.id !== id)
        setItems(filtered);
        localStorage.setItem("cart", JSON.stringify(filtered))
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        const filtered = items.map((item) =>
         item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
        );
        setItems(filtered);
        localStorage.setItem("cart", JSON.stringify(filtered));
    };
    
    const emptyCart = () => {
        setItems([]);
        localStorage.removeItem("cart")
    };


    const countItems = (id: number) => {
        return items.filter((e) => e.id === id).length
    }

    const getCartTotal = () => {
        return items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    return (
        <CartContext.Provider value={{ items, addItemToCart, removeItemFromCart, emptyCart, countItems, getCartTotal, updateItemQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};