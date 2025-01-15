"use client"

import { IProducts } from "@/Interface/IProducts";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductsContextType {
  products: IProducts[],
  getProducts: () => void,
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  getProducts: () => {},
})

export function ProductsProvider({children}: {children: React.ReactNode}) {

  const [products, setProducts] = useState<IProducts[]>([])

  const getProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error detallado:", error);
    }
  };


  useEffect(() => {
    getProducts();
  }, []); // Se llama solo una vez al montar el Provider


  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de ProductsProvider");
  }
  return context;
}

