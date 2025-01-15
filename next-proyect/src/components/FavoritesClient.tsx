"use client";

import { useFavorites } from '@/context/FavoritesContext';
import Card from '@/components/Card';
import { useCart } from '@/context/CartContext';

export default function FavoritesClient() {
    const { favorites, removeFromFavorites } = useFavorites();
    const { addItemToCart, items } = useCart();

    const isProductInCart = (id: number) => items.some((item) => item.id === id);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
            {favorites.length === 0 ? (
                <p>No tienes productos favoritos aún.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map(product => (
                        <Card
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            stock={product.stock}
                            image={product.image}
                            onAddToCart={() => addItemToCart(product)}
                            onToggleFavorite={() => removeFromFavorites(product.id)}
                            isFavorite={true}
                            disabled={isProductInCart(product.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}