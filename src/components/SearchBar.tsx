'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationClick: () => void;
}

export default function SearchBar({ onSearch, onLocationClick }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // Photon API for OpenStreetMap data - free and fast autocomplete
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        
        if (!data || !data.features) {
          setSuggestions([]);
          return;
        }

        const results = data.features
          .filter((f: any) => f.properties && f.properties.countrycode === 'US' || !f.properties.countrycode)
          .map((f: any) => {
            const p = f.properties;
            const name = p.name || '';
            const street = p.street || '';
            const city = p.city || p.town || '';
            const state = p.state || '';
            const label = [name !== street ? name : null, street, city, state].filter(Boolean).join(', ');
            return { label, ...f };
          });

        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.label);
    onSearch(suggestion.label);
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-50">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 3 && setShowSuggestions(true)}
            placeholder="Enter city, zip code or address..."
            className="w-full h-14 pl-12 pr-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 group-hover:bg-white/15"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </div>
          
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

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="w-full text-left px-6 py-4 text-white hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">{s.label}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
