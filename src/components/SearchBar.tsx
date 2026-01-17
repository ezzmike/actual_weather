'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationClick: () => void;
}

export default function SearchBar({ onSearch, onLocationClick }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city, zip code or address..."
          className="w-full h-14 pl-12 pr-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 group-hover:bg-white/15"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 pointer-events-none" />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            type="button"
            onClick={onLocationClick}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
