"use client"


import { IProduct } from "@/Interface/IProducts";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
    favorites: IProduct[];
    addToFavorites: (product: IProduct) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<IProduct[]>([]);
    const {user, isAuthenticated} = useAuth();

    useEffect(() => {
      if (isAuthenticated && user) {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } else {
        setFavorites([]);
      }
    }, [isAuthenticated, user]);
  


    const addToFavorites = (product: IProduct) => {
        const updatedFavorites = [...favorites, product];
        setFavorites(updatedFavorites);
        if(user) {
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
      };
    
      const removeFromFavorites = (productId: number) => {
        const updatedFavorites = favorites.filter(product => product.id !== productId);
        setFavorites(updatedFavorites);
        if(user) {
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
      };
    
      const isFavorite = (productId: number) => {
        return favorites.some(product => product.id === productId);
      };

      const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('favorites');
      };
    
      return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}>
          {children}
        </FavoritesContext.Provider>
      );
}


export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};