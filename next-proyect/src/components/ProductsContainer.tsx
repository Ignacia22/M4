/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useProducts } from "@/context/ProductsContext";
import Link from "next/link";
import Card from "@/components/Card";
import { useCart } from "@/context/CartContext";
import { IProducts } from "@/Interface/IProducts";
import { useSearch } from "@/context/SearchContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useMemo, useState } from "react";




export default function ProductsContainer() {
  const { products} = useProducts();
  const { addItemToCart, items} = useCart();
  const {searchTerm} = useSearch()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc' | null>(null);


  // Función para verificar si un producto ya está en el carrito
  const isProductInCart = (id: number) => items.some((item) => item.id === id);

  
  const handleAddToCart = (product: IProducts) => {
    addItemToCart(product);
  };
  
  
  const handleToggleFavorite = (product: IProducts) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  const handlePriceOrder = () => {
    setPriceOrder((current: 'asc' | 'desc' | null) => {
      if (current === null) return 'asc';
      if (current === 'asc') return 'desc';
      return null;
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    const result = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, priceOrder]);

  if (!products?.length) {
    return <div className="h-screen text-center text-3xl justify-center">LOADING...</div>;
  }

  return (
    <div>
      <div className="m-20">
      <button onClick={handlePriceOrder} className="mb-4 px-14 py-2 bg-blue-500 text-white rounded">
        {priceOrder === null && "Filtrar por precio"}
        {priceOrder === 'asc' && "Precio: Menor a Mayor"}
        {priceOrder === 'desc' && "Precio: Mayor a Menor"}
      </button>
      </div>
    
    <div className="p-18 m-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2">
      {filteredAndSortedProducts.map((product: IProducts) => {

        return (
          <div key={product.id} className="relative">
            <Link href={`product/${product.id}`}>
              <Card
                name={product.name}
                price={product.price}
                description={product.description}
                stock={product.stock}
                image={product.image}
                onAddToCart={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                onToggleFavorite={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleToggleFavorite(product);
                }}
                isFavorite={isFavorite(product.id)}
                disabled={isProductInCart(product.id)}
              />
            </Link>
          </div>
        );
      })}
    </div>
    
    </div>
  );
}