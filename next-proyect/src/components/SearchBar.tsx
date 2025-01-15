"use client"

import React from 'react';
import { useSearch } from '@/context/SearchContext';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="flex flex-col items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos..."
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}

